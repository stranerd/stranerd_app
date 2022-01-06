<template>
	<div
		class="h-11 w-full bg-new_gray rounded-2xl cursor-pointer flex justify-between items-center px-6 text-gray min-w-[20.5rem]"
		@click="navigateToSearch">
		<ion-text>Search for anything</ion-text>
		<ion-icon :icon="search" class=" text-xl" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSearch } from '@app/composable/meta/search'
import { search } from 'ionicons/icons'

export default defineComponent({
	name: 'SearchBar',
	setup () {
		const { searchTerm, navigateToSearch } = useSearch()
		return { search, searchTerm, navigateToSearch }
	}
})
</script>

<style lang="scss" scoped>
	ion-searchbar {
		--background: #F2F3F5 !important;
		--box-shadow: none !important;
		--border-radius: .75rem;
		border-radius: .75rem;
		--icon-color: #8B9EB1;
		--color: #8B9EB1;
	}


</style>
