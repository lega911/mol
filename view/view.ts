namespace $ {
	
	export let $mol_view_context = <$mol_view_context> {}
	
	export interface $mol_view_context {
		$mol_view_visible_width() : number
		$mol_view_visible_height() : number
		$mol_view_state_key( suffix : string ) : string
	}
	
	$mol_view_context.$mol_view_visible_width = () => $mol_window.size().width
	$mol_view_context.$mol_view_visible_height = () => $mol_window.size().height
	$mol_view_context.$mol_view_state_key = ( suffix : string )=> suffix

	/// Reactive statefull lazy ViewModel 
	export class $mol_view extends $mol_object {
		
		@ $mol_mem_key()
		static Root( id : number ) {
			return new this
		}
		
		title() : string {
			return this.Class().toString()
		}
		
		@ $mol_mem()
		focused ( next?: boolean ) {
			const value = $mol_view_selection.focused( next === void 0 ? void 0 : [ this.dom_node() ] )
			return value.indexOf( this.dom_node() ) !== -1
		} 
		
		@ $mol_mem()
		context( next? : $mol_view_context ) {
			return next || $mol_view_context
		}
		
		context_sub() {
			return this.context()
		}
		
		state_key( suffix = '' ) {
			return this.context().$mol_view_state_key( suffix )
		}
		
		/// Name of element that created when element not found in DOM
		dom_name() {
			return this.constructor.toString().replace( '$' , '' )
		}
		
		/// NameSpace of element that created when element not found in DOM
		dom_name_space() { return 'http://www.w3.org/1999/xhtml' }
		
		/// Raw child views
		sub() {
			return <Array<$mol_view|Node|string|number|boolean>> null
		}
		
		/// Visible sub views with defined context()
		/// Render all by default
		sub_visible() {
			const sub = this.sub()
			if( !sub ) return sub
			
			const context = this.context_sub()
			sub.forEach( child => {
				if( child instanceof $mol_view ) {
					child.context( context )
				}
			} )
			
			return sub
		}
		
		/// Minimal height that used for lazy rendering
		@ $mol_mem()
		minimal_width() {
			const sub = this.sub()
			if( !sub ) return 0
			
			let min = 0
			sub.forEach( view => {
				if( view instanceof $mol_view ) {
					min = Math.max( min , view.minimal_width() )
				}
			} )
			
			return min
		}
		
		/// Minimal width that used for lazy rendering
		@ $mol_mem()
		minimal_height() {
			const sub = this.sub()
			if( !sub ) return 0
			
			let min = 0
			sub.forEach( view => {
				if( view instanceof $mol_view ) {
					min = Math.max( min , view.minimal_height() )
				}
			} )
			
			return min
		}
		
		'view_classes()' : Function[]
		view_classes() {
			const proto = Object.getPrototypeOf( this ) as $mol_view
			if( this[ 'view_classes()' ] ) return this[ 'view_classes()' ]
			
			let current = proto
			const classes = [] as Function[]
			
			while( current ) {
				classes.push( current.constructor )
				if(!( current instanceof $mol_view )) break
				current = Object.getPrototypeOf( current )
			}
			
			return this['view_classes()'] = classes
		}
		
		private 'dom_node()' : Element
		
		dom_node( next? : Element ) {
			const path = this.toString()
			
			let next2 = next
			if( !next2 ) {
				next2 = this[ 'dom_node()' ]
				if( next2 ) return next2
				
				next2 = $mol_dom_context.document.getElementById( path )
				if( next2 ) {
					if( (<any>next2)[ '$mol_view' ] ) {
						return this[ 'dom_node()' ] = next2
					}
				} else {
					next2 = $mol_dom_context.document.createElementNS( this.dom_name_space() , this.dom_name() )
				}
			}
			
			next2.id = path
			void( (<any>next2)[ '$mol_view' ] = this )
			this[ 'dom_node()' ] = next2
			
			/// Set BEM-like element-attributes with inheritance support
			const owner = this.object_owner()
			if( owner instanceof $mol_view ) {
				const suffix = this.object_field().replace( /\(.*/ , '' )
				const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1)
				owner.view_classes().forEach( Class => {
					if( suffix in Class.prototype ) {
						const attrName = Class.toString().replace( /\$/g , '' ) + suffix2
						next2.setAttribute( attrName , '' )
					}
				} )
			}
			
			/// Set BEM-like block-attributes with inheritance support
			this.view_classes().forEach( Class => {
				next2.setAttribute( Class.toString().replace( /\$/g , '' ).toLowerCase() , '' ) 
			} )
			
			/// Bind properties to events
			$mol_view.bind_event( next2 , this.event() )
			
			return next2
		}
		
		static bind_event( node: Element , events: { [ key : string ] : ( event : Event )=> void } ) {
			for( let name in events ) {
				let handle = events[ name ]
				node.addEventListener( name , event => {
					$mol_atom_task( `${ this }.event()['${ name }']` , ()=> {
						handle( event )
					} ).get()
				} )
			}
		}
		
		static render_sub( node : Element , sub : ($mol_view|Node|string|number|boolean)[] ) {
			if( sub == null ) return
				
			let nextNode = node.firstChild
			for( let view of sub ) {
				
				if( view == null ) {
				} else if( typeof view === 'object' ) {
					const existsNode = ( ( view instanceof $mol_view ) ? view.dom_node() : view.valueOf() as Node )
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
				} else {
					if( nextNode && nextNode.nodeName === '#text' ) {
						nextNode.nodeValue = String( view )
						nextNode = nextNode.nextSibling
					} else {
						const textNode = $mol_dom_context.document.createTextNode( String( view ) )
						node.insertBefore( textNode , nextNode )
					}
				}
				
			}
			
			while( nextNode ) {
				const currNode = nextNode
				nextNode = currNode.nextSibling
				node.removeChild( currNode )
			}
			
			for( let view of sub ) {
				if( view instanceof $mol_view ) {
					try {
						view.dom_tree()
					} catch( e ) {
						console.error(e)
					}
				}
			}
		}
		
		static render_attr( node : Element , attrs : { [ key : string ] : string|number|boolean } ) {
			for( let name in attrs ) {
				let val = attrs[ name ]
				if( ( val == null ) || ( val === false ) ) {
					node.removeAttribute( name )
				} else if( val === true ) {
					node.setAttribute( name , 'true' )
				} else {
					node.setAttribute( name , String( val ) )
				}
			}
		}
		
		static render_style( node : HTMLElement , styles : { [ key : string ] : string|number } ) {
			for( let name in styles ) {
				let val = styles[ name ] as any
				if( typeof val === 'number' ) val = `${ val }px`
				const style = node.style as any
				style[ name ] = val
			}
		}
		
		static render_field( node : any , field : { [ key : string ] : any } ) {
			for( let key in field ) {
				const val = field[ key ]
				if( node[ key ] !== val ) node[ key ] = val
			}
		}
		
		@ $mol_mem()
		dom_tree() {
			let node = this.dom_node() as HTMLElement
			
			try {
				$mol_view.render_attr( node , this.attr() )
				$mol_view.render_style( node , this.style() )
				$mol_view.render_sub( node , this.sub_visible() )
				$mol_view.render_field( node , this.field() )
				
				return node
			} catch( error ) {
				if( !error['$mol_view_catched'] ) {
					node.setAttribute( 'mol_view_error' , error.name )
					error['$mol_view_catched'] = true
				}
				throw error
			}
		}
		
		attr() : { [ key : string ] : string|number|boolean } { return {
			'mol_view_error' : false
		} }
		
		style() : { [ key : string ] : string|number } { return {
		} }
		
		field() : { [ key : string ] : any } { return {
		} }
		
		event() : { [ key : string ] : ( event : Event )=> void } { return {} }
		
		'locale_contexts()' : string[]
		locale_contexts() {
			return this['locale_contexts()'] || ( this[ 'locale_contexts()' ] = this.view_classes().map( String ) )
		}
		
	}
	
}
