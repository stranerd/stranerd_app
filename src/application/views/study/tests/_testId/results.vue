<template>
	<DefaultLayout>
		<div v-if="test">
			<div class="blueTop !mb-0">
				<div
					class="flex items-center md:justify-between justify-center w-full lg:w-8/12 p-4 mx-auto text-lg border-bottom-line">
					<IonText class="font-bold hidden md:block capitalize">
						Results
					</IonText>
					<IonText class="text-secondaryText text-center capitalize">
						{{ test.name }}
					</IonText>
				</div>
			</div>
			<TestResults v-if="test" :test="test" class="lg:w-8/12 w-full mx-auto" />
		</div>
		<PageLoading v-if="loading" />
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
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Results', { back: true })
		const { testId } = useRoute().params
		const { error, loading, test } = useTest(testId as string)
		return { error, loading, test }
	}
})
</script>
