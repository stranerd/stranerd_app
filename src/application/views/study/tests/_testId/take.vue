<template>
	<Justified :hideBottom="true">
		<div class="blueTop !mb-0">
			<div class="flex items-center  md:justify-between justify-center h-20 w-full lg:w-8/12 px-8 mx-auto text-xl border-bottom-line ">
				<ion-text class="font-bold hidden md:block">
					{{test?.isTimed? 'Test' : 'Study'}}
				</ion-text>
				<ion-text class="text-main_dark  text-center ">
					{{ title }}
				</ion-text>
			</div>
		</div>

		<TestBody v-if="test" :test="test" />

		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import TestBody from '@app/components/study/tests/TestBody.vue'
import { useTest } from '@app/composable/study/tests'
import { useRoute } from 'vue-router'
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'StudyTestsTestIdTake',
	displayName: 'Test',
	components: { Justified, TestBody },
	middlewares: ['isAuthenticated'],
	setup () {
		const { testId } = useRoute().params
		const title = computed(()=>{
			return test.value?.name.split(' ').join('/') ?? ''
		})	
		const { error, loading, test } = useTest(testId as string)
		return { error, loading, test, title }
	}
})
</script>
