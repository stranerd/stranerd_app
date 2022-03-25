<template>
	<Justified>
		<div v-if="test">
			<div class="blueTop !mb-0">
				<div
					class="flex items-center md:justify-between justify-center w-full lg:w-8/12 p-4 mx-auto text-lg border-bottom-line">
					<ion-text class="font-bold hidden md:block capitalize">
						Results
					</ion-text>
					<ion-text class="text-main_dark text-center capitalize">
						{{ test.name }}
					</ion-text>
				</div>
			</div>
			<TestResults v-if="test" :test="test" class="lg:w-8/12 w-full mx-auto" />
		</div>
		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { useTest } from '@app/composable/study/tests'
import { useRoute } from 'vue-router'
import TestResults from '@app/components/study/tests/TestResults.vue'

export default defineComponent({
	name: 'StudyTestsTestIdResults',
	displayName: 'Results',
	components: { TestResults, Justified },
	middlewares: ['isAuthenticated'],
	setup () {
		const { testId } = useRoute().params
		const { error, loading, test } = useTest(testId as string)
		return { error, loading, test }
	}
})
</script>
