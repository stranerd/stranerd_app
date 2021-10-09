<template>
	<div>
		
		<slot />
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {
		console.log('yooo')
		return {

		}
	},
})
</script>

