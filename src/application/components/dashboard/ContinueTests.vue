<template>
	<div>
		<div class="w-full flex">
			<span class="heading font-bold text-main_dark">
				Continue where you stopped
			</span>
		</div>

		<template v-if="tests.length === 0">
			<div class="py-3">
				<empty-state info="You have no uncompleted tests" />
			</div>
		</template>
		<template v-else>
			<Swiper :freeMode="true" :items="tests" :slides="1.1" class="mt-2 overflow-x-auto flex"
				slideClass="flex md:!w-[300px] !w-[265px] mr-3 lg:!w-2/5 lg:!max-w-[18rem] !mr-6">
				<template v-slot:default="{ item, index }">
					<ContinueTestCard :colorClass="0 === index ? 'bg-tinted_pink' : 'bg-tinted_pink'" :test="item"
						class="h-[9rem]" />
				</template>
			</Swiper>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import Swiper from '@app/components/core/Swiper.vue'
import EmptyState from '@app/components/core/EmptyState.vue'
import ContinueTestCard from '../study/tests/ContinueTestCard.vue'
import { useTestList } from '@app/composable/study/tests'

export default defineComponent({
	name: 'ContinueTests',
	components: { Swiper, EmptyState, ContinueTestCard },
	setup () {
		const { unCompletedTests: tests, listener, loading, error } = useTestList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return {
			chevronForwardOutline, chevronBackOutline, ellipse,
			tests, loading, error
		}
	}
})
</script>

<style>

</style>
