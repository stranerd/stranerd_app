<template>
	<DefaultLayout>
		<div class="h-full flex flex-col">
			<PageLoading v-if="loading" />
			<TestResults v-else-if="test" :test="test" />
			<NotFound v-else title="Test not found" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTest } from '@app/composable/study/tests'
import { useRoute } from 'vue-router'
import TestResults from '@app/components/study/tests/TestResults.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'StudyTestsTestIdResults',
	components: { TestResults },
	beforeRouteEnter: generateMiddlewares([ 'isAuthenticated' ]),
	setup () {
		useRouteMeta('Results', { back: true })
		const { testId } = useRoute().params
		const { error, loading, test } = useTest(testId as string)
		return { error, loading, test }
	}
})
</script>
