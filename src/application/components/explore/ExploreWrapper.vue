<template>
	<Justified>
		<div>
			<div class="blueTop px-4">
				<div class="w-full lg:w-8/12">
					<div class="flex flex-col justify-center items-center">
						<ion-text class="heading lg:text-2xl font-bold text-white text-center mt-12 hidden md:block">
							Explore thousands of study materials
						</ion-text>
						<Search class="my-4" />
					</div>
					<div class="nav-scroll !text-new_gray">
						<router-link :to="`/explore`"
							exact-active-class="border-b-2 text-white border-white">
							All
						</router-link>
						<router-link :to="`/explore/preps`"
							exact-active-class="border-b-2 text-white border-white">
							TestPreps
						</router-link>
						<router-link :to="`/explore/notes`"
							exact-active-class="border-b-2 text-white border-white">
							Notes
						</router-link>
						<router-link :to="`/explore/videos`"
							exact-active-class="border-b-2 text-white border-white">
							Videos
						</router-link>
						<router-link :to="`/explore/flashCards`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-2 text-white border-white">
							FlashCards
						</router-link>
					</div>
				</div>
			</div>
			<div class="md:py-4 lg:px-0 lg:w-8/12 w-full mx-auto">
				<slot />
			</div>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import Search from '@app/components/search/Search.vue'

export default defineComponent({
	name: 'ExploreWrapper',
	components: { Justified, Search }
})
</script>
