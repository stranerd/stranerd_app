<template>
	<div class="showcase-flex gap-4">
		<EmptyTests v-if="!loading && !error && unCompletedTests.length === 0" />
		<BlockLoading v-if="loading" />
		<ContinueTestCard v-for="test in unCompletedTests" :key="test.hash" :test="test" />
	</div>
</template>

<script lang="ts" setup>
import ContinueTestCard from '@app/components/study/tests/ContinueTestCard.vue'
import { useTestList } from '@app/composable/study/tests'

const { unCompletedTests, loading, error } = useTestList()
</script>
