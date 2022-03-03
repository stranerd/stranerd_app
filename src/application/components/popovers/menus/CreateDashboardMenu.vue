<template>
	<Popover>
		<router-link class="flex gap-2 items-center text-gray hover:text-main_dark"
			to="/study/flashCards/create">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="flashOutline" class="text-2xl" />
				<ion-label class="font-bold">Create a flashcard</ion-label>
			</div>
		</router-link>
		<router-link class="flex gap-2 items-center text-gray hover:text-main_dark"
			to="/study/notes/create">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="readerOutline" class="text-2xl" />
				<ion-label class="font-bold">Upload a note</ion-label>
			</div>
		</router-link>
		<router-link class="flex gap-2 items-center text-gray hover:text-main_dark"
			to="/study/videos/create">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="videocamOutline" class="text-2xl" />
				<ion-label class="font-bold">Upload a video</ion-label>
			</div>
		</router-link>
		<router-link class="flex gap-2 items-center text-gray hover:text-main_dark"
			to="/study/sets/create">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="folderOutline" class="text-2xl" />
				<ion-label class="font-bold">Create a study folder</ion-label>
			</div>
		</router-link>
		<router-link class="flex gap-2 items-center text-gray hover:text-main_dark"
			to="/questions/create">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="helpCircleOutline" class="text-3xl" />
				<ion-label class="font-bold">Ask a question</ion-label>
			</div>
		</router-link>
		<router-link class="flex gap-2 items-center text-gray hover:text-main_dark"
			to="/classes/create">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="peopleOutline" class="text-3xl" />
				<ion-label class="font-bold">Create a class</ion-label>
			</div>
		</router-link>
	</Popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
	flashOutline,
	folderOutline,
	helpCircleOutline,
	peopleOutline,
	readerOutline,
	videocamOutline
} from 'ionicons/icons'

export default defineComponent({
	name: 'CreateDashboardMenu',
	setup () {
		return { helpCircleOutline, folderOutline, flashOutline, peopleOutline, readerOutline, videocamOutline }
	}
})
</script>
