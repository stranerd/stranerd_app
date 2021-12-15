<template>
	<div class="md:w-8/12 w-full px-4 mx-auto mt-8">
		<template v-if="testPreps.length === 0">
			<div class="py-3">
				<EmptyState info="No TestPreps to Explore" />
			</div>
		</template>
		<template v-else>
			<div class="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mt-8">
				<TestPrepCard v-for="(testPrep, index) in testPreps" :key="testPrep" :testPrep="testPrep" :index="index+1"  />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import Institution from '@app/components/study/institutions/Institution.vue'
import { useTestPrepList } from '@app/composable/study/testPreps'
import { calendar, play } from 'ionicons/icons'
import TestPrepCard from '@app/components/study/testPreps/StudyTestPrepListCard.vue'


export default defineComponent({
	name: 'ExploreTestPrep',
	components: { TestPrepCard },
	setup () {
		// const { groupedByInstitution, listener, loading, error } = useTestPrepList()
		const { testPreps, listener, loading, error } = useTestPrepList()

		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return { testPreps, calendar, play, loading, error }
	}
})
</script>

<style scoped>
	ion-select {
		--background: #F7F7FC;
		background: #F7F7FC;
		--padding-start: 1rem;
		--padding-end: 1rem;
	}

	ion-segment {
		--background: #F7F7FC;
		color: #8B9EB1;
		font-weight: bold;
	}

	ion-segment-button {
		--background-checked: #4D5C6F;
		--background-focused: #4D5C6F;
		--indicator-color: #4D5C6F;
		--indicator-box-shadow: none;
		--padding-top: 0.5rem;
		--padding-bottom: 0.5rem;
		color: #8B9EB1;
		font-weight: bold;
	}
</style>
