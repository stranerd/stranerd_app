<template>
	<div class="flex flex-col p-6 !w-52">
		<router-link class="flex items-center justify-start w-auto mb-4 cursor-pointer"
			to="/study/flashCards/create">
			<ion-icon :icon="flash" alt="" class=" text-2xl text-main_dark" />
			<ion-text class="font-bold ml-4 text-lg text-main_dark">
				Flashcard
			</ion-text>
		</router-link>
		<router-link class="flex items-center justify-start w-auto cursor-pointer"
			to="/study/sets/create">
			<ion-icon :icon="folder" alt="" class=" text-2xl text-main_dark" />
			<ion-text class="font-bold ml-4 text-lg text-main_dark">
				Study set
			</ion-text>
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { flash, folder } from 'ionicons/icons'

export default defineComponent({
	name: 'CreateStudy',
	setup () {
		return { flash, folder }
	}
})
</script>
