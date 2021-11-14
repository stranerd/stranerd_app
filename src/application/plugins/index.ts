import { App } from 'vue'
import { Router } from 'vue-router'

type Args = {
	app: App,
	router: Router
}

type PluginFunction = (args: Args) => Promise<void>

export const definePlugin = (plugin: PluginFunction) => plugin
