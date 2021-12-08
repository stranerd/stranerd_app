<template>
	<div class="grid grid-cols-2 lg:grid-cols-4 items-center justify-between gap-3 lg:gap-8">
		
		<div class="bg-purple  w-full lg:h-24 h-[5.25rem] rounded-3xl grid place-items-center mr-4">
			<div class="flex">
				<img alt="" class="w-6 mr-4" src="@app/assets/images/New/flashCard.png"/>
				<ion-text class="text-white text-2xl" v-if="flashCards">
					{{flashCards.length || 0}}
				</ion-text>
			</div>
		</div>
		
		<div class="bg-pink  w-full lg:h-24 h-[5.25rem] rounded-3xl grid place-items-center mr-8">
			<div class="flex items-center gap-4">
				<ion-icon
					:icon="reader"
					class="text-white text-2xl" 
				/>
				<ion-text class="text-white text-2xl" v-if="notes">
					{{notes.length || 0}}
				</ion-text>
			</div>
		</div>

		<div class="bg-green  w-full lg:h-24 h-[5.25rem] rounded-3xl grid place-items-center mr-4">
			<div class="flex">
				<img alt="" class="w-6 mr-4" src="@app/assets/images/New/testPrep.svg"/>
				<ion-text class="text-white text-2xl" v-if="testPreps">
					{{testPreps.length || 0}}
				</ion-text>
			</div>
		</div>
		

		<div class="bg-orange  w-full lg:h-24 h-[5.25rem] rounded-3xl grid place-items-center ">
			<div class="flex items-center gap-4">
				<ion-icon
					:icon="folder"
					class="text-white text-2xl" 
				/>
				<ion-text class="text-white text-2xl" v-if="sets">
					{{sets.length || 0}}
				</ion-text>
			</div>
		</div>
		
		
	</div>
</template>

<script lang="ts">
import { useAuth } from '@root/application/composable/auth/auth'
import { chevronDown, chevronUp, folder, flash, reader } from 'ionicons/icons'
import { defineComponent, ref } from 'vue'
import { useNoteList } from '@app/composable/study/notes'
import { useFlashCardList } from '@app/composable/study/flashCards'
import { useTestPrepList } from '@app/composable/study/testPreps'
import { useSetList } from '@app/composable/study/sets'



export default defineComponent({
	name: 'StudySection',
	setup() {
		const {user} = useAuth()
		const isOpenRef = ref(false)
		const event = ref()

		const { notes } = useNoteList()
		const { testPreps } = useTestPrepList()
		const { flashCards } = useFlashCardList()
		const { sets } = useSetList()

		const setOpen = (state: boolean, ev?: Event) => {
			event.value = ev
			isOpenRef.value = state
		}

		return {
			user, chevronDown, chevronUp, isOpenRef, 
			setOpen, event, folder, flash , reader,
			notes, testPreps, flashCards,  sets


		}
	}


})
</script>

<style scoped>
	ion-popover::part(content) {
		width: auto !important;
	}
</style>