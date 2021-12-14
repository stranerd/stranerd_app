<template>
	<div>
		<div class="w-full flex">
			<span class="heading font-bold text-main_dark">
				Continue where you stopped
			</span>
		</div>

		<template v-if="tests.length === 0">
			<div class="py-3">
				<empty-state info="You have no uncompleted tests" />
			</div>
		</template>

		<template v-else>
			<div class="showcase">
				<ContinueTestCard v-for="(test, index) in tests" :key="test" :test="test" :index="index+1"  />
			</div>
		</template>


	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import EmptyState from '@app/components/core/EmptyState.vue'
import ContinueTestCard from '../study/tests/ContinueTestCard.vue'
import { useTestList } from '@app/composable/study/tests'

export default defineComponent({
	name: 'ContinueTests',
	components: {  EmptyState, ContinueTestCard },
	setup () {
		const { unCompletedTests: tests, listener, loading, error } = useTestList()
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
