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

		<Swiper v-if="true"
			:freeMode="true"
			:items="cardArr"
			:slides="1.1"
			class="mt-2 overflow-x-auto flex"
			slideClass="flex md:!w-[300px] !w-[265px] mr-3 lg:!w-2/5 lg:!max-w-[18rem] !mr-6"
		>
			<template v-slot:default="{ item, index }">
				<TestPrepCard :colorClass=" index  === 0 ? 'bg-tinted_pink' : 'bg-light_gray'" :title="item?.title" :subText="item?.subText"
				/>

			</template>
		
		</Swiper>
	

	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { IonIcon } from '@ionic/vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import Swiper from '@app/components/core/Swiper.vue'
import { useAuth } from '@app/composable/auth/auth'
import TestPrepCard from './TestPrepCard.vue'

export default defineComponent({
	name: 'RecentTransactions',
	components: { IonIcon, Swiper,  TestPrepCard },
	setup () {
		const { id, isLoggedIn } = useAuth()

        	const cardArr = [
			{  title:'JAMB',
				btnText:'Create a Flashcard',
				route:''
			},

			{ 
				title:'SAT',
				btnText:'Create a Study Set', route:'' },

			{
				title:'WAEC',
				btnText:'Explore', route:'' 
			}
		]

		return {
			chevronForwardOutline, chevronBackOutline, cardArr,
			 isLoggedIn, 
		}
	}
})
</script>

<style>

</style>
