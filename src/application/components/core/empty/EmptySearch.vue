<template>
	<div class="flex justify-center items-center flex-col text-center gap-3 my-auto">
		<img alt="" src="@/assets/images/emptyStates/search.svg">
		<IonText class="font-bold">Nothing was found</IonText>
		<span class="max-w-[250px] text-sm">
			We don’t have what you’re looking for yet.
			Make a request so we can get it for you.
		</span>
		<IonButton class="btn-outline">Tell us what you want</IonButton>
		<IonButton class="btn-primary">Submit</IonButton>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'EmptySearch'
})
</script>

<style lang="scss" scoped>
	ion-button {
		min-width: 200px;
		--border-radius: 10rem;
		--padding-top: 1.25rem;
		--padding-bottom: 1.25rem;
	}
</style>
