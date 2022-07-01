<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div v-if="test">
			<div
				class="flex items-center md:justify-between justify-center w-full lg:w-8/12 p-4 mx-auto text-lg border-bottom-line">
				<IonText class="font-bold hidden md:block capitalize">
					{{ test.isTimed ? 'Test' : 'Study' }}
				</IonText>
				<IonText class="text-secondaryText text-center capitalize">
					{{ test.name }}
				</IonText>
			</div>
			<TestBody v-if="test" :test="test" class="lg:w-8/12 w-full mx-auto" />
		</div>
		<PageLoading v-if="loading" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TestBody from '@app/components/study/tests/TestBody.vue'
import { useTest } from '@app/composable/study/tests'
import { useRoute } from 'vue-router'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'StudyTestsTestIdTake',
	components: { TestBody },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Test', { back: true })
		const { testId } = useRoute().params
		const { error, loading, test } = useTest(testId as string)
		return { error, loading, test }
	}
})
</script>
