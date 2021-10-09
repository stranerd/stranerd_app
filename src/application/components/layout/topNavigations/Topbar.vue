<template>
	<!-- Small screens -->
	<div class="md:hidden bg-[#F7F7FC] py-[8px] px-4 fixed flex w-full top-0 border-0 flex-row items-center z-50">
		<div class="flex flex-row items-center w-[15%]">
			<img src="/assets/images/person-circle.svg" class="inline h-7"/>
		</div>

		<div class="flex flex-row items-center px-3 w-[70%] justify-center" >
			<div class="py-1 px-3 w-full bg-[#8B9EB1] flex rounded-xl flex-row items-center">
				<div class="w-1/3 flex flex-row items-center">
					<img src="/assets/images/bronze.svg" class="inline h-6 mr-2"/>
					<span class="font-semibold text-xs text-white ">10k</span>
				</div>
				<div class="w-1/3 flex flex-row items-center justify-center">
					<img src="/assets/images/add.svg" class="inline h-4 text-white"/>
				</div>
				<div class="w-1/3 flex flex-row-reverse items-center">
					<span class="font-semibold text-xs text-white ">250</span>
					<img src="/assets/images/gold.svg" class="inline h-6 mr-2"/>
				</div>
			</div>
		</div>

		<div class="flex flex-row-reverse items-center  w-[15%] ">
			<img src="/assets/images/search.svg" class=" h-6"/>
		</div>
		
	</div>

	<!-- medium screens -->
	<div class="hidden lg:hidden md:flex bg-white py-3 px-3 fixed w-full top-0 flex-row items-center z-50">
		<div class="flex flex-row items-center gap-9 w-1/4">
			<div class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center">
				<img src="/assets/images/person-circle.svg" class="inline h-6"/>
			</div>

			<div class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center">
				<img src="/assets/images/cap.svg" class="inline h-6"/>
			</div>

		</div>

		<div class="flex flex-row items-center px-6 w-2/4 justify-center" >
			<div class="py-2 px-4 w-full bg-light_gray flex rounded-lg flex-row items-center">
				<div class="w-1/3 flex flex-row items-center">
					<img src="/assets/images/bronze.svg" class="inline h-7 mr-2"/>
					<span class="font-semibold text-sm text-dark_grey ">10k</span>
				</div>
				<div class="w-1/3 flex flex-row items-center justify-center">
					<img src="/assets/images/add.svg" class="inline h-6"/>
				</div>
				<div class="w-1/3 flex flex-row-reverse items-center">
					<span class="font-semibold text-sm text-dark_grey ">250</span>
					<img src="/assets/images/gold.svg" class="inline h-7 mr-2"/>
				</div>
			</div>
		</div>

		<div class="flex flex-row-reverse items-center gap-9 w-1/4">
			<div class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center">
				<img src="/assets/images/bell.svg" class="inline h-6"/>
			</div>

			<div class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center">
				<img src="/assets/images/search.svg" class="inline h-6"/>
			</div>

		</div>
	</div>

	<!-- large screens -->
	<div class="hidden md:hidden lg:flex bg-white pt-3 pl-[2.908%] pr-[41px] fixed w-[84%]  top-0 left-[16%] flex-row items-center gap-16 z-50">
		<div class="flex flex-row items-center w-3/4 py-1 gap-6 justify-around">
			<div class="bg-light_gray py-2 px-6 rounded-lg flex-grow flex flex-row items-center">
				<input class="focus:outline-none bg-light_gray flex-grow text-sm placeholder-gray-400 py-1 px-1"
					placeholder="Search for anything" />
				<img src="/assets/images/search.svg" class="inline h-5"/>
			</div>
			<router-link class="px-4 py-1 bg-primary text-white rounded-lg" to="/dashboard/questions">
				<div class="flex flex-col py-1 items-center justify-center">
					<ion-icon :icon="add" class="text-xl" ></ion-icon>
				</div>
			</router-link>
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center" to="/dashboard/questions">
				<img src="/assets/images/bell.svg" class="inline h-5"/>
			</router-link>
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center" to="/dashboard/questions">
				<img src="/assets/images/cap.svg" class="inline h-5"/>
			</router-link>
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center" to="/dashboard/questions">
				<img src="/assets/images/chatbubble.svg" class="inline h-5"/>
			</router-link>
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center" to="/dashboard/questions">
				<img src="/assets/images/person-circle.svg" class="inline h-6"/>
			</router-link>
		</div>
	
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IonIcon } from '@ionic/vue'
import { add } from 'ionicons/icons'

export default defineComponent({
	setup() {
		return {
			add
		}
	},
	components: { IonIcon }
})
</script>
