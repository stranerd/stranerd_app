import { ref } from 'vue'

const global = {
	loading: ref(false)
}

export const useRouteLoading = () => {
	return {
		...global,
		setLoading: async (loading: boolean) => global.loading.value = loading
	}
}
