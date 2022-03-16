<template>
	<div>
		<div v-if="sliced" class="w-full flex justify-between md:mb-4 px-4 md:px-0">
			<span class="heading font-bold text-main_dark">
				Continue test preps
			</span>
			<router-link class="text-primary text-body flex items-center"
				to="/study/tests/continue">
				<span>view all</span>
			</router-link>
		</div>

		<EmptyState v-if="!loading && !error && tests.length === 0" info="You have no uncompleted tests" />
		<div v-else class="showcase">
			<ContinueTestCard v-for="test in tests" :key="test.hash" :test="test" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { chevronBackOutline, chevronForwardOutline, ellipseOutline } from 'ionicons/icons'
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
		const { unCompletedTests, loading, error } = useTestList()

		const tests = computed({
			get: () => unCompletedTests.value.slice(0, props.sliced ? 3 : undefined),
			set: () => {
			}
		})

		return {
			chevronForwardOutline, chevronBackOutline, ellipseOutline,
			tests, loading, error
		}
	}
})
</script>
