<template>
	<DefaultLayout>
		<div class="h-full w-full lg:w-8/12 mx-auto lg:mt-6">
			<div class="rounded-xl px-4 pt-4 flex flex-col">
				<Search />
				<div class="nav-scroll mt-4">
					<router-link :to="`/explore`">All</router-link>
					<router-link :to="`/explore/preps`">TestPreps</router-link>
					<router-link :to="`/explore/notes`">Notes</router-link>
					<router-link :to="`/explore/flashCards`">FlashCards</router-link>
				</div>
			</div>

			<div class="md:mt-6 md:px-4 lg:px-0">
				<slot />
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Search from '@app/components/search/Search.vue'

export default defineComponent({
	name: 'ExploreWrapper',
	components: { Search }
})
</script>
