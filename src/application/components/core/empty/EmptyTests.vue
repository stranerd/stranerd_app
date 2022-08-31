<template>
	<div class="flex justify-center items-center flex-col text-center gap-3 my-auto">
		<img alt="" src="@/assets/images/emptyStates/tests.svg">
		<IonText class="font-bold">Nothing here</IonText>
		<span class="max-w-[200px] text-sm">
			You have not started any tests.
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'EmptyTests'
})
</script>
