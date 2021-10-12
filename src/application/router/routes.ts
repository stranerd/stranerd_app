const importAll = (r: __WebpackModuleApi.RequireContext) => r.keys()
	.map((key: string) => key.slice(2)
		.replace('.vue', '').split('/'))

const pages = importAll(require.context('../views', true, /\.vue$/))

const generateRoute = (path: any[]) => {
	// Note: remove first element if route starts with index
	if (path[0].toLowerCase().startsWith('index') && path.length > 1) {
		path.shift()
	}
	// Note: handle root routes
	if (path.length === 1) {
		const shortcut = path[0].toLowerCase()
		return shortcut.startsWith('index')
			? ''
		// Note: handle dynamic routes
			: shortcut.startsWith('_')
				? shortcut.replace('_', ':')
				: shortcut
	}
	// Note: handle other routes
	const lastElement = path[path.length - 1]
	// Note: remove last element in array if it is index
	if (lastElement.toLowerCase().startsWith('index')) {
		path.pop()
		// Note: handle dynamic routes
	} else if (lastElement.startsWith('_')) {
		path[path.length - 1] = lastElement.replace('_', ':')
	}
	return path.map((p: string) => p.toLowerCase()).join('/')
}

const childrenFilter = (p: string | string[]) => ~p.indexOf('^')

const childrenByPath = pages
// Note: filter pages by children routes
	.filter((path: any[]) => path.some(childrenFilter))
	.map((path: any) => {
		// Note: copy path and remove special char ^
		const copy = [...path]
		copy[copy.length - 1] = copy[copy.length - 1].slice(1)
		// Note: generate key to identify parent
		const key = `/${generateRoute(copy.slice(0, copy.length - 1))}`
		return {
			path,
			route: `/${generateRoute(copy)}`,
			key
		}
	})
	.reduce((acc: { [x: string]: any[] }, cur: { key: any }) => {
		// Note: generate list of nested routes where key is the parent path
		const key = cur.key
		delete cur.key
		if (acc[key]) {
			acc[key].push(cur)
		} else {
			acc[key] = [cur]
		}
		return acc
	}, {})

const defaultLayout = 'AppDefaultLayout'

export default pages
// Note: remove nested routes from pages
	.filter((path: any[]) => !path.some(childrenFilter))
	.map(async (path: any[]) => {
		const { default: component } = await import(`../views/${path.join('/')}`)
		const { layout, middlewares, name } = component
		const route = `/${generateRoute([...path])}`
		let children: { path: any; name: any; component: any; meta: { layout: any; middlewares: any } }[] = []
		if (childrenByPath[route]) {
			const promises = childrenByPath[route].map(async ({ path, route }) => {
				const { default: childComponent } =
          await import(`../views/${path.join('/')}`)
				const {
					layout: childLayout,
					middlewares: childMiddleware,
					name: childName
				} = childComponent
				return {
					path: route,
					name: childName,
					component: childComponent,
					meta: {
						layout: childLayout || defaultLayout,
						middlewares: childMiddleware || {}
					}
				}
			})
			children = await Promise.all(promises)
		}
		return {
			path: route,
			name,
			component,
			meta: {
				layout: layout || defaultLayout,
				middlewares: middlewares || {}
			},
			children
		}
	})
