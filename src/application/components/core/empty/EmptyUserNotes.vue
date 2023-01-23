<template>
	<div class="flex justify-center items-center flex-col text-center gap-4 my-auto">
		<img src="@/assets/images/emptyStates/note.svg">
		<p class="text-lg font-bold">No notes</p>
		<span class="text-center ">Notes will show up here.</span>
		<router-link to="/study/notes/create">
			<IonButton class="btn-outline">Create a note</IonButton>
		</router-link>
	</div>
</template>

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
