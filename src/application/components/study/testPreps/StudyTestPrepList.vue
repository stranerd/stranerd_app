<template>
	<div>
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-main_dark">
				Test Preps
			</span>

			<router-link class="text-primary normalText flex items-center font-bold "
				to="/study/preps/explore">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl" />
			</router-link>
		</div>

		<template v-if="testPreps.length === 0">
			<div class="py-3">
				<EmptyState info="No TestPreps Available." />
			</div>
		</template>
		<template v-else>
			<Swiper :freeMode="true" :items="testPreps" :slides="1.1" class="mt-2 overflow-x-auto flex"
				slideClass="flex md:!w-[300px] !w-[265px] mr-3 lg:!w-2/5 lg:!max-w-[18rem] !mr-6">
				<template v-slot:default="{ item }">
					<TestPrepCard :testPrep="item" colorClass="bg-tinted_pink" />
				</template>
			</Swiper>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { IonIcon } from '@ionic/vue'
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons'
import Swiper from '@app/components/core/Swiper.vue'
import { useTestPrepList } from '@app/composable/study/testPreps'
import TestPrepCard from './StudyTestPrepListCard.vue'

export default defineComponent({
	name: 'StudyTestPrepList',
	components: { IonIcon, Swiper, TestPrepCard },
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
			testPreps, chevronForwardOutline, chevronBackOutline
		}
	}
})
</script>

<style>

</style>
