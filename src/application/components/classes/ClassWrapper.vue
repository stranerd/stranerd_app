<template>
	<Justified>
		<div>
			<div class="blueTop px-4">
				<div class="w-full md:w-11/12 lg:w-8/12 flex flex-col justify-between h-full min-h-[9rem]">
					<div class="flex items-center justify-start mt-14">
						<ion-icon :icon="easel" class="text-3xl text-white mr-4"></ion-icon>
						<ion-text class="heading lg:text-2xl font-bold text-white text-left 	">
							CAZDEO - Mathematics
						</ion-text>
					</div>
					<div class="nav-scroll !item-start !justify-start  !mt-5">
						<router-link :to="`/classes/announcement`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							Announcement
						</router-link>
						<router-link :to="`/classes/discussion`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							Discussion
						</router-link>
						<router-link :to="`/classes/notes`"
							class="py-2 cursor-pointer min-w-[3.4rem]"
							exact-active-class="border-b-4 text-white border-white">
							Test Prep
						</router-link>
						<router-link :to="`/classes/videos`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							Notes
						</router-link>
						<router-link :to="`/classes/flashCards`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							FlashCards
						</router-link>
						<router-link :to="`/classes/flashCards`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							Playlist
						</router-link>
						<router-link :to="`/classes/flashCards`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							Folders	
						</router-link>
						<router-link :to="`/classes/flashCards`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							Participants	
						</router-link>
					</div>
				</div>
			</div>
			<div class="p-4 md:w-11/12 lg:w-8/12 w-full mx-auto">
				<slot />
			</div>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { easel } from 'ionicons/icons'

export default defineComponent({
	name: 'ClassWrapper',
	components: { Justified },
	setup(){
		return{
			easel
		}
	},
})
</script>
