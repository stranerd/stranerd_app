<template>
	<div class="flex justify-center items-center flex-col text-center gap-4 my-auto">
		<img src="@/assets/images/emptyStates/flashcard.svg">
		<p class="text-lg font-bold">No flashcards</p>
		<span class="text-center ">Flashcards will show up here.</span>
		<router-link to="/study/flashCards/create">
			<IonButton class="btn-outline">Create a flashcard</IonButton>
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'EmptyUserFlashCards'
})
</script>

<style lang="scss" scoped>
img {
	min-width: 150px;
}

ion-button {
	--border-radius: 10rem;
	--padding-top: 1.25rem;
	--padding-bottom: 1.25rem;
}
</style>
