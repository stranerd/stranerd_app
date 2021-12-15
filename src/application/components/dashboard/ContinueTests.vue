<template>
	<div>
		<div class="w-full flex mb-8">
			<span class="heading font-bold text-main_dark">
				Recently Uncompleted tests
			</span>
		</div>

		<template v-if="tests.length === 0">
			<div class="py-3">
				<empty-state info="You have no uncompleted tests" />
			</div>
		</template>

		<template v-else>
			<div class="showcase">
				<ContinueTestCard v-for="(test, index) in continueTest" :key="test" :test="test" :index="index+1"  />
			</div>
		</template>


	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, computed } from 'vue'  
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import EmptyState from '@app/components/core/EmptyState.vue'
import ContinueTestCard from '../study/tests/ContinueTestCard.vue'
import { useTestList } from '@app/composable/study/tests'
 
export default defineComponent({
	name: 'ContinueTests',
	components: {  EmptyState, ContinueTestCard },
	setup () {
		const { unCompletedTests: tests, listener, loading, error } = useTestList()

		const continueTest = computed({
			get: () => tests.value.slice(0, 3),
			set: () => {
			}
		})

		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return {
			chevronForwardOutline, chevronBackOutline, ellipse,
			tests, loading, error, continueTest
		}
	}
})
</script>

<style>

</style>
