<template>
	<Justified>
		<div class="blueTop !mb-0">
			<div class="flex items-center  md:justify-between justify-center  w-full lg:w-8/12 px-8 py-6 mx-auto text-xl border-bottom-line ">
				<ion-text class="font-bold hidden md:block">
					Result
				</ion-text>
				<ion-text class="text-main_dark  text-center ">
					{{ title }}
				</ion-text>
			</div>
		</div>

		<TestResults v-if="test" :test="test" />

		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { useTest } from '@app/composable/study/tests'
import { useRoute } from 'vue-router'
import TestResults from '@app/components/study/tests/TestResults.vue'

export default defineComponent({
	name: 'StudyTestsTestIdResults',
	displayName: 'Test',
	components: { TestResults, Justified },
	middlewares: ['isAuthenticated'],
	setup () {
		const { testId } = useRoute().params
		const title = computed(()=>{
			return test.value?.name.split(' ').join('/') ?? ''
		})
		const { error, loading, test } = useTest(testId as string)
		return { error, loading, test , title}
	}
})
</script>
