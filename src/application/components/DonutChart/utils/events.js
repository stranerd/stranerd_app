export const nativeSectionEvents = [
	'click',
	'mouseenter',
	'mouseleave',
	'mouseover',
	'mouseout',
	'mousemove'
].map((nativeEventName) => ({
	nativeEventName,
<<<<<<< HEAD
	sectionEventName: `section-${nativeEventName}`
=======
	sectionEventName: `section-${ nativeEventName }`
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
}))

export default null
