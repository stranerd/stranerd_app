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

		<TestResults v-if="test" :test="test" />

		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { useTest } from '@app/composable/study/tests'
import { useRoute } from 'vue-router'
import TestResults from '@app/components/study/tests/TestResults.vue'

export default defineComponent({
	name: 'TestResult',
	displayName: 'Test',
	components: { TestResults, Justified },
	setup () {
		const { testId } = useRoute().params
		const { error, listener, loading, test } = useTest(testId as string)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { error, loading, test }
	}
})
</script>
