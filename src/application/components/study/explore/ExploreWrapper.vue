<template>
	<Justified>
		<div>
			<div class="bg-primary w-full  flex flex-col items-center pt-5 md:pt-12 rounded-b-2xl md:rounded-none mb-4">
				<div class="flex flex-col w-full justify-center items-center px-4">
					<ion-text class="heading lg:text-2xl font-bold text-white text-center  mb-3 hidden md:block">
						Explore thousands of study materials
					</ion-text>
					<router-link class="max-w-[1054px] lg:w-7/12" to="/search">
						<ion-searchbar class="!h-16" mode="md"
							placeholder="Search by subjects, topics and related keywords"
							show-cancel-button="never"
						/>
					</router-link>
				</div>
				<div
					class="mb-0.5 mt-8 md:mt-12   justify-center md:text-sm lg:text-base lg:items-center flex flex-row lg:w-7/12 w-full  lg:px-3 text-xs mx-auto text-faded_gray font-bold  whitespace-normal overflow-x-auto">
					<router-link class="py-2 mr-3 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white"
						to="/study/explore">
						All
					</router-link>
					<router-link class="py-2 mr-3 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white"
						to="/study/explore/preps">
						TestPreps
					</router-link>
					<router-link class="py-2 mr-3 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white"
						to="/study/explore/flashCards">
						FlashCards
					</router-link>
					<router-link class="py-2 mr-3 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white"
						to="/study/explore/notes">
						Notes
					</router-link>
					<router-link class="py-2 mr-3 cursor-pointer hidden"
						exact-active-class="border-b-4 text-white border-white"
						to="/study/explore/videos">
						Videos
					</router-link>
				</div>
			</div>
			<div class="p-4 md:w-8/12 w-full mx-auto">
				<slot />
			</div>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { IonSearchbar } from '@ionic/vue'

export default defineComponent({
	name: 'ExploreWrapper',
	components: { Justified, IonSearchbar }
})
</script>

<style lang="scss" scoped>
	ion-searchbar {
		--box-shadow: 'none';
		--border-radius: 0.5rem;
	}

	.searchbar-input.sc-ion-searchbar-md {
		padding-top: 12px;
		padding-bottom: 12px;
	}
</style>


