<template>
	<DefaultLayout>
		<div>
			<div class="rounded-xl px-4 pt-4 lg:p-0 flex flex-col gap-4">
				<Search />
				<div class="nav-scroll">
					<router-link :to="`/search?search=${searchTerm}`">All</router-link>
					<router-link :to="`/search/questions?search=${searchTerm}`">Questions</router-link>
					<router-link :to="`/search/flashCards?search=${searchTerm}`">FlashCards</router-link>
					<router-link :to="`/search/documents?search=${searchTerm}`">Documents</router-link>
					<router-link :to="`/search/users?search=${searchTerm}`">Students</router-link>
				</div>
			</div>
			<div class="py-4">
				<BlockLoading v-if="loading" />
				<div v-else-if="!fetched" class="flex flex-col">
					<div v-for="r in recent" :key="r" class="flex p-4 items-center gap-4 text-xl">
						<IonIcon :icon="searchOutline" @click="() => {searchTerm = r; search()}" />
						<IonText class="w-full truncate" @click="() => {searchTerm = r; search()}">{{ r }}</IonText>
						<IonIcon :icon="closeOutline" @click.prevent="clearFromRecent(r)" />
					</div>
				</div>
				<slot v-else :answers="answers" :count="count" :documents="documents" :fetched="fetched"
					:flashCards="flashCards" :questions="questions" :searchTerm="searchTerm" :users="users" />
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSearch } from '@app/composable/meta/search'
import Search from '@app/components/search/Search.vue'
import { closeOutline, searchOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'SearchWrapper',
	components: { Search },
	setup () {
		return {
			...useSearch(),
			closeOutline, searchOutline
		}
	}
})
</script>
