<template>
	<div>
		<div class="w-full flex mb-4">
			<span class="heading font-bold text-main_dark">
				Recently Uncompleted tests
			</span>
		</div>

		<template v-if="tests.length === 0">
			<EmptyState info="You have no uncompleted tests" />
		</template>

		<template v-else>
			<div class="showcase">
				<ContinueTestCard v-for="test in tests" :key="test.hash" :test="test" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import EmptyState from '@app/components/core/EmptyState.vue'
import ContinueTestCard from '../study/tests/ContinueTestCard.vue'
import { useTestList } from '@app/composable/study/tests'

export default defineComponent({
	name: 'ContinueTests',
	components: { EmptyState, ContinueTestCard },
	setup () {
		const { unCompletedTests, listener, loading, error } = useTestList()

		const tests = computed({
			get: () => unCompletedTests.value.slice(0, 3),
			set: () => {
			}
		})

		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return {
			chevronForwardOutline, chevronBackOutline, ellipse,
			tests, loading, error
		}
	}
})
</script>

<style>

</style>
