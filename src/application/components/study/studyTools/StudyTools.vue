<template>
	<div>
		<div class="w-full flex justify-between mb-4">
			<span class="heading font-bold text-main_dark">
				Tools to help you study better!
			</span>
		</div>


		<div class="showcase">
			<StudyToolsCard
				v-for="(item) in cardArr"
				:key="item.title"
				:btnText="item.btnText"
				:color="item.colors"
				:icon="item.icon"
				:onClick="item.onClick"
				:route="item.route"
				:subText="item.subText"
				:title="item.title"
			/>
		</div>
		<!-- <Swiper
			:freeMode="true"
			:items="cardArr"
			:slides="1.1"
			class="mt-2 overflow-x-auto flex mr-8"
			slideClass="flex md:!w-[336px] !w-[266px]  lg:!w-2/5 lg:!max-w-[21rem] !mr-8"
		>
			<template v-slot:default="{ item }">

			</template>

		</Swiper> -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { compass, flash, folder } from 'ionicons/icons'
import StudyToolsCard from '@app/components/study/studyTools/StudyToolsCard.vue'
import { useStudyModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'StudyTools',
	components: { StudyToolsCard },
	setup () {
		const cardArr = [
			{
				icon: flash,
				title: 'Study with Flashcards',
				subText: 'Scientifically proven to improve memory and make studying easier.',
				btnText: 'Create a Flashcard',
				route: '/study/flashCards/create',
				colors: '#C864DC'
			},

			{
				icon: folder,
				title: 'Organize your Study',
				subText: 'Put similar flashcards, notes and videos in a folder.',
				btnText: 'Create a Study Set',
				colors: '#FFA84B',
				onClick: useStudyModal().openCreateSet
			},

			{
				icon: compass,
				title: 'Find more resources',
				subText: 'Browse through a collection of study materials and resources.',
				btnText: 'Explore',
				colors: '#00D246',
				route: '/study/explore/all'
			}
		]

		return { cardArr }
	}
})
</script>

<style>

</style>
