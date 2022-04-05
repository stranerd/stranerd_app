<template>
	<div>
		<form class="bg-white p-4 md:mb-4 md:rounded-xl" @submit.prevent="fetchClasses">
			<IonSearchbar v-model.trim="searchTerm" class="w-full" mode="md"
				placeholder="Search for a class" showCancelButton="never" type="search" />
		</form>
		<EmptyState v-if="!loading && !error && classes.length === 0" info="No classes found" />
		<div class="grid grid-cols-1 lg:grid-cols-2 md:gap-4">
			<ClassListCard v-for="classInst in classes" :key="classInst" :classInst="classInst" />
		</div>
		<IonSkeletonText v-if="loading" animated class="h-28 rounded-xl px-4" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassListCard from '@app/components/classes/classes/ExploreClassListCard.vue'
import { useClassList } from '@app/composable/classes/classes'
import { IonSearchbar, IonSkeletonText } from '@ionic/vue'

export default defineComponent({
	name: 'ExploreClassesList',
	components: { ClassListCard, IonSkeletonText, IonSearchbar },
	setup () {
		const { classes, error, loading, searchTerm, fetchClasses } = useClassList()
		return { classes, error, loading, searchTerm, fetchClasses }
	}
})
</script>
