<template>
	<div>
		<template v-if="testPreps.length === 0">
			<EmptyState info="No test preps to explore" />
		</template>
		<template v-else>
			<div class="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
				<TestPrepCard v-for="testPrep in testPreps" :key="testPrep" :testPrep="testPrep" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { useTestPrepList } from '@app/composable/study/testPreps'
import { calendar, play } from 'ionicons/icons'
import TestPrepCard from '@app/components/study/testPreps/TestPrepListCard.vue'

export default defineComponent({
	name: 'ExploreTestPreps',
	components: { TestPrepCard },
	props: {
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup () {
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
