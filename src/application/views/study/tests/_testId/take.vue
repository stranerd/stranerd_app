<template>
	<Justified :hideBottom="true">
		<div v-if="test">
			<div class="blueTop !mb-0">
				<div
					class="flex items-center md:justify-between justify-center w-full lg:w-8/12 p-4 mx-auto text-lg border-bottom-line">
					<IonText class="font-bold hidden md:block capitalize">
						{{ test.isTimed ? 'Test' : 'Study' }}
					</IonText>
					<IonText class="text-secondaryText text-center capitalize">
						{{ test.name }}
					</IonText>
				</div>
			</div>
			<TestBody v-if="test" :test="test" class="lg:w-8/12 w-full mx-auto" />
		</div>
		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import TestBody from '@app/components/study/tests/TestBody.vue'
import { useTest } from '@app/composable/study/tests'
import { useRoute } from 'vue-router'
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'StudyTestsTestIdTake',
	displayName: 'Test',
	components: { Justified, TestBody },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		const { testId } = useRoute().params
		const { error, loading, test } = useTest(testId as string)
		return { error, loading, test }
	}
})
</script>
