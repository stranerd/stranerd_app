<template>
	<SearchWrapper baseRoute="/search">
		<template v-slot="{ tab }">
			<div class="showcase-flex !gap-6">
				<div class="card-sm p-8 flex flex-col gap-2 items-center text-center">
					<template v-if="tab === 'questions'">
						<img alt="" class="mb-2" src="@app/assets/images/search/question.svg">
						<span class="font-bold text-lg">Find questions</span>
						<div class="text-secondaryText">
							Use the searchbar above to find questions you are looking for answers to.
						</div>
					</template>
					<template v-else-if="tab === 'flashCards'">
						<img alt="" class="mb-2" src="@app/assets/images/search/flashcard.svg">
						<span class="font-bold text-lg">Find flashcards</span>
						<div class="text-secondaryText">
							Use the searchbar above to find flashcards that you can use to study.
						</div>
					</template>
					<template v-else-if="tab === 'users'">
						<img alt="" class="mb-2" src="@app/assets/images/search/user.svg">
						<span class="font-bold text-lg">Find other users</span>
						<div class="text-secondaryText">
							Use the searchbar above to find friends, classmates, and other students to learn from.
						</div>
					</template>
					<template v-else>
						<img alt="" class="mb-2" src="@app/assets/images/search/all.svg">
						<span class="font-bold text-lg">Search for anything</span>
						<div class="text-secondaryText">
							Find questions, flashcards and friends or classmates using the searchbar above.
						</div>
					</template>
				</div>
				<SuggestedActions />
			</div>
		</template>
	</SearchWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchWrapper from '@app/components/search/SearchWrapper.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'Search',
	components: { SearchWrapper },
	setup () {
		useRouteMeta('Search', { back: true })
	}
})
</script>

<style lang="scss" scoped>
img {
	width: 80px;
}
</style>
