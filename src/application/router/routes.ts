const getPath = (page: string[]) => page.map((path) => {
	if (path === 'index') return ''
	if (path === '_') return ':pathMatch(.*)*'
	if (path.startsWith('^')) path = path.replace('^', '')
	if (path.startsWith('_')) path = path.replace('_', ':')
	return path
}).join('/').replaceAll('///', '/').replaceAll('//', '/')

const makeRoute = (page: string[]) => {
	const path = '/' + getPath(page)
	const name = page.join('-')
	return { path, name, component: () => import(`../views/${page.join('/')}.vue`) }
}

const allPages = ((require as any).context('../views', true, /\.vue$/, 'lazy').keys() as string[])
	.map((key) => key.slice(2).replace('.vue', '').split('/'))
	.map((path) => {
		let parent = null as null | string

		const nestedIndex = path.findIndex((p) => p.startsWith('^'))
		if (nestedIndex > -1) parent = getPath(path.slice(0, nestedIndex))

		return { parent, path }
	})

const nestedPages = allPages.filter((page) => page.parent)

export const routes = allPages.filter((page) => !page.parent)
	.map((page) => {
		const path = getPath(page.path)
		const childrenPages = nestedPages.filter((p) => p.parent === path).map((p) => p.path)

		const route = makeRoute(page.path)
		const children = childrenPages.map(makeRoute)

		return { ...route, children }
	})
