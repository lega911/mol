namespace $ {

export function $mol_viewer_tree2ts( tree : $mol_tree ) {
	
	var content = ''
	var locales : { [ key : string ] : string } = {}
	
	function error( message : string , tree : $mol_tree ) {
		return new Error( `${message}:\n${source( tree )} ${tree.baseUri}:${tree.row}:${tree.col}` )
	}
	
	function source( root : $mol_tree ) : $mol_tree {
		if( [ '<=>' , '<=' ].indexOf( root.type ) !== -1 ) {
			return root.clone({
				childs : root.childs.map( name => name.clone({
					childs : []
				}) )
			})
		}
		return root.clone({ childs : root.childs.map( source ) })
	}
	
	tree.childs.forEach( function( def : $mol_tree ) {
		if( !def.type || /^-$/.test( def.type ) ) return
		if( !/^\$\w+$/.test( def.type ) ) throw error( 'Wrong component name' , def )
		var parent = def.childs[0]
		
		var members : { [ key : string ] : string } = {}
		parent.childs.forEach( param => addProp( param ) )
		
		function addProp( param : $mol_tree ) { try {
			var needSet = false
			var needReturn = true
			var needCache = false
			var isOverride = true
			var keys : string[] = []

			if( param.type === '<=>' ) {
				isOverride = false
				param = param.childs[0]
			}

			if( param.type === '<=' ) {
				isOverride = false
				param = param.childs[0]
			}

			var propName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec( param.type )
			
			if( propName[3] ) {
				needSet = true
				needCache = true
			}
			
			if( !param.type || param.type === '-' ) return
			
			function getValue( value : $mol_tree ) { try {
				switch( true ) {
					case( value.type === '' ) :
						return JSON.stringify( value.value )
					case( value.type === '@' ) :
						locales[ `${ def.type }_${ param.type }` ] = value.value
						return`$mol_locale.text( this.localizationContexts() , ${ JSON.stringify( param.type ) } )`
					case( value.type === '-' ) :
						return null
					case( value.type === '/' ) :
						var items : string[] = []
						value.childs.forEach( item => {
							if( item.type === '-' ) return
							var val = getValue( item )
							if( val ) items.push( val )
						} )
						return '[]' + ( items.length ? '.concat( ' + items.join(' , ') + ' )' : ' as any[]' )
					case( value.type[0] === '$' ) :
						needCache = true
						var overs : string[] = []
						value.childs.forEach( over => {
							if( /^-?$/.test( over.type ) ) return ''
							var overName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec( over.type )
							var ns = needSet
							var v = getValue( over.childs[0] )
							let args : string[] = []
							if( overName[2] ) args.push( ` ${ overName[2] } : any ` )
							if( overName[3] ) args.push( ` ${ overName[3] } : any ` )
							overs.push( '\t\t\tobj.' + overName[1] + ' = (' + args.join( ',' ) + ') => ' + v + '\n' )
							needSet = ns
						} )
						return 'new ' + value.type + '()' + ( overs.length ? '.setup( obj => { \n' + overs.join( '' ) + '\t\t} )' : '' )
					case( value.type === '*' ) :
						//needReturn = false
						var opts : string[] = []
						value.childs.forEach( opt => {
							if( /^-?$/.test( opt.type ) ) return ''
							var key = /(.*?)(?:\?(\w+))?$/.exec( opt.type )
							keys.push( key[1] )
							var ns = needSet
							var v = getValue( opt.childs[0] )
							var arg = key[2] ? ` ${ key[2] }? : any ` : ''
							opts.push( '\t\t\t"' + key[1] + '" : (' + arg + ')=> <any> ' + v + ' ,\n' )
							needSet = ns
						} )
						if( !isOverride ) return '({\n' + opts.join( '' ) + '\t\t})'
						else return  `$`+`mol_merge_dict( super.${ param.type }() , {\n${ opts.join( '' )}\t\t} )`
					case( value.type === '>' ) :
						throw new Error( 'Deprecated syntax. Use <=> instead.' )
					case( value.type === '<=>' ) :
						needSet = true
						if( value.childs.length === 1 ) {
							addProp( value )
							var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))$/.exec( value.childs[0].type )
							return 'this.' + type[1] + '(' + ( type[2] ? type[2] + ' ,' : '' ) + ' ' + type[3] + ' )'
						}
						break
					case( value.type === '<' ) :
						throw new Error( 'Deprecated syntax. Use <= instead.' )
					case( value.type === '<=' ) :
						if( value.childs.length === 1 ) {
							addProp( value )
							var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec( value.childs[0].type )
							return 'this.' + type[1] + '(' + (  type[2] ? type[2] : '' ) + ')'
						}
						break
				}
				
				switch( value.type ) {
					case 'true' :
					case 'false' :
						return value.type
					case 'null' :
						return '<any> null'
				}
				
				if( Number( value.type ).toString() == value.type ) return value.type
				
				throw error( 'Wrong value' , value )
			} catch ( err ) {
				err.message += `\n${value.baseUri}:${value.row}:${value.col}\n${source( value )}`
				throw err
			} }
			
			if( param.childs.length > 1 ) throw new Error( 'Too more childs' )
			
			param.childs.forEach( child => {
				var val = getValue( child )
				var args : string[] = []
				if( propName[2] ) args.push( ` ${ propName[2] } : any ` )
				if( propName[3] ) args.push( ` ${ propName[3] }? : any ` )
				if( needSet && param.childs[0].type !== '<=>' ) val = ( needReturn ? `( ${ propName[3] } !== void 0 ) ? ${ propName[3] } : ` : `if( ${ propName[3] } !== void 0 ) return ${ propName[3] }\n\t\t` ) + val
				if( needReturn ) val = 'return ' + val
				var decl = '\t' + propName[1] +'(' + args.join(',') + ') {\n\t\t' + val + '\n\t}\n\n'
				if( needCache ) {
					if( propName[2] ) decl = '\t@ $' + 'mol_mem_key()\n' + decl
					else decl = '\t@ $' + 'mol_mem()\n' + decl
				}
				decl = source( param ).toString().trim().replace( /^/gm , '\t/// ' ) + '\n' + decl
				members[ propName[1] ] = decl
			} )
			
			return needSet
		} catch ( err ) {
			err.message += `\n${param.baseUri}:${param.row}:${param.col}\n${source( param )}`
			throw err
		} }
		
		var body = Object.keys( members ).map( function( name ) {
			return members[ name ] || '\t' + name +'() { return <any>null }\n\t}\n'
		}).join( '' )
		
		var classes = 'namespace $ { export class ' + def.type + ' extends ' + parent.type + ' {\n\n' + body + '} }\n'
		
		content += classes + '\n'
	})
	
	return { script : content , locales : locales }
}

}
