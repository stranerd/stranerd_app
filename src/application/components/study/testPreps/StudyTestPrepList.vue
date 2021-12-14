<template>
	<div>
		<div class="w-full flex justify-between">
			<div class="heading font-bold text-main_dark flex items-center">


				<ion-text class="mr-3">
					Test Prep
				</ion-text>
				<ion-badge v-if="suggested" class="uppercase">
					Suggested
				</ion-badge>
			</div>

			<router-link class="text-primary normalText flex items-center font-bold "
				to="/study/preps/explore">
				<span>view all</span>
			</router-link>
		</div>

		<template v-if="testPreps.length === 0">
			<div class="py-3">
				<EmptyState info="No TestPreps Available." />
			</div>
		</template>
		<template v-else>
			<Swiper :freeMode="true" :items="testPreps" :slides="1.1" class="mt-2 overflow-x-auto flex"
				slideClass="flex md:!w-[300px] !w-[265px] mr-3 lg:!w-2/5 lg:!max-w-[18rem] min-w-[16.5rem] !mr-6">
				<template v-slot:default="{ item, index }">
					<TestPrepCard :colorClass=" index  === 0 ? 'bg-white' : 'bg-white'" :index="index"
						:testPrep="item" />
				</template>
			</Swiper>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons'
import Swiper from '@app/components/core/Swiper.vue'
import { useTestPrepList } from '@app/composable/study/testPreps'
import TestPrepCard from './StudyTestPrepListCard.vue'
import { IonBadge } from '@ionic/vue'

export default defineComponent({
	name: 'StudyTestPrepList',
	components: { Swiper, TestPrepCard, IonBadge },
	props: {
		suggested: {
			required: false,
			default: false
		}
	},
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
	ion-badge {
		--background: #FFDC00 !important;
		--color: #132740 !important;
		--padding-top: 6px !important;
	}
</style>
