<template>
	<Justified>
		<div class="text-body h-full md:bg-new_gray w-full lg:w-8/12 mx-auto lg:mt-6">
			<div class="bg-white rounded-xl px-4 pt-4 flex flex-col">
				<div class="flex flex-col justify-center items-center">
					<Search placeholder="Search by subjects, topics and related keywords" />
				</div>

				<div
					class="nav-scroll mt-4">
					<router-link :to="`/search?search=${searchTerm}`"
					>
						All
					</router-link>
					<router-link :to="`/search/preps?search=${searchTerm}`"
					>
						TestPreps
					</router-link>
					<router-link :to="`/search/notes?search=${searchTerm}`"
					>
						Notes
					</router-link>
					<router-link :to="`/search/videos?search=${searchTerm}`"
					>
						Videos
					</router-link>
					<router-link :to="`/search/flashCards?search=${searchTerm}`"
					>
						FlashCards
					</router-link>
					<router-link :to="`/search/sets?search=${searchTerm}`"
					>
						Folders
					</router-link>
					<router-link :to="`/search/nerds?search=${searchTerm}`"
					>
						Nerds
					</router-link>
					<router-link :to="`/search/questions?search=${searchTerm}`"
					>
						Questions
					</router-link>
				</div>
			</div>
			<!-- <div class="blueTop px-4">
				<div class="lg:w-8/12 w-full">
					<div class="flex flex-col justify-center items-center">
						<ion-text class="heading lg:text-2xl font-bold text-white text-center mt-12 hidden md:block">
							Explore thousands of study materials
						</ion-text>
						<Search class="my-4" />
					</div>
					<div class="nav-scroll !text-new_gray">
						<router-link :to="`/search?search=${searchTerm}`"
							exact-active-class="border-b-2 text-white border-white">
							All
						</router-link>
						<router-link :to="`/search/preps?search=${searchTerm}`"
							exact-active-class="border-b-2 text-white border-white">
							TestPreps
						</router-link>
						<router-link :to="`/search/notes?search=${searchTerm}`"
							exact-active-class="border-b-2 text-white border-white">
							Notes
						</router-link>
						<router-link :to="`/search/videos?search=${searchTerm}`"
							exact-active-class="border-b-2 text-white border-white">
							Videos
						</router-link>
						<router-link :to="`/search/flashCards?search=${searchTerm}`"
							exact-active-class="border-b-2 text-white border-white">
							FlashCards
						</router-link>
						<router-link :to="`/search/sets?search=${searchTerm}`"
							exact-active-class="border-b-2 text-white border-white">
							Folders
						</router-link>
						<router-link :to="`/search/nerds?search=${searchTerm}`"
							exact-active-class="border-b-2 text-white border-white">
							Nerds
						</router-link>
						<router-link :to="`/search/questions?search=${searchTerm}`"
							exact-active-class="border-b-2 text-white border-white">
							Questions
						</router-link>
					</div>
				</div>
			</div> -->
			<div class="md:mt-6 md:px-4 lg:px-0">
				<IonSkeletonText v-if="loading" animated class="h-36 rounded-xl" />
				<div v-else-if="!fetched" class="flex flex-col gap-4 max-w-[500px] mx-auto p-4 md:p-0">
					<div v-for="r in recent" :key="r" class="flex items-center gap-4">
						<IonIcon :icon="closeOutline" class="text-2xl" @click="clearFromRecent(r)" />
						<IonText class="w-full text-xl truncate">{{ r }}</IonText>
						<IonIcon :icon="arrowRedoOutline" class="text-2xl" @click="() => {searchTerm = r; search()}" />
					</div>
				</div>
				<slot v-else :answers="answers" :count="count" :fetched="fetched" :flashCards="flashCards"
					:notes="notes" :questions="questions" :searchTerm="searchTerm"
					:sets="sets" :testPreps="testPreps" :users="users" :videos="videos" />
			</div>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { useSearch } from '@app/composable/meta/search'
import Search from '@app/components/search/Search.vue'
import { IonSkeletonText } from '@ionic/vue'
import { arrowRedoOutline, closeOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'SearchWrapper',
	components: { Justified, Search, IonSkeletonText },
	setup () {
		return {
			...useSearch(),
			closeOutline, arrowRedoOutline
		}
	}
})
</script>


<style lang="scss" scoped>
	:deep(ion-searchbar) {
		--background: $color-newGray !important;
		background: $color-newGray !important;
	}
</style>