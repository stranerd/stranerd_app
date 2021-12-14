<template>
	<div>
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-main_dark">
				Tools to help you study better!
			</span>
		</div>

		<Swiper
			:freeMode="true"
			:items="cardArr"
			:slides="1.1"
			class="mt-2 overflow-x-auto flex"
			slideClass="flex md:!w-[300px] !w-[265px] mr-3 lg:!w-2/5 lg:!max-w-[18rem] !mr-6"
		>
			<template v-slot:default="{ item }">
				<StudyToolsCard
					:key="item.title"
					:btnText="item.btnText"
					:icon="item.icon"
					:onClick="item.onClick"
					:route="item.route"
					:subText="item.subText"
					:title="item.title"
				/>
			</template>

		</Swiper>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { compass, flash, folder } from 'ionicons/icons'
import Swiper from '@app/components/core/Swiper.vue'
import StudyToolsCard from '@app/components/study/studyTools/StudyToolsCard.vue'
import { useStudyModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'StudyTools',
	components: { Swiper, StudyToolsCard },
	setup () {
		const cardArr = [
			{
				icon: flash,
				title: 'Study with Flashcards',
				subText: 'Scientifically proven to improve memory and make studying easier.',
				btnText: 'Create a Flashcard',
				route: '/study/flashCards/create'
			},

			{
				icon: folder,
				title: 'Organize your Study',
				subText: 'Put flashcards, notes and videos with the same aim together in a folder.',
				btnText: 'Create a Study Set',
				onClick: useStudyModal().openCreateSet
			},

			{
				icon: compass,
				title: 'Find more resources',
				subText: 'Browse through a library of flashcards, notes, videos and sets to study with.',
				btnText: 'Explore',
				route: '/study/preps/explore'
			}
		]

		return { cardArr }
	}
})
</script>

<style>

</style>
