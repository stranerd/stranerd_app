<template>
	<div>
		<EmptyState v-if="!loading && !error && unCompletedTests.length === 0" info="You have no uncompleted tests" />
		<BlockLoading v-if="loading" />
		<div v-else class="showcase-flex">
			<ContinueTestCard v-for="test in unCompletedTests" :key="test.hash" :test="test" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { chevronBackOutline, chevronForwardOutline, ellipseOutline } from 'ionicons/icons'
import EmptyState from '@app/components/core/EmptyState.vue'
import ContinueTestCard from '@app/components/study/tests/ContinueTestCard.vue'
import { useTestList } from '@app/composable/study/tests'

export default defineComponent({
	name: 'ContinueTests',
	components: { EmptyState, ContinueTestCard },
	setup () {
		const { unCompletedTests, loading, error } = useTestList()
		return {
			chevronForwardOutline, chevronBackOutline, ellipseOutline,
			unCompletedTests, loading, error
		}
	}
})
</script>
