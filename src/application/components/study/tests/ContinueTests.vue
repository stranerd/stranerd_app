<template>
	<div>
		<div v-if="sliced" class="w-full flex justify-between mb-4">
			<span class="heading font-bold text-main_dark">
				Recently Uncompleted Tests
			</span>
			<router-link class="text-primary normalText flex items-center font-bold"
				to="/study/tests/continue">
				<span>view all</span>
			</router-link>
		</div>

		<EmptyState v-if="tests.length === 0" info="You have no uncompleted tests" />
		<div v-else class="showcase">
			<ContinueTestCard v-for="test in tests" :key="test.hash" :test="test" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import EmptyState from '@app/components/core/EmptyState.vue'
import ContinueTestCard from '@app/components/study/tests/ContinueTestCard.vue'
import { useTestList } from '@app/composable/study/tests'

export default defineComponent({
	name: 'ContinueTests',
	components: { EmptyState, ContinueTestCard },
	props: {
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup (props) {
		const { unCompletedTests, listener, loading, error } = useTestList()

		const tests = computed({
			get: () => unCompletedTests.value.slice(0, props.sliced ? 6 : undefined),
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
