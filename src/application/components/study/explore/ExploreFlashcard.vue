<template>
	<div class="md:w-8/12 w-full px-4 mx-auto   mt-8">
		<!-- <div class="flex gap-4 flex-col md:flex-row items-center">
			<ion-segment mode="ios" value="all">
				<ion-segment-button value="all">
					<ion-label>All authors</ion-label>
				</ion-segment-button> 
				<ion-segment-button value="tutors">
					<ion-label>Tutors</ion-label>
				</ion-segment-button>
				<ion-segment-button value="nerds">
					<ion-label>Nerds</ion-label>
				</ion-segment-button>
			</ion-segment>
			<ion-segment mode="ios" value="allCost">
				<ion-segment-button value="allCost">
					<ion-label>All cost</ion-label>
				</ion-segment-button>
				<ion-segment-button value="free">
					<ion-label>Fres</ion-label>
				</ion-segment-button>
				<ion-segment-button value="paid">
					<ion-label>Paid</ion-label>
				</ion-segment-button>
			</ion-segment>

			<ion-select class=" lg:w-96 w-40 text-xs md:text-sm  placeholder-[#8B9EB1] font-bold rounded-md" interface="action-sheet"
				placeholder="Rating" value="notifications">
				<ion-select-option value="maths">Rating</ion-select-option>
				<ion-select-option value="physics">Monthly</ion-select-option>
				<ion-select-option value="bio">Yearly</ion-select-option>

			</ion-select>
		</div> -->

		<div class="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mt-8">
			<FlashcardsCard  v-for="(n, index) in 12" :key="n" :index="index + 1"/>
		</div>
	
	</div>
</template>

<script lang="ts">
import FlashcardsCard from '@app/components/study/flashcard/FlashcardsCard.vue'
export default {
	// components: { IonSegment, IonSegmentButton, IonSelect, IonSelectOption, FlashcardsCard },
	components: {  FlashcardsCard },
}
</script>

<style scoped>
.segment-button-checked{
    color: white !important
}
ion-select{
   --background: #F7F7FC;  
   background: #F7F7FC;  
   --padding-start: 1rem;
   --padding-end: 1rem;
}
ion-segment{
    --background: #F7F7FC;
    color: #8B9EB1;
    font-weight: bold;
}
ion-segment-button{
    --background-checked: #4D5C6F;
    --background-focused: #4D5C6F;
    --indicator-color: #4D5C6F;
    --indicator-box-shadow:none;
    --padding-top:0.5rem;
    --padding-bottom:0.5rem;
    color: #8B9EB1;
    font-weight: bold;
}
</style>