<template>
	<div class="showcase-flex gap-4">
		<EmptyTests v-if="!loading && !error && unCompletedTests.length === 0" />
		<BlockLoading v-if="loading" />
		<ContinueTestCard v-for="test in unCompletedTests" :key="test.hash" :test="test" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContinueTestCard from '@app/components/study/tests/ContinueTestCard.vue'
import { useTestList } from '@app/composable/study/tests'

export default defineComponent({
	name: 'ContinueTests',
	components: { ContinueTestCard },
	setup () {
		const { unCompletedTests, loading, error } = useTestList()
		return { unCompletedTests, loading, error }
	}
})
</script>
