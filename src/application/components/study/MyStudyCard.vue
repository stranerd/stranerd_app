<template>
	<div class="flex">
		<template v-if="set.saved.notes">
			<notesCard v-for="note in set.saved.notes" :key="note" :note="note"/>
		</template>
		<template v-if="set.saved.videos">
			<VideoCard v-for="video in set.saved.videos" :key="video" :video="video"/>
		</template>
		<template v-if="set.saved.flashCards">
			<FlashcardsCard v-for="flashCard in set.saved.flashCards" :key="flashCard" :flashCard="flashCard"/>
		</template>
		<template v-if="set.saved.testPreps">
			<TestPrepCard  v-for="testPrep in set.saved.testPreps" :key="testPrep" :testPrep="testPrep"/>
		</template>
		<template v-if="empty()">
			<empty-state
				class="w-full"
				info="You Have no material in your set"
			></empty-state>
		</template>
	</div>


	<!-- <div
		:class="`m-0  h-[7.5rem] min-w-[16.5rem] cardPadding ${colorClass}   rounded-xl  flex flex-col  items-center justify-center md:gap-2 gap-[1rem] box-border  p-5 px-10 border border-faded_gray lg:border-0`"
	>

		{{set.saved}}
		<div class="flex items-center justify-between w-full  mx-auto">
			<div class="bg-icon_inactive min-h-[60px] min-w-[60px] grid place-items-center rounded-md mr-5 ml-2">
				<ion-icon
					class="text-white text-2xl"
					:icon="play"
				/>
			</div>
            
			<ion-text class="text-sm text-main_dark font-bold">
				Work and Energy 
				Introduction to
				University Physics
			</ion-text>
		</div>

	


	</div> -->
</template>

<script lang="ts">
import { calendar, play } from 'ionicons/icons'
import { defineComponent,  } from 'vue'
import { formatNumber } from '@utils/commons'
import { SetEntity } from '@root/modules/study'
import notesCard from './notes/card/notesCard.vue'
import VideoCard from './videos/card/VideoCard.vue'
import FlashcardsCard from './flashcard/card/FlashcardsCard.vue'
import TestPrepCard from './testPrep/card/TestPrepCard.vue'


export default defineComponent({
	components: { notesCard, VideoCard, FlashcardsCard, TestPrepCard },
	name: 'TutorCard',
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		set:{
			type: SetEntity,
			required:true
		}
	},
	setup(props) {
		const notes = props.set.saved.notes.length === 0
		const videos = props.set.saved.videos.length === 0
		const flashCards = props.set.saved.flashCards.length === 0
		const testPreps = props.set.saved.testPreps.length === 0

		const empty = ()=>{
			if(notes && videos && flashCards && testPreps) return true
			else return false
		}
		return {
			empty, formatNumber,
			calendar,
			play
		}
	},
})
</script>

<style lang="scss" scoped>
	ion-card {
		box-shadow: none !important;

	}
</style>
