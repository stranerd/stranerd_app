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

<script lang="ts" setup>
import { watch } from 'vue'
import { useSearch } from '@app/composable/meta/search'
import { searchOutline } from 'ionicons/icons'

const { searchTerm, navigateToSearch, search } = useSearch()
watch(searchTerm, navigateToSearch)
</script>
