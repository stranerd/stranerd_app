<template>
	<Justified>
		<div>
			<div class="blueTop flex-col items-center ">

				<div class="flex flex-col w-full justify-center items-center px-4">
					<ion-text class="heading lg:text-2xl font-bold text-white text-center  mt-12 mb-3 hidden md:block">
						Explore thousands of study materials
					</ion-text>
					<ion-searchbar v-model.trim="searchTerm"
						mode="md"
						:debounce="700"
						class="lg:w-7/12 w-11/12 p-0  mb-8 mt-5 lg:mt-0"
						placeholder="Search for anything..."
						showCancelButton="never"
					/>
				</div>
		

				<div
					class="mb-0.5 justify-center md:text-sm lg:text-base lg:items-center flex flex-row lg:w-7/12 w-full lg:px-3 text-xs mx-auto text-faded_gray font-bold  whitespace-normal overflow-x-auto mt-auto">
					<router-link :to="`/search?search=${searchTerm}`"
						class="py-2 lg:mr-12 mr-4 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						All
					</router-link>
					<router-link :to="`/search/preps?search=${searchTerm}`"
						class="py-2 lg:mr-12 mr-4 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						TestPreps
					</router-link>
					<router-link :to="`/search/notes?search=${searchTerm}`"
						class="py-2 lg:mr-12 mr-4 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						Notes
					</router-link>
					<router-link v-if="false" :to="`/search/videos?search=${searchTerm}`"
						class="py-2 lg:mr-12 mr-4 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						Videos
					</router-link>
					<router-link :to="`/search/flashCards?search=${searchTerm}`"
						class="py-2 lg:mr-12 mr-4 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						FlashCards
					</router-link>
					<router-link :to="`/search/nerds?search=${searchTerm}`"
						class="py-2 lg:mr-12 mr-4 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						Nerds
					</router-link>
				</div>
			</div>
			<div class="p-4 md:w-8/12 w-full mx-auto">
				<slot :answers="answers" :flashCards="flashCards" :notes="notes" :questions="questions"
					:searchTerm="searchTerm"
					:sets="sets" :testPreps="testPreps" :users="users" :videos="videos" />
				<PageLoading v-if="loading" />
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
	name: 'SearchWrapper',
	components: { Justified, IonSearchbar },
	setup () {
		const result = useSearch()
		return { ...result }
	}
})
</script>


<style lang="scss" scoped>
	ion-searchbar {
		--background: #fff !important;
		--box-shadow: none !important;
		--border-radius: .75rem;
		border-radius: .75rem;
		--icon-color: #8B9EB1;
		--color: #8B9EB1;
		--placeholder-color:#8B9EB1;
	}


</style>