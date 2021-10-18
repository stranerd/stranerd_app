import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'

// define your typings for the store state
export interface State {
    showPage: boolean;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
	state: {
		showPage: false,
	},
	mutations: {
		showIonPage (state) {
			state.showPage = true
		},
		hideIonPage (state) {
			state.showPage = false
		}
	},
	plugins: [],
})

// define your own `useStore` composition function
export const useStore = () => {
	return baseUseStore(key)
}
