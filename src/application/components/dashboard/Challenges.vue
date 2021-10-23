<template>
	<div class="w-full">
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-dark_gray">
				Challenges
			</span>


			<div class="text-primary normalText flex items-center font-bold ">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl"></ion-icon>	
			</div>
		</div>

		<div class="flex md:gap-6 gap-3 mt-2">
			<swiper
				:direction="'horizontal'" :spaceBetween="16" :freeMode="true" class="overflow-x-auto"
			>
				<swiper-slide
					v-for="(challenge,index) in challengeData"
					:key="index"
					class="flex !w-[14rem]">
					<ChallengesCard :style="0 === index ? 'bg-butter_yellow' : 'bg-light_gray'" :challenge="challenge"/>
				</swiper-slide>
				
			</swiper>
		</div>
	</div> 
</template>


<script lang="ts">
import {  IonIcon } from '@ionic/vue'
import { chevronForwardOutline, chevronBackOutline, ellipse } from 'ionicons/icons'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.min.css'
import ChallengesCard from './ChallengesCard.vue'
import { useAuth } from '@/application/composable/auth/auth'
import { ref, watch } from 'vue'
import { ChallengeData } from '@/modules/users/data/models/user'


export default  {
	name: 'Home',
	components: {  IonIcon,   Swiper, SwiperSlide, ChallengesCard },
	setup(){

		const { user } = useAuth()	
			
		const challengeData = ref<ChallengeData[]>()

		const setChallenges = () => {
			if(user.value) {
				challengeData.value = [
					{
						title: `Reach the rank of ${ user.value?.nextRank?.id }`,
						target: user.value?.nextRank?.score,
						present: user.value?.rank.score
					},
					{
						title: 'Answer 30 questions',
						target: 30,
						present: user.value?.account?.meta?.answers
					},
					{
						title: 'Get 30 best answers',
						target: 30,
						present: user.value?.account?.meta?.bestAnswers
					},
					{
						title: '5 days login streak',
						target: 5,
						present: user.value?.account?.streak.longestStreak
					}
				]
			}
		} 

	    watch(user,setChallenges)


		return{
			chevronForwardOutline, chevronBackOutline, ellipse, challengeData
		}
	}
}
</script>

<style>

</style>