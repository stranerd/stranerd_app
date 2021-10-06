<template>
	<div class="grid grid-col-6 px-3 text-xs">
		
		<div class="col-span-6 py-2 mt-2">
			<div class="py-1 px-2 text-sm bg-light_gray rounded-xl flex flex-row">
				<ion-select value="notifications" class="w-full text-xs  placeholder-[#8B9EB1] font-bold" placeholder="Filter by subject" interface="action-sheet">
					<ion-select-option value="maths" class="text-sm">Mathematics</ion-select-option>
					<ion-select-option value="physics" class="text-sm">Physics</ion-select-option>
					<ion-select-option value="bio" class="text-sm">Biology</ion-select-option>
					<ion-select-option value="geo" class="text-sm" >Geography</ion-select-option>
					<ion-select-option value="business" class="text-sm">Business</ion-select-option>
					<ion-select-option value="civil" class="text-sm">Civil Right</ion-select-option>
				</ion-select>
			</div>

			<div class="mt-2 flex flex-row-reverse justify-center items-center">
				<div class="flex flex-row items-center mr-2">
					<ion-icon :icon="ellipse" class="text-lg mr-1 text-primary"></ion-icon>
					<span class="font-bold text-icon_inactive">Answered </span>
				</div>
				<div class="flex flex-row items-center mr-2">
					<ion-icon :icon="ellipseOutline" class="text-lg mr-1 text-primary"></ion-icon>
					<span class="font-bold text-icon_inactive">Unanswered </span>
				</div>
				<span class="font-bold text-icon_inactive mr-3">Sort by: </span>
				
			</div>

			<div class="mt-5 flex flex-row flex-wrap">
				<div class="py-4 px-4 rounded-lg bg-tinted_pink flex flex-col w-full">
					<div class="flex flex-row items-center">
						<img src="/assets/images/person-circle.svg" class="inline h-7 mr-2"/>
						<span class="font-bold text-dark_gray">Timmy Nuetron</span>
						<div class="flex flex-row-reverse flex-grow">
							<button class="py-1 px-3 rounded-lg text-white bg-dark_gray font-bold flex flex-row items-center">
								<span class="mr-2">Answer</span>
								<span class="h-1 w-1 rounded-full bg-white mr-2" ></span>
								<span class="mr-1 text-sm">+20</span>
								<img src="/assets/images/bronze.svg" class=" h-4"/>
							</button>
						</div>
					</div>

					<div class="mt-3">
						<button class="py-1 px-3 rounded-lg text-white bg-star_yellow font-bold flex flex-row items-center">
							Featured
						</button>
					</div>
					<div class="mt-3 flex flex-row items-center">
						<span class="h-[5px] w-[5px] rounded-full bg-icon_inactive mr-3" ></span>
						<span class="font-semibold text-dark_gray">Physics</span>
					</div>

					<p class="py-2 text-dark_gray leading-normal">
						From the top of a building with a height of 16 meters, a ball is thrown at angle of 30 degrees to the horizontal plane at a speed of 21 m/s.
						Calculate the total time the ball is in the air?
					</p>

					<div class="mt-2 mb-2 flex flex-row items-center gap-4">
						<span class="py-1 px-2 font-bold text-white bg-faded_gray rounded-lg">
							Motion
						</span>
						<span class="py-1 px-2 font-bold text-white bg-faded_gray rounded-lg">
							projectile-motion
						</span>
						<span class="py-1 px-2 font-bold text-white bg-faded_gray rounded-lg">
							projectile
						</span>
					</div>

					<div  class="mt-2 flex flex-row items-center ">
						<span class="font-bold text-icon_inactive">30m ago</span>
						<div class="flex flex-row-reverse items-center flex-grow">
							<span class="font-bold text-icon_inactive">5 answers</span>
							<span class="h-[5px] w-[5px] rounded-full bg-icon_inactive mr-3" ></span>
						</div>
					</div>
				</div>

				<div class="py-4 px-4 rounded-lg bg-light_gray flex mt-6 flex-col w-full">
					<div class="flex flex-row items-center">
						<img src="/assets/images/person-circle.svg" class="inline h-7 mr-2"/>
						<span class="font-bold text-dark_gray">Timmy Nuetron</span>
						<div class="flex flex-row-reverse flex-grow">
							<button class="py-1 px-3 rounded-lg text-white bg-dark_gray font-bold flex flex-row items-center">
								<span class="mr-2">Answer</span>
								<span class="h-1 w-1 rounded-full bg-white mr-2" ></span>
								<span class="mr-1 text-sm">+20</span>
								<img src="/assets/images/bronze.svg" class=" h-4"/>
							</button>
						</div>
					</div>

					<div class="mt-3 flex flex-row items-center">
						<span class="h-[5px] w-[5px] rounded-full bg-icon_inactive mr-3" ></span>
						<span class="font-semibold text-dark_gray">Physics</span>
					</div>

					<p class="py-2 text-dark_gray leading-normal">
						From the top of a building with a height of 16 meters, a ball is thrown at angle of 30 degrees to the horizontal plane at a speed of 21 m/s.
						Calculate the total time the ball is in the air?
					</p>

					<div class="mt-2 mb-2 flex flex-row items-center gap-4">
						<span class="py-1 px-2 font-bold text-white bg-faded_gray rounded-lg">
							Motion
						</span>
						<span class="py-1 px-2 font-bold text-white bg-faded_gray rounded-lg">
							projectile-motion
						</span>
						<span class="py-1 px-2 font-bold text-white bg-faded_gray rounded-lg">
							projectile
						</span>
					</div>

					<div  class="mt-2 flex flex-row items-center ">
						<span class="font-bold text-icon_inactive">30m ago</span>
						<div class="flex flex-row-reverse items-center flex-grow">
							<span class="font-bold text-icon_inactive">5 answers</span>
							<span class="h-[5px] w-[5px] rounded-full bg-icon_inactive mr-3" ></span>
						</div>
					</div>
				</div>


				<div class="py-4 px-4 rounded-lg bg-light_gray flex mt-6 flex-col w-full">
					<div class="flex flex-row items-center">
						<img src="/assets/images/person-circle.svg" class="inline h-7 mr-2"/>
						<span class="font-bold text-dark_gray">Timmy Nuetron</span>
						<div class="flex flex-row-reverse flex-grow">
							<button class="py-1 px-3 rounded-lg text-white bg-dark_gray font-bold flex flex-row items-center">
								<span class="mr-2">Answer</span>
								<span class="h-1 w-1 rounded-full bg-white mr-2" ></span>
								<span class="mr-1 text-sm">+20</span>
								<img src="/assets/images/bronze.svg" class=" h-4"/>
							</button>
						</div>
					</div>

					<div class="mt-3 flex flex-row items-center">
						<span class="h-[5px] w-[5px] rounded-full bg-icon_inactive mr-3" ></span>
						<span class="font-semibold text-dark_gray">Physics</span>
					</div>

					<p class="py-2 text-dark_gray leading-normal">
						From the top of a building with a height of 16 meters, a ball is thrown at angle of 30 degrees to the horizontal plane at a speed of 21 m/s.
						Calculate the total time the ball is in the air?
					</p>

					<div class="mt-2 mb-2 flex flex-row items-center gap-4">
						<span class="py-1 px-2 font-bold text-white bg-faded_gray rounded-lg">
							Motion
						</span>
						<span class="py-1 px-2 font-bold text-white bg-faded_gray rounded-lg">
							projectile-motion
						</span>
						<span class="py-1 px-2 font-bold text-white bg-faded_gray rounded-lg">
							projectile
						</span>
					</div>

					<div  class="mt-2 flex flex-row items-center ">
						<span class="font-bold text-icon_inactive">30m ago</span>
						<div class="flex flex-row-reverse items-center flex-grow">
							<span class="font-bold text-icon_inactive">5 answers</span>
							<span class="h-[5px] w-[5px] rounded-full bg-icon_inactive mr-3" ></span>
						</div>
					</div>
				</div>

			</div>


		</div>
				
	</div>


</template>
<script lang="ts">
import { IonSelect, IonSelectOption,IonIcon } from '@ionic/vue'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

import { ellipse, ellipseOutline } from 'ionicons/icons'

// Import Swiper Vue.js components

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'

export default defineComponent({
	setup() {

		const router = useRouter()

		const showSearch = ref(false)

		const showAnswers = () => {
			router.push({ path: '/question/answers' })
		}
		return {
			ellipseOutline,
			ellipse
		}
	},
	components: { IonSelect, IonSelectOption, IonIcon }
})
</script>
<style scoped>
.customShadow {
	 box-shadow: 0 2px 6px rgb(0 0 0 / 0.2);
}

ion-select {
 
  /* Set a different placeholder color */
  --placeholder-color: #8B9EB1;

  /* Set full opacity on the placeholder */
  --placeholder-opacity: 1;
}

</style>
