<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="max-w-4xl mx-auto ">

	
				<div class="flex justify-center items-center mt-8 lg:mt-20 mb-2 md:px-2">
					<span class="font-bold text-dark_gray heading hidden md:block" variant="1">
						Tutor Leaderboard
					</span>
					<div class="flex gap-4 md:ml-auto">
						<ion-select value="notifications" class="max-w-[138px] text-xs md:text-sm  placeholder-[#8B9EB1] font-bold" placeholder="General" interface="action-sheet">
							<ion-select-option value="maths" >Daily</ion-select-option>
							<ion-select-option value="physics" >Monthly</ion-select-option>
							<ion-select-option value="bio" >Yearly</ion-select-option>
					
						</ion-select>

						<ion-select value="notifications" class="max-w-[138px] text-xs md:text-sm  placeholder-[#8B9EB1] font-bold" placeholder="Daily" interface="action-sheet">
							<ion-select-option value="maths" >Daily</ion-select-option>
							<ion-select-option value="physics" >Monthly</ion-select-option>
							<ion-select-option value="bio" >Yearly</ion-select-option>
					
						</ion-select>
					</div>

				</div>

				<div class="flex flex-col items-center justify-content-center gap-1 gap-md-2">
					<div class="flex flex-col gap-0-5 w-full">
						<div class="flex rounded-none lg:rounded-md bg-dark_gray font-bold normalText text-white py-4 lg:px-8 px-4 text-dark">
							<div class="w-3/12">
								<span>No.</span>
							</div>
							<div class="w-6/12">
								<span>Profile</span>
							</div>
							<div class="w-3/12 text-right">
								<span>Tutor Score</span>
							</div>
						</div>
				
						<div class="flex items-center mt-4 bg-light_gray rounded-none lg:rounded-md font-bold normalText text-dark_gray py-4 lg:px-8 px-4 border border-faded_gray">
							<div class="w-3/12">
								<span> 124 </span>
							</div>
							<div class="w-7/12 flex items-center gap-2">
								<avatar :size="24"/>
								<span>
									Timmy Neutron
								</span>
							</div>
							<div class="w-2/12 text-right text-primary font-semibold">
								<span>14</span>
							</div>
						</div>


						<div v-for="(n) in 10" :key="n" class="flex items-center mt-4 bg-light_gray rounded-none lg:rounded-md font-bold normalText text-dark_gray py-4 lg:px-8 px-4">
							<div class="w-3/12">
								<span>{{n}} </span>
							</div>
							<div class="w-3/12 flex items-center gap-2">
								<avatar :size="24"/>
								<span>
									Jeremy Schipp
								</span>
							</div>
							<div class="w-6/12 font-normal text-right text-primary ">
								<span>{{ 700 - n}}</span>
							</div>
						</div>
					</div>

					<div class="text-center text-18">
						<a class="text-primary-dark py-2" @click.prevent="fetchOlderTransactions">LOAD MORE</a>
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonSelect, IonSelectOption, IonPage, IonContent } from '@ionic/vue'
import Avatar from '@/application/components/core/Avatar.vue'

export default defineComponent({
	name: 'tutor learderboard',
	components: { IonSelect, IonSelectOption,  Avatar, IonPage, IonContent,   }

})
</script>

<style lang="scss" scoped>
ion-select {
  --placeholder-color: #8B9EB1;
  --placeholder-opacity: 1;
  background-color: #F7F7FC;
  --padding-end:1rem;
  --padding-top:0.5rem !important;
  --padding-bottom:0.5rem !important;
  border-radius: 12px;
  
}




</style>
