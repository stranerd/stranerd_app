<template>
	<div>
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-main_dark">
				Test Prep
			</span>

			<router-link v-if="true && isLoggedIn"
				class="text-primary normalText flex items-center font-bold "
				to="/study/testprep/explore">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl"></ion-icon>
			</router-link>
		</div>

		<template v-if="testPreps.length === 0">
			<div class="py-3">
				<empty-state
					info="You Have no TestPreps Available."
				></empty-state>
			</div>
		</template>
		<template v-else>
			<Swiper :freeMode="true" :items="testPreps" :slides="1.1" class="mt-2 overflow-x-auto flex"
				slideClass="flex md:!w-[300px] !w-[265px] mr-3 lg:!w-2/5 lg:!max-w-[18rem] !mr-6">
				<template v-slot:default="{ item, index }">
					<TestPrepCard :colorClass=" index  === 0 ? 'bg-tinted_pink' : 'bg-tinted_pink'" :title="item?.title" :subText="item?.subText"
					/>

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
import { useAuth } from '@app/composable/auth/auth'
import { useTestPrepList } from '@app/composable/study/testPreps'
import TestPrepCard from './TestPrepCard.vue'

export default defineComponent({
	name: 'RecentTransactions',
	components: { IonIcon, Swiper,  TestPrepCard },
	setup () {
		const { id, isLoggedIn } = useAuth()

        		const { testPreps: allTestPreps, listener, loading, error } = useTestPrepList()
		const testPreps = computed({
			get: () => allTestPreps.value.slice(0, 6),
			set: () => {
			}
		})

		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return {
			testPreps,
			chevronForwardOutline, chevronBackOutline, 
			 isLoggedIn, 
		}
	}
})
</script>

<style>

</style>
