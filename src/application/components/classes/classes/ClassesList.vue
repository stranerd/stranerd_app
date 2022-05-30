<template>
	<div class="showcase-flex">
		<form class="p-2 border-bottom-line" @submit.prevent="search">
			<IonSearchbar v-model.trim="searchValue" class="!bg-[transparent]" placeholder="Find a class"
				type="search" />
		</form>
		<BlockLoading v-if="loading" />
		<template v-else-if="searchMode">
			<div v-if="searchResults.length === 0" class="p-4">
				<EmptyState class="bg-itemBg p-4 rounded-xl"
					info="If you cannot find your class, contact your class rep to create it." />
			</div>
			<SearchClassListCard v-for="classInst in searchResults" :key="classInst.hash" :classInst="classInst"
				class="border-bottom-line" />
		</template>
		<template v-else>
			<EmptyState v-if="!loading && !error && classes.length === 0" class="border-bottom-line py-6"
				info="You are not in a class!" />
			<ClassListCard v-for="classInst in classes" :key="classInst.hash" :classInst="classInst"
				class="border-bottom-line" />
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassListCard from '@app/components/classes/classes/ClassListCard.vue'
import { useUserClassList } from '@app/composable/users/users/classes'
import SearchClassListCard from '@app/components/classes/classes/SearchClassListCard.vue'

export default defineComponent({
	name: 'ClassesList',
	components: { ClassListCard, SearchClassListCard },
	setup () {
		const {
			classes, error, loading,
			searchMode, searchValue, searchResults, search
		} = useUserClassList()
		return {
			classes, error, loading,
			searchMode, searchValue, searchResults, search
		}
	}
})
</script>
