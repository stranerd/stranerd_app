<template>
	<div v-if="message" class="small alert alert-success w-100 my-0-25 text-center" role="alert">
		<DynamicText>{{ message }}</DynamicText>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'DisplaySuccess',
	props: {
		message: {
			type: String,
			required: true
		}
	}
})
</script>
