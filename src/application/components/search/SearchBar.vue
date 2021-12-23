<template>
	<form>
		<ion-searchbar v-model.trim="searchTerm"
			class="w-full p-0"
			placeholder="Search for anything..."
			showCancelButton="never"
			showClearButton="never"
		/>
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSearch } from '@app/composable/meta/search'
import { IonSearchbar } from '@ionic/vue'

export default defineComponent({
	name: 'SearchBar',
	components: { IonSearchbar },
	setup () {
		const { searchTerm } = useSearch()
		return { searchTerm }
	}
})
</script>

<style lang="scss" scoped>
	ion-searchbar {
		--background: #FFFFFF;
		--box-shadow: 0px 0px 0px 1px #F7F7FC;
		--border-radius: .75rem;
		border-radius: .75rem;
		--icon-color: #8B9EB1;
		--color: #8B9EB1;
	}
</style>
