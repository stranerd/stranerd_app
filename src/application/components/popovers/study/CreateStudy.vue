<template>
	<Popover class="flex flex-col gap-4">
		<router-link class="flex items-center" to="/study/flashCards/create">
			<ion-icon :icon="flash" alt="" class="text-2xl text-gray" />
			<ion-text class="font-bold ml-4 text-lg text-gray">
				Create Flashcard
			</ion-text>
		</router-link>
		<router-link class="flex items-center" to="/study/notes/create">
			<ion-icon :icon="reader" alt="" class="text-2xl text-gray" />
			<ion-text class="font-bold ml-4 text-lg text-gray">
				Upload Note
			</ion-text>
		</router-link>
		<router-link class="flex items-center" to="/study/sets/create">
			<ion-icon :icon="folder" alt="" class="text-2xl text-gray" />
			<ion-text class="font-bold ml-4 text-lg text-gray">
				Create Study set
			</ion-text>
		</router-link>
	</Popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { flash, folder, reader } from 'ionicons/icons'

export default defineComponent({
	name: 'CreateStudy',
	setup () {
		return { flash, folder, reader }
	}
})
</script>
