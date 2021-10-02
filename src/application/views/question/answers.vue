<template>
	<ion-page>
		<ion-header mode="ios">
			<ion-toolbar>
				<ion-buttons slot="start" class="px-1">
					<ion-button @click="router.go(-1)" class="relative ion-activatable rounded-full ">
						<i class="las la-arrow-left" style="font-size:26px;"></i>
						<ion-ripple-effect class="rounded-full"></ion-ripple-effect>
					</ion-button>
				</ion-buttons>
				<ion-title>Answers</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true" >
			<div class="w-full px-2 py-2 flex flex-row justify-center text-xs text-dark items-center">
				<span>You will earn <b class="text-sm pl-1">+20</b> </span> <img class="inline h-[25px] pr-1 pl-[2px]" src="/assets/bronze.svg"/>
				<span>if your answer is the best.</span>
			</div>

			<div class="w-full px-3 py-2 flex flex-row">
				<div class="w-full rounded-2xl border-0 text-xs text-white flex flex-col py-3 px-3" style="background-image: url(assets/question_bg.png); background-size: cover;background-position: center;">
					<div class="flex flex-row items-center pb-2">
						<div class="flex flex-row font-semibold items-center">
							<span class="h-2 w-2 bg-white rounded-full "></span>
							<span class="ml-1">Question</span>
						</div>
						<div class="flex flex-row-reverse font-semibold  uppercase flex-grow">
							<span class="ml-1">Mathematics</span>
						</div>
					</div>
					<div class="py-2">
						From the top of a building with a height of 16 meter,
						a ball is thrown at angle of 30 degree s to the horiz-
						-ontal plane at a speed of 21 m/s. Calculate the total
						time the ball is in the air?
					</div>
					<div class="flex flex-row flex-wrap items-center pt-3 pb-1">
						<span class="mr-2 bg-tags text-sub text-xs py-[3px] px-3 border-[2px] border-gray-100 rounded-2xl">
							motion
						</span>
						<span class="mr-2 bg-tags text-sub text-xs py-[3px] px-3 border-[2px] border-gray-100 rounded-2xl">
							projectile-motion
						</span>
						<span class="mr-2 bg-tags text-sub text-xs py-[3px] px-3 border-[2px] border-gray-100 rounded-2xl">
							projectile
						</span>
					</div>
				</div>
			</div>

			<template v-if="showAnswerQuestion">
				<div class="grid grid-col-6 px-3 mt-1 w-full">
					<div class="col-span-6 py-3 px-4 mt-1 flex flex-col bg-white customShadow rounded-md">
						<div class="flex flex-row items-center text-dark text-sm my-2 font-semibold">
							<span class="h-2 w-2 bg-dark mr-2 rounded-full "></span>
							<h3>Your Answer</h3>
						</div>
						<div class="px-2">
							<ion-input class="text-xs py-1" placeholder="Write your answer here. Keep it short" ></ion-input>
							<ion-textarea rows="4" 
								class="bg-white border-0 text-xs focus:outline-none  py-2 w-full"  
								placeholder="or go ahead to give a detailed explanation of the answer you gave above (not compulsory)"></ion-textarea>
						</div>
					</div>
				</div>

				<div class="grid grid-col-6 px-3 mt-4">
					<div class="py-3 px-3 text-xs bg-tags rounded-xl relative flex flex-col justify-center items-center">
						<h3 class="text-xs text-[#4D5C6F] mb-2">Upload Images (<i>optional</i>)</h3>
						<ion-icon :icon="imagesOutline"></ion-icon>
						<input
							type="file" id="images"
							name="images"
							class="cursor-pointer w-full h-full absolute"
							style="opacity:0; overflow:hidden; position:absolute;"
							accept="image/x-png,image/jpeg,image/jpg"/>
					</div>
				</div>

				<div class="flex flex-row px-3 mt-5 ">
					<div class="w-1/2 flex flex-row justify-center items-center">
						<button @click="showAnswerQuestion = false" class="text-sm px-4 py-2 relative ion-activatable rounded-lg bg-gray-100 text-gray-500">
							Discard
							<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
						</button>
					</div>
					<div class="w-1/2 flex flex-row justify-center items-center">
						<button class="text-sm px-4 relative ion-activatable py-2 rounded-lg bg-primary text-white">
							Submit
							<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
						</button>
					</div>
				</div>
			</template>

			<template v-else>
				<div class="w-full flex flex-row items-center justify-center mt-2">
					<button @click="showAnswerQuestion = true" class="px-3 py-1 bg-primary relative ion-activatable text-white text-xs rounded-2xl">
						Answer
						<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
					</button>
				</div>
			</template>

			<div class="w-full flex flex-row items-center px-3 mt-5">
				<div class="flex flex-row items-center text-primary text-xs ">
					<span class="h-2 w-2 mr-2 bg-primary rounded-full "></span>
					<h3 class="font-semibold">5 Answers</h3>
				</div>
				<div class="flex-grow flex flex-row-reverse items-center">
					<div class="flex flex-row items-center text-gray-400 ml-2">
						<i class="las la-dot-circle" style="font-size:18px;"></i>
						<span class="font-semibold text-xs text-primary ml-1">oldest</span>
					</div>
					
					<div class="flex flex-row items-center text-primary">
						<i class="las la-dot-circle" style="font-size:18px;"></i>
						<span class="font-semibold text-xs text-primary ml-1">Latest</span>
					</div>
					
				</div>
			</div>

			<div class="col-span-6 py-1 flex flex-col mt-3">
				<div class="flex flex-row border-b-1 pt-2 pb-4 px-3 mb-3 w-full border-b-2 border-gray-200">
					<div class="bg-white py-2 px-3  rounded-lg customShadow w-full flex flex-col">
						<div class="flex flex-row items-center w-full py-2">
							<img src="assets/raymond.jpg" class="h-8 w-8 rounded-full mr-2"/>
							<span class="text-xs text-sub ">Timmy Neutron</span>
							<div class="flex-grow flex flex-row-reverse items-center">
								<i class="las la-check-double" style="font-size:20px;color:#546DD3;"></i>
								<span class="mr-1 text-xs text-sub">Best Answer </span>
							</div>
						</div>
						<div class="flex flex-col w-full py-1">
							<p class="pb-1 pt-2 text-xs text-dark">
								From the top of a building with a height of 16
								meters, a ball is thrown at angle of 30 degre...
							</p>
							<div class="flex flex-row items-center pt-3 pb-1">
								<span class="text-xs text-sub">
									Posted 30 mins ago
								</span>
								<div class="flex-grow flex flex-row-reverse items-center">
									<i class="las la-heart" style="font-size:20px;color:#FFDA20;"></i>
									<span class="mr-[2px] text-xs text-sub">45</span>
									<span class="text-xs text-sub mr-3">
										15 comments
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="flex flex-row border-b-1 pt-2 pb-4 px-3 mb-3 w-full border-b-2 border-gray-200">
					<div class="bg-white py-2 px-3  rounded-lg customShadow w-full flex flex-col">
						<div class="flex flex-row items-center w-full py-2">
							<img src="assets/raymond.jpg" class="h-8 w-8 rounded-full mr-2"/>
							<span class="text-xs text-sub ">Timmy Neutron</span>
							
						</div>
						<div class="flex flex-col w-full py-1">
							<p class="pb-1 pt-2 text-xs text-dark">
								From the top of a building with a height of 16
								meters, a ball is thrown at angle of 30 degre...
							</p>
							<div class="flex flex-row items-center pt-3 pb-1">
								<span class="text-xs text-sub">
									Posted 1 hour ago
								</span>
								<div class="flex-grow flex flex-row-reverse items-center">
									<i class="las la-heart" style="font-size:20px;color:#FFDA20;"></i>
									<span class="mr-[2px] text-xs text-sub">15</span>
									<span class="text-xs text-sub mr-3">
										8 comments
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>

		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonRippleEffect, IonInput, IonTextarea, IonIcon } from '@ionic/vue'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { imagesOutline} from 'ionicons/icons'


export default  {
	name: 'Answers',
	components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonButton, IonRippleEffect, IonInput, IonTextarea, IonIcon },
	setup() {

		const showAnswerQuestion = ref(false)
		const router = useRouter()
	  return {
		  router,
		  showAnswerQuestion,
		  imagesOutline
	  }
	},
}
</script>
<style scoped>
ion-toolbar {
	--background: #ffffff;
}

.customShadow {
	 box-shadow: 0 2px 6px rgb(0 0 0 / 0.2);
}

ion-input {
 
  /* Set a different placeholder color */
  --placeholder-color: #A5ACB6;

  /* Set full opacity on the placeholder */
  --placeholder-opacity: 1;
}

ion-textarea {
 
  /* Set a different placeholder color */
  --placeholder-color: #A5ACB6;

  /* Set full opacity on the placeholder */
  --placeholder-opacity: 1;
}

ion-icon {
  font-size: 22px;
}


</style>