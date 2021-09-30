<template>
	<div class="fixed w-full h-full grid-cols-12 grid bg-red-50">
		<div class="col-span-12">
			<slot />
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
	setup() {
		return {}
	},
})
</script>

