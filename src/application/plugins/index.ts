import { App } from 'vue'
<<<<<<< HEAD

type PluginFunction = (app: App) => Promise<void>
=======
import { Router } from 'vue-router'

type Args = {
	app: App,
	router: Router
}

type PluginFunction = (args: Args) => Promise<void>
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c

export const definePlugin = (plugin: PluginFunction) => plugin
