<template>
	<div class="flex justify-center items-center flex-col text-center gap-4 my-auto">
		<img alt="question empty state" src="@/assets/images/emptyStates/answer.svg">
		<p class="text-lg font-bold">No answers</p>
		<span class="text-center ">Answers to questions will show up here.</span>
		<router-link to="/questions">
			<IonButton class="btn-outline">Answer a question</IonButton>
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'EmptyUserAnswers'
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
