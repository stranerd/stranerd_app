<template>
	<div v-if="flashCard" id="screen"
		class="lg:w-8/12 w-full px-4 mx-auto mt-8 mb-16">

		<div>
			<ion-text class="text-main text-main_dark font-bold heading">
				All cards info <span class="text-gray">({{flashCard.set.length}})</span> 
			</ion-text>
		</div>

		<div class="flex justify-between  w-full md:mt-6 mt-3 text-body" v-for="card in flashCard.set" :key="card.question">
			<div class=" bg-white py-3 px-6 rounded-xl w-full md:mr-6 mr-3">
				{{card.question}}
			</div>
			<div class=" bg-white  py-3 px-6 rounded-xl w-full ">
				{{card.answer}}
			</div>
		</div>




	</div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { FlashCardEntity } from '@modules/study'
import { add, chevronBack, chevronForward, contract,  pause, play, scan } from 'ionicons/icons'

export default defineComponent({
	name: 'FlashCardScreen',
	props:{
		flashCard:{
			type: FlashCardEntity,
			required: true
		}
	},


})
</script>

<style lang="scss" scoped>

</style>