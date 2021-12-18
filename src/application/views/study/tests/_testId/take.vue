<template>
	<Justified>
		<!-- TODO: Break into sections -->
		<div class="bg-primary w-full min-h-[130px] flex flex-col justify-center items-center pt-0 pb-1">
			<div class="flex items-center">
				<ion-text class="text-white font-semibold text-center text-xl">
					{{ test?.name ?? '' }}
				</ion-text>
			</div>
		</div>

		<TestBody v-if="test" :key="test.hash" :test="test" />

		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import TestBody from '@app/components/study/tests/TestBody.vue'
import { useTest } from '@app/composable/study/tests'
import { useRoute } from 'vue-router'
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'

export default defineComponent({
	name: 'TakeTest',
	displayName: 'Test',
	components: { Justified, TestBody },
	middlewares: ['isAuthenticated'],
	setup () {
		const { testId } = useRoute().params
		const { error, listener, loading, test } = useTest(testId as string)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { error, loading, test }
	}
})
</script>
