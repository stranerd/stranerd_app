<template>
	<div>
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-dark_gray">
				Test Prep
			</span>

			<router-link v-if="true && isLoggedIn"
				class="text-primary normalText flex items-center font-bold "
				to="#">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl"></ion-icon>
			</router-link>
		</div>

		<Swiper v-if="true"
			:freeMode="true"
			:items="cardArr"
			:slides="3"
			class="flex flex-row w-full items-center mt-2 mb-8"
			slideClass="!w-3/6 !max-w-[17rem] !min-w-[15rem] !pr-3"
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
				subText:'Gateway exams for tertiary level instituitions in Nigeria.',
				btnText:'Create a Flashcard',
				route:''
			},

			{ 
				title:'SAT',
				subText:'The SAT is a standardized test widely used for college admissions in the USA',
				btnText:'Create a Study Set', route:'' },

			{
				title:'WAEC',
				subText:'Standardized test for West African secondary education completion.',
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
