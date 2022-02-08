<template>
	<Justified>
		<div>
			<div class="blueTop px-4">
				<div class="md:w-11/12 lg:w-8/12 w-full">
					<div class="flex flex-col justify-center items-center">
						<ion-text class="heading lg:text-2xl font-bold text-white text-center mt-12 hidden md:block">
							Explore thousands of study materials
						</ion-text>
						<Search class="my-4" />
					</div>
					<div class="nav-scroll">
						<router-link :to="`/search?search=${searchTerm}`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							All
						</router-link>
						<router-link :to="`/search/preps?search=${searchTerm}`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							TestPreps
						</router-link>
						<router-link :to="`/search/notes?search=${searchTerm}`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							Notes
						</router-link>
						<router-link :to="`/search/videos?search=${searchTerm}`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							Videos
						</router-link>
						<router-link :to="`/search/flashCards?search=${searchTerm}`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							FlashCards
						</router-link>
						<router-link :to="`/search/folders?search=${searchTerm}`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							Folders
						</router-link>
						<router-link :to="`/search/nerds?search=${searchTerm}`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							Nerds
						</router-link>
						<router-link :to="`/search/questions?search=${searchTerm}`"
							class="py-2 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							Questions
						</router-link>
					</div>
				</div>
			</div>
			<div class="p-4 md:w-11/12 lg:w-8/12 w-full mx-auto">
				<IonSkeletonText v-if="loading" animated class="h-36 rounded-xl" />
				<div v-else-if="!fetched" class="flex flex-col gap-4 max-w-[500px] mx-auto">
					<div v-for="r in recent" :key="r" class="flex items-center gap-4">
						<IonIcon :icon="close" class="text-2xl" @click="clearFromRecent(r)" />
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
import { arrowRedoOutline, close } from 'ionicons/icons'

export default defineComponent({
	name: 'SearchWrapper',
	components: { Justified, Search, IonSkeletonText },
	setup () {
		return {
			...useSearch(),
			close, arrowRedoOutline
		}
	}
})
</script>
