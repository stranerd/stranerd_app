<template>
	<form class="w-full" @submit.prevent="search">
		<IonSearchbar v-model.trim="searchTerm"
			:search-icon="searchOutline"
			class="w-full"
			mode="md"
			placeholder="Search"
			showCancelButton="never"
			type="search"
		/>
	</form>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useSearch } from '@app/composable/meta/search'
import { searchOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'Search',
	setup () {
		const { searchTerm, navigateToSearch, search } = useSearch()
		watch(searchTerm, navigateToSearch)
		return { search, searchTerm, searchOutline }
	}
})
</script>
