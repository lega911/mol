module $.$mol {
	export class $mol_scroller extends $.$mol_scroller {

		@ $mol_prop()
		scrollTop( ...diff : number[] ) {
			return this.local<number>( 'scrollTop()' , ...diff ) || 0
		}

		@ $mol_prop()
		scrollLeft( ...diff : number[] ) {
			return this.local<number>( 'scrollLeft()' , ...diff ) || 0
		}

		@ $mol_prop()
		eventScroll( ...diff : Event[] ) {
			var el = ( diff[0].target as HTMLElement )
			this.scrollTop( el.scrollTop )
			this.scrollLeft( el.scrollLeft )
			diff[0].preventDefault()
		}

		@ $mol_prop()
		eventWheel( ...diff : MouseWheelEvent[] ) {
			if( diff[0].defaultPrevented ) return
	
			var target = <HTMLElement> this.DOMNode()
	
			if(( target.scrollHeight > target.offsetHeight ) || ( target.scrollWidth > target.offsetWidth )) {
				diff[0].preventDefault()
	
				target.scrollTop -= diff[0].wheelDeltaY
				target.scrollLeft -= diff[0].wheelDeltaX
			}
		}

	}
}