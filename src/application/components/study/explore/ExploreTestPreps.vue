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
