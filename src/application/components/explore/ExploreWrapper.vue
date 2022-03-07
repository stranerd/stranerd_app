<template>
	<Justified>
		<div class="text-body h-full md:bg-new_gray w-full lg:w-8/12 mx-auto lg:mt-6">
			<div class="bg-white rounded-xl px-4 pt-4 flex flex-col">
				<div class="flex flex-col justify-center items-center">
					<Search placeholder="Search by subjects, topics and related keywords" />
				</div>

				<div
					class="nav-scroll mt-4">
					<router-link :to="`/explore`"
					>
						All
					</router-link>
					<router-link :to="`/explore/preps`"
					>
						TestPreps
					</router-link>
					<router-link :to="`/explore/notes`"
					>
						Notes
					</router-link>
					<router-link :to="`/explore/videos`"
					>
						Videos
					</router-link>
					<router-link :to="`/explore/flashCards`"
						class="py-2 cursor-pointer"
					>
						FlashCards
					</router-link>
				</div>
			</div>
		
			<div class="md:mt-6 md:px-4 lg:px-0">
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
	components: { 
		Justified, 
		Search
		 }
})
</script>

<style lang="scss" scoped>
	:deep(ion-searchbar) {
		--background: $color-newGray !important;
		background: $color-newGray !important;
	}
</style>
