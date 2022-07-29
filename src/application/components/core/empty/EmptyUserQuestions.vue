<template>
	<div class="flex justify-center items-center flex-col text-center gap-4 my-auto">
		<img src="@/assets/images/emptyStates/question.svg">
		<p class="text-lg font-bold">No questions</p>
		<span class="text-center ">Questions asked will show up here.</span>
		<router-link to="/questions/create">
			<IonButton class="btn-outline">Ask a question</IonButton>
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'EmptyUserQuestions'
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
