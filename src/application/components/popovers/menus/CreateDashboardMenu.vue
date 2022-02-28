<template>
	<Popover class="flex flex-col gap-4">
		<router-link class="py-2 mx-auto flex gap-4 items-center text-gray hover:text-main_dark"
			to="/study/flashCards/create">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="flash" class="text-2xl" />
				<ion-label class="font-bold">Create a flashcard</ion-label>
			</div>
		</router-link>
		<router-link class="py-2 mx-auto flex gap-4 items-center text-gray hover:text-main_dark"
			to="/study/notes/create">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="reader" class="text-2xl" />
				<ion-label class="font-bold">Upload a note</ion-label>
			</div>
		</router-link>
		<router-link class="py-2 mx-auto flex gap-4 items-center text-gray hover:text-main_dark"
			to="/study/videos/create">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="videocamSharp" class="text-2xl" />
				<ion-label class="font-bold">Upload a video</ion-label>
			</div>
		</router-link>
		<router-link class="py-2 mx-auto flex gap-4 items-center text-gray hover:text-main_dark"
			to="/study/sets/create">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="folder" class="text-2xl" />
				<ion-label class="font-bold">Create a study folder</ion-label>
			</div>
		</router-link>
		<router-link class="py-2 mx-auto flex gap-4 items-center text-gray hover:text-main_dark"
			to="/questions/create">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="helpCircle" class="text-3xl" />
				<ion-label class="font-bold">Ask a question</ion-label>
			</div>
		</router-link>
	</Popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { flash, folder, helpCircle, reader, videocamSharp } from 'ionicons/icons'

export default defineComponent({
	name: 'CreateDashboardMenu',
	setup () {
		return { helpCircle, folder, flash, reader, videocamSharp }
	}
})
</script>
