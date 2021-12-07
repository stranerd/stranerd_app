<template>
	<div>
		<div class="w-full flex justify-between">
			<div class="heading font-bold text-main_dark flex items-center">
			

				<ion-text class="mr-3">
					Test Prep
				</ion-text>
				<ion-badge class="uppercase" v-if="suggested">  
					Suggested
				</ion-badge>
			</div>

			<router-link v-if="isLoggedIn"
				class="text-primary normalText flex items-center font-bold "
				to="/study/preps/explore">
				<span>view all</span>
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
import
{ computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons'
import Swiper from '@app/components/core/Swiper.vue'
import { useAuth } from '@app/composable/auth/auth'
import { useTestPrepList } from '@app/composable/study/testPreps'
import TestPrepCard from './TestPrepCard.vue'

export default defineComponent({
	name: 'TestPrepList',
	components: {  Swiper, TestPrepCard },
	props:{
		suggested:{
			required: false,
			default: false
		}
	},
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
			isLoggedIn
		}
	}
})
</script>

<style>
ion-badge{
	--background:#FFDC00 !important;
	--color: #132740 !important;
	--padding-top:6px !important;	
}
</style>
