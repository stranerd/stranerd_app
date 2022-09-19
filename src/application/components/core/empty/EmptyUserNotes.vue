<template>
	<div class="flex justify-center items-center flex-col text-center gap-4 my-auto">
		<img src="@/assets/images/emptyStates/note.png">
		<p class="text-lg font-bold">No notes</p>
		<span class="text-center ">Notes will show up here.</span>
		<router-link to="/study/notes/create">
			<IonButton class="btn-outline">Create a note</IonButton>
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'EmptyUserNotes'
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
