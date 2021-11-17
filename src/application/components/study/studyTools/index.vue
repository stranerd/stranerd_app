<template>
	<div>
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-dark_gray">
				Study Tools
			</span>

	
		</div>

		<div 
			class="flex flex-row w-full items-center mt-2 mb-8 "
		>
			<StudyToolsCard 
				class="!w-3/6 !max-w-[17rem] !min-w-[15rem] !mr-3"
				v-for="item in cardArr"
				:btnText="item.btnText"
				:subText="item.subText"
				:route="item.route" 
				:title="item.title"
				:icon="item.icon"
				:key="item.title"
			/>

		
		</div>
	

	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { compass, flash, folder } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import StudyToolsCard from './StudyToolsCard.vue'

export default defineComponent({
	name: 'RecentTransactions',
	components: {   StudyToolsCard },
	setup () {
		const { id, isLoggedIn } = useAuth()

		const cardArr = [
			{ icon:flash, title:'Study with Flashcards',
				subText:'Scientifically proven to improve memory and make studying easier.',
				btnText:'Create a Flashcard',
				route:''
			},

			{ 
				icon:folder, 
				title:'Organize your Study',
				subText:'Put flashcards, notes and videos with the same aim together in a folder.',
				btnText:'Create a Study Set', route:'' },

			{
				icon:compass,
				title:'Find more resources',
				subText:'Browse through a library of flashcards, notes, videos and sets to study with.',
				btnText:'Explore', route:'' 
			}
		]

		return {
			cardArr,  
			 isLoggedIn, 
		}
	}
})
</script>

<style>

</style>
