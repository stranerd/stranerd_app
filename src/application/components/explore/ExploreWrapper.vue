<template>
	<Justified>
		<div>
			<div class="blueTop px-4">
				<div class="w-full md:w-11/12 lg:w-8/12">
					<div class="flex flex-col justify-center items-center">
						<ion-text class="heading lg:text-2xl font-bold text-white text-center mt-12 hidden md:block">
							Explore thousands of study materials
						</ion-text>
						<ion-searchbar v-model.trim="searchTerm"
							class="w-full my-4"
							mode="md"
							placeholder="Search for anything..."
							showCancelButton="never"
						/>
					</div>
					<div class="nav-scroll">
						<router-link :to="`/explore`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							All
						</router-link>
						<router-link :to="`/explore/preps`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							TestPreps
						</router-link>
						<router-link :to="`/explore/notes`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							Notes
						</router-link>
						<router-link :to="`/explore/videos`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							Videos
						</router-link>
						<router-link :to="`/explore/flashCards`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							FlashCards
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
import { useSearch } from '@app/composable/meta/search'
import { IonSearchbar } from '@ionic/vue'

export default defineComponent({
	name: 'ExploreWrapper',
	components: { Justified, IonSearchbar },
	setup () {
		const { searchTerm } = useSearch()
		return { searchTerm }
	}
})
</script>
