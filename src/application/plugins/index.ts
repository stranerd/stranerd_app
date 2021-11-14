import { App } from 'vue'

type PluginFunction = (app: App) => Promise<void>

export const definePlugin = (plugin: PluginFunction) => plugin
