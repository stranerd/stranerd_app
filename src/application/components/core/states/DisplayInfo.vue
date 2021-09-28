<template>
	<div v-if="message" class="small alert alert-info w-100 my-0-25 text-center" role="alert">
		<DynamicText>{{ message }}</DynamicText>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'DisplayInfo',
	props: {
		message: {
			type: String,
			required: true
		}
	}
})
</script>
