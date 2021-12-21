<template>
	<form>
		<ion-searchbar v-model.trim="searchTerm"
			cancel-button-icon="never"
			placeholder="Search for anything..."
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
		min-width: 26vw;
		--padding-bottom: 4em;
		@media (max-width: 1024px) {
			min-width: 92vw;
		}
	}
</style>
