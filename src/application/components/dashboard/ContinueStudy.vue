<template>
	<div>
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-main_dark">
				Continue where you stopped
			</span>

			<router-link v-if="testPreps.length " class="text-primary normalText flex items-center font-semibold"
				to="/questions">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl"></ion-icon>
			</router-link>
		</div>

		<template v-if="testPreps.length === 0">
			<div class="py-3">
				<empty-state
					info="You have no uncompleted testPrep"
				></empty-state>
			</div>
		</template>
		<template v-else>
			<Swiper :freeMode="true" :items="testPreps" :slides="1.1" class="mt-2 overflow-x-auto flex"
				slideClass="flex md:!w-[300px] !w-[265px] mr-3 lg:!w-2/5 lg:!max-w-[18rem] !mr-6">
				<template v-slot:default="{ item, index }">
					<PlainStudyCard :colorClass="0 === index ? 'bg-tinted_pink' : 'bg-tinted_pink'" :fromHome="true"
						:testPrep="item" class="h-[9rem]" />
				</template>
			</Swiper>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { IonIcon } from '@ionic/vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import Swiper from '@app/components/core/Swiper.vue'
import EmptyState from '@app/components/core/EmptyState.vue'
import { useTestPrepList } from '@app/composable/study/testPreps'
import PlainStudyCard from '../study/PlainStudyCard.vue'

export default defineComponent({
	name: 'RecentQuestions',
	components: { IonIcon, Swiper, EmptyState, PlainStudyCard },
	setup () {
		const { testPreps: allTestPreps, listener, loading, error } = useTestPrepList()
		const testPreps = computed({
			get: () => allTestPreps.value.slice(0, 6),
			set: () => {
			}
		})
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return {
			chevronForwardOutline, chevronBackOutline, ellipse,
			testPreps, loading, error
		}
	}
})
</script>

<style>

</style>
