<template>
	<div>
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-main_dark">
				Tools to help you study better!
			</span>


		</div>

		<Swiper v-if="true"
			:freeMode="true"
			:items="cardArr"
			:slides="1.1"
			class="mt-2 overflow-x-auto flex mr-8"
			slideClass="flex md:!w-[336px] !w-[266px]  lg:!w-2/5 lg:!max-w-[21rem] !mr-8"
		>
			<template v-slot:default="{ item }">
				<StudyToolsCard
					:key="item.title"
					:btnText="item.btnText"
					:icon="item.icon"
					:route="item.route"
					:subText="item.subText"
					:title="item.title"
					:color="item.colors"
				/>

			</template>

		</Swiper>

		<div
			class="flex flex-row w-full items-center mt-2 mb-8 relative"
		>


		</div>


	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { compass,  folder } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import StudyToolsCard from './StudyToolsCard.vue'

export default defineComponent({
	name: 'RecentTransactions',
	components: { StudyToolsCard },
	setup () {
		const { id, isLoggedIn } = useAuth()

		const cardArr = [
			{
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
				btnText: 'Create a Study Set', route: '/study',
				colors: '#FFA84B'
			},

			{
				icon: compass,
				title: 'Find more resources',
				subText: 'Browse through a collection of study materials and resources.',
				btnText: 'Explore', route: '/study/preps/explore',
				colors: '#00D246'
			}
		]

		return {
			cardArr,
			isLoggedIn
		}
	}
})
</script>

<style>

</style>
