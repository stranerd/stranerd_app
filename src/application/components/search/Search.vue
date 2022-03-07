<template>
	<form class="w-full" @submit.prevent="search">
		<ion-searchbar v-model.trim="searchTerm"
			:search-icon="searchOutline"
			class="w-full"
			mode="md"
			:placeholder="placeholder"
			showCancelButton="never"
			type="search"
		/>
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSearch } from '@app/composable/meta/search'
import { IonSearchbar } from '@ionic/vue'
import { searchOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'Search',
	props:{
		placeholder: {
			type: String,
			default: 'Search for anything...'
		}
	},
	components: { IonSearchbar },
	setup () {
		const { searchTerm, search } = useSearch()
		return { search, searchTerm, searchOutline }
	}
})
</script>
