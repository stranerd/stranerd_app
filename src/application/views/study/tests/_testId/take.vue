<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div class="h-full flex flex-col">
			<BlockLoading v-if="loading" />
			<TestBody v-else-if="test" :test="test" />
			<NotFound v-else title="Test not found" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import TestBody from '@app/components/study/tests/TestBody.vue'
import { useTest } from '@app/composable/study/tests'
import { useRoute } from 'vue-router'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'StudyTestsTestIdTake',
	components: { TestBody },
	beforeRouteEnter: generateMiddlewares([ 'isAuthenticated' ]),
	setup () {
		const { testId } = useRoute().params
		const { error, loading, test } = useTest(testId as string)
		useRouteMeta(computed(() => test.value?.name ?? 'Test'), { back: true })
		return { error, loading, test }
	}
})
</script>
