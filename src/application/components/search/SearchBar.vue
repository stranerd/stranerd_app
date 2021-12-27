<template>
	<form>
		<ion-searchbar v-model.trim="searchTerm"
			mode="md"
			:debounce="700"
			@click="switchPage"
			class="w-full p-0 cursor-pointer"
			placeholder="Search for anything..."
			showCancelButton="never"
			showClearButton="never"
			autocapitalize="true"
		/>
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSearch } from '@app/composable/meta/search'
import { IonSearchbar } from '@ionic/vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
	name: 'SearchBar',
	components: { IonSearchbar },
	setup () {
		const route = useRoute()
		const router = useRouter()
		const switchPage = ()=>{
			const val = searchTerm.value.trim()
			if (!route.path.startsWith('/search')) router.push(`/search?search=${val}`)
		}
		const { searchTerm } = useSearch()
		return { searchTerm, switchPage }
	}
})
</script>

<style lang="scss" scoped>
	ion-searchbar {
		--background: #F2F3F5;
		--box-shadow: none !important;
		--border-radius: .75rem;
		border-radius: .75rem;
		--icon-color: #8B9EB1;
		--color: #8B9EB1;
	}
	ion-searchbar::part(icon) {
		--background: red !important;
		background: red;
		--box-shadow: none !important;
		--border-radius: .75rem;
		border-radius: .75rem;
		--icon-color: #8B9EB1;
		--color: #8B9EB1;
	}
</style>
