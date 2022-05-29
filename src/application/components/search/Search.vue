<template>
	<form class="w-full" @submit.prevent="search">
		<IonSearchbar v-model.trim="searchTerm"
			:search-icon="searchOutline"
			class="w-full"
			mode="md"
			placeholder="Search for anything"
			showCancelButton="never"
			type="search"
		/>
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSearch } from '@app/composable/meta/search'
import { searchOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'Search',
	setup () {
		const { searchTerm, search } = useSearch()
		return { search, searchTerm, searchOutline }
	}
})
</script>
