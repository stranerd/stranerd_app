<template>
	<div class="px-4 h-28 my-2">
		<IonSkeletonText animated class="rounded-xl h-full" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'BlockLoading'
})
</script>
