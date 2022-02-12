<template>
	<Justified :hideBottom="true" :hideFab="true">
		<div class="blueTop !mb-0">
			<div class="flex items-center">
				<ion-text class="text-white font-semibold text-center text-xl">
					{{ test?.name ?? '' }}
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
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'StudyTestsTestIdTake',
	displayName: 'Test',
	components: { Justified, TestBody },
	middlewares: ['isAuthenticated'],
	setup () {
		const { testId } = useRoute().params
		const { error, loading, test } = useTest(testId as string)
		return { error, loading, test }
	}
})
</script>
