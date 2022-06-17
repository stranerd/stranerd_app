<template>
	<DefaultLayout>
		<div class="h-full w-full lg:w-8/12 mx-auto lg:mt-6">
			<div class="rounded-xl px-4 pt-4 flex flex-col">
				<Search />
				<div class="nav-scroll mt-4">
					<router-link :to="`/search?search=${searchTerm}`">All</router-link>
					<router-link :to="`/search/preps?search=${searchTerm}`">TestPreps</router-link>
					<router-link :to="`/search/documents?search=${searchTerm}`">Documents</router-link>
					<router-link :to="`/search/flashCards?search=${searchTerm}`">FlashCards</router-link>
					<router-link :to="`/search/sets?search=${searchTerm}`">Folders</router-link>
					<router-link :to="`/search/nerds?search=${searchTerm}`">Nerds</router-link>
					<router-link :to="`/search/questions?search=${searchTerm}`">Questions</router-link>
				</div>
			</div>
			<div class="md:mt-6 md:px-4 lg:px-0">
				<BlockLoading v-if="loading" />
				<div v-else-if="!fetched" class="flex flex-col gap-4 max-w-[500px] mx-auto p-4 md:p-0">
					<div v-for="r in recent" :key="r" class="flex items-center gap-4">
						<IonIcon :icon="closeOutline" class="text-3xl" @click="clearFromRecent(r)" />
						<IonText class="w-full text-xl truncate">{{ r }}</IonText>
						<IonIcon :icon="arrowRedoOutline" class="text-3xl"
							@click="() => {searchTerm = r; search()}" />
					</div>
				</div>
				<slot v-else :answers="answers" :count="count" :documents="documents" :fetched="fetched"
					:flashCards="flashCards" :questions="questions" :searchTerm="searchTerm"
					:sets="sets" :testPreps="testPreps" :users="users" />
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSearch } from '@app/composable/meta/search'
import Search from '@app/components/search/Search.vue'
import { arrowRedoOutline, closeOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'SearchWrapper',
	components: { Search },
	setup () {
		return {
			...useSearch(),
			closeOutline, arrowRedoOutline
		}
	}
})
</script>
