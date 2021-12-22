<template>
	<Justified>
		<div>
			<div class="bg-primary w-full flex flex-col items-center pt-4 rounded-b-2xl md:rounded-none mb-4">
				<div
					class="mb-0.5 justify-center md:text-sm lg:text-base lg:items-center flex flex-row lg:w-7/12 w-full lg:px-3 text-xs mx-auto text-faded_gray font-bold  whitespace-normal overflow-x-auto">
					<router-link :to="`/search?search=${searchTerm}`"
						class="py-2 mr-3 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						All
					</router-link>
					<router-link :to="`/search/preps?search=${searchTerm}`"
						class="py-2 mr-3 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						TestPreps
					</router-link>
					<router-link :to="`/search/notes?search=${searchTerm}`"
						class="py-2 mr-3 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						Notes
					</router-link>
					<router-link :to="`/search/videos?search=${searchTerm}`"
						class="py-2 mr-3 cursor-pointer hidden"
						exact-active-class="border-b-4 text-white border-white">
						Videos
					</router-link>
					<router-link :to="`/search/flashCards?search=${searchTerm}`"
						class="py-2 mr-3 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						FlashCards
					</router-link>
					<router-link :to="`/search/nerds?search=${searchTerm}`"
						class="py-2 mr-3 cursor-pointer"
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

export default defineComponent({
	name: 'SearchWrapper',
	components: { Justified },
	setup () {
		const result = useSearch()
		return { ...result }
	}
})
</script>
