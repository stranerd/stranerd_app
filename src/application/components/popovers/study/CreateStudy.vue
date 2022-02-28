<template>
	<Popover class="flex flex-col gap-4">
		<router-link class="flex items-center" to="/study/flashCards/create">
			<ion-icon :icon="flashOutline" alt="" class="text-2xl text-gray" />
			<ion-text class="font-bold ml-4 text-lg text-gray">
				Create Flashcard
			</ion-text>
		</router-link>
		<router-link class="flex items-center" to="/study/notes/create">
			<ion-icon :icon="readerOutline" alt="" class="text-2xl text-gray" />
			<ion-text class="font-bold ml-4 text-lg text-gray">
				Upload Note
			</ion-text>
		</router-link>
		<router-link class="flex items-center" to="/study/folders/create">
			<ion-icon :icon="folderOutline" alt="" class="text-2xl text-gray" />
			<ion-text class="font-bold ml-4 text-lg text-gray">
				Create Study Folder
			</ion-text>
		</router-link>
	</Popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { flashOutline, folderOutline, readerOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'CreateStudy',
	setup () {
		return { flashOutline, folderOutline, readerOutline }
	}
})
</script>
