if( typeof alert === 'function' ) {
	let nativeAlert = alert
	window.alert = function alert( message ) {
		console.warn( 'Alerts causes atom synchronization problems in IE. Use custom notificator instead.' )
		return nativeAlert( message )
	}
}

if( typeof confirm === 'function' ) {
	let nativeConfirm = confirm
	window.confirm = function confirm( question ) {
		console.warn( 'Confirms causes atom synchronization problems in IE. Use custom dialog instead.' )
		return nativeConfirm( question )
	}
}

if( typeof confirm === 'function' ) {
	let nativePrompt = prompt
	window.prompt = function prompt( question , def ) {
		console.warn( 'Prompts causes atom synchronization problems in IE. Use custom dialog instead.' )
		return nativePrompt( question , def )
	}
}
