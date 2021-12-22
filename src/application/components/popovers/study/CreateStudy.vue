<template>
	<Popover class="flex flex-col">
		<router-link class="flex items-center justify-start w-auto mb-4 cursor-pointer"
			to="/study/flashCards/create">
			<ion-icon :icon="flash" alt="" class="text-2xl text-gray" />
			<ion-text class="font-bold ml-4 text-lg text-gray">
				Flashcard
			</ion-text>
		</router-link>
		<router-link class="flex items-center justify-start w-auto cursor-pointer"
			to="/study/sets/create">
			<ion-icon :icon="folder" alt="" class="text-2xl text-gray" />
			<ion-text class="font-bold ml-4 text-lg text-gray">
				Study set
			</ion-text>
		</router-link>
	</Popover>
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
