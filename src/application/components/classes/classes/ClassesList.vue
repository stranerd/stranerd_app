<template>
	<div class="showcase-flex">
		<div class="px-4 py-6 flex items-center border-bottom-line">
			<IonIcon :icon="linkOutline" class="text-heading2"/>
			<IonText class="ml-3 text-heading">Stranerd Connect</IonText>
		</div>
		<div class="px-4 py-6 flex items-center justify-between border-bottom-line">
			<IonText class=" text-heading font-bold">Recent</IonText>
			<IonIcon :icon="chevronDownOutline" class="text-heading"/>
		</div>
		<div class="px-4 py-6 flex items-center justify-between border-bottom-line">
			<IonText class=" text-heading font-bold">Direct messages</IonText>
			<IonIcon :icon="chevronDownOutline" class="text-heading"/>
		</div>
		<template v-if="searchMode">
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
		<BlockLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassListCard from '@app/components/classes/classes/ClassListCard.vue'
import { useUserClassList } from '@app/composable/users/users/classes'
import SearchClassListCard from '@app/components/classes/classes/SearchClassListCard.vue'
import {linkOutline, chevronDownOutline} from 'ionicons/icons'
export default defineComponent({
	name: 'ClassesList',
	components: { ClassListCard, SearchClassListCard },
	setup () {
		const {
			classes, error, loading,
			searchMode, searchValue, searchResults, search
		} = useUserClassList()
		return {
			classes, error, loading, linkOutline, chevronDownOutline,
			searchMode, searchValue, searchResults, search
		}
	}
})
</script>
