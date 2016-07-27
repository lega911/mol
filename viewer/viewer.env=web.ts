$mol_maybe

/// Reactive statefull lazy ViewModel 
class $mol_viewer extends $mol_model {
	
	@ $mol_prop()
	static root( id : number ) {
		return new this
	}
	
	/// Name of element that created when element not found in DOM
	tagName() { return 'div' }
	
	/// NameSpace of element that created when element not found in DOM
	nameSpace() { return 'http://www.w3.org/1999/xhtml' }
	
	/// Child views
	childs() {
		return <Array<$mol_viewer|Node|string|number|boolean>> null
	}
	
	childsInner() { return this.childs() }
	
	private 'DOMNode()' : Element
	DOMNode( ...diff : Element[] ) {
		var path = this.objectPath()
		
		var next = diff[0]
		if( !next ) {
			next = this['DOMNode()']
			if( next ) return next
			
			next = document.getElementById( path )
			if( !next ) {
				next = document.createElementNS( this.nameSpace() , this.tagName() )
			}
		}
		
		next.id = path
		next['$mol_viewer'] = this
		this['DOMNode()'] = next
		
		/// Set BEM-like element-attributes with inheritance support
		var ownerProto = this.objectOwner() && Object.getPrototypeOf( this.objectOwner() )
		if( ownerProto && ownerProto['objectClassNames'] ) {
			for( var className of ownerProto[ 'objectClassNames' ]() ) {
				var attrName = className.replace( /\$/g , '' ) + '_' + this.objectField().replace( /\(.*/ , '' )
				next.setAttribute( attrName , '' )
				if( className === '$mol_viewer' ) break
			}
		}
		
		/// Set BEM-like block-attributes with inheritance support
		var proto = Object.getPrototypeOf( this )
		for( var className of proto[ 'objectClassNames' ]() ) {
			next.setAttribute( className.replace( /\$/g , '' ) , '' )
			if( className === '$mol_viewer' ) break
		}
		
		/// Bind properties to events
		this.event_keys().forEach( name => {
			next.addEventListener( name , event => {
				this.event( name , event )
				//$mol_defer.run()
			} )
		} )
		
		// When node defined then deferred render child nodes then deferred update state of this node
		this.DOMNodeState( void 0 )
		this.DOMNodeContent( void 0 )
		
		return next
	}
	
	@ $mol_prop()
	DOMNodeContent( ...diff : void[] ) {
		var node = this.DOMNode()
		
		/// Render child nodes
		var childs = this.childsInner()
		if( childs != null ) {
			var childViews = childs
			
			var nextNode = node.firstChild
			for( var i = 0 ; i < childViews.length ; ++i ) {
				let view = childViews[i]
				if( view == null ) continue
				
				if( typeof view === 'object' ) {
					var existsNode = ( view instanceof $mol_viewer ) ? view.DOMNode() : view
					while( true ) {
						if( !nextNode ) {
							node.appendChild( existsNode )
							break
						}
						if( nextNode == existsNode ) {
							nextNode = nextNode.nextSibling
							break
						} else {
							//if( childViews.indexOf( nextNode ) === -1 ) {
							//	var nn = nextNode.nextSibling
							//	prev.removeChild( nextNode )
							//	nextNode = nn
							//} else {
								node.insertBefore( existsNode , nextNode )
								break
							//}
						}
					}
					//if( view instanceof $mol_viewer ) new $mol_defer( ()=> view.DOMTree() )
				} else {
					if( nextNode && nextNode.nodeName === '#text' ) {
						nextNode.nodeValue = String( view )
						nextNode = nextNode.nextSibling
					} else {
						var textNode = document.createTextNode( String( view ) )
						node.insertBefore( textNode , nextNode )
					}
				}
				
			}
			
			while( nextNode ) {
				var currNode = nextNode
				nextNode = currNode.nextSibling
				node.removeChild( currNode )
			}
		}
		
		return null
	}
	
	@ $mol_prop({
		fail : ( self : $mol_viewer , error ) => {
			var node = self.DOMNode()
			if( node ) {
				node.setAttribute( 'mol_viewer_error' , error.name )
				// if( error.name !== '$mol_atom_wait' ) node.innerHTML = error.message
			}
			return error
		}
	})
	DOMNodeState( ...diff : void[] ) {
		var childs = this.DOMNodeContent()
		
		var node = this.DOMNode()
		
		this.attr_keys().forEach( name => {
			var n = this.attr( name )
			if(( n == null )||( n === false )) {
				node.removeAttribute( name )
			} else if( n === true ) {
				node.setAttribute( name , name )
			} else {
				node.setAttribute( name , String( n ) )
			}
		} )
		
		this.field_keys().forEach( path => {
			var names = path.split( '.' )
			var obj = node
			for( var i = 0 ; i < names.length - 1 ; ++i ) {
				if( names[i] ) obj = obj[ names[i] ]
			}
			var field = names[ names.length - 1 ]
			var val = this.field( path )
			if( obj[ field ] !== val ) obj[ field ] = val
		} )
		
		return null
	}
	
	attr_keys() { return [ 'mol_viewer_error' ] }
	attr( name : string ) : any {
		if( name === 'mol_viewer_error' ) return false
		return ''
	}
	
	event_keys() { return [] }
	event( name : string , ...diff : Event[] ) { return null }
	
	field_keys() { return [] }
	field( path : string ) { return null }
	
	focused() {
		return $mol_viewer_selection.focused() === this.DOMNode()
	}
	
	destroyed( ...diff : boolean[] ) {
		if( diff[0] ) {
			var atoms = this[ '$mol_atom_state' ]
			if( atoms ) {
				for( var key in atoms ) {
					if( !atoms.hasOwnProperty( key ) ) continue
					if( !atoms[ key ] ) continue
					atoms[ key ].destroyed( true )
				}
			}
		}
		return super.destroyed( ...diff )
	}
	
}

/// Autoattach view roots to loaded DOM.
document.addEventListener( 'DOMContentLoaded' , event => {
	var nodes = document.querySelectorAll( '[mol_viewer_root]' )
	for( var i = nodes.length - 1 ; i >= 0 ; --i ) {
		var view = window['$'][ nodes[i].getAttribute( 'mol_viewer_root' ) ].root(i)
		view.DOMNode( nodes[i] )
	}
	$mol_defer.run()
} )