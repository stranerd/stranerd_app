<template>
	<div class="flex flex-col">
		<form class="p-4 border-bottom-line" @submit.prevent="search">
			<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
		</form>
		<template v-if="searchMode">
			<div v-if="searchResults.length === 0" class="p-4">
				<EmptyState class="bg-itemBg p-4 rounded-xl"
					info="If you cannot find your class, contact your class representative to create it." />
			</div>
			<SearchClassListCard v-for="classInst in searchResults" :key="classInst.hash" :classInst="classInst"
				class="border-bottom-line" />
		</template>
		<template v-else>
			<EmptyState v-if="!loading && !error && classes.length === 0" class="border-bottom-line"
				info="No classes found!" />
			<SearchClassListCard v-for="classInst in classes" :key="classInst.hash" :classInst="classInst"
				class="border-bottom-line" />
		</template>
		<BlockLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useClassesList } from '@app/composable/classes/classes'
import SearchClassListCard from '@app/components/classes/classes/SearchClassListCard.vue'

export default defineComponent({
	name: 'ClassesList',
	components: { SearchClassListCard },
	setup () {
		const {
			classes, error, loading,
			searchMode, searchValue, searchResults, search
		} = useClassesList()
		return {
			classes, error, loading,
			searchMode, searchValue, searchResults, search
		}
	}
})
</script>
