<template>
	<Popover class="flex flex-col">
		<router-link class="py-2 my-2 mx-auto flex gap-4 items-center text-main_dark"
			to="/study/sets/create">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="folder" class="text-2xl" />
				<ion-label class="font-bold">Create a study set</ion-label>
			</div>
		</router-link>
		<router-link class="py-2 my-2 mx-auto flex gap-4 items-center text-main_dark"
			to="/study/flashCards/create">
			<div class="w-48 flex items-center gap-3">
				<img alt="" class="w-6" src="@app/assets/images/icons/flashCardNav.svg">
				<ion-label class="font-bold">Create a flashcard</ion-label>
			</div>
		</router-link>
		<router-link class="py-2 my-2 mx-auto flex gap-4 items-center text-main_dark"
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
import { folder, helpCircle } from 'ionicons/icons'

export default defineComponent({
	name: 'CreateDashboardMenu',
	setup () {
		return { helpCircle, folder }
	}
})
</script>
