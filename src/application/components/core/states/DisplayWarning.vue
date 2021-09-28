<template>
	<div v-if="message" class="small alert alert-warning w-100 my-0-25 text-center" role="alert">
		<DynamicText>{{ message }}</DynamicText>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
	name: 'DisplayWarning',
	props: {
		message: {
			type: String,
			required: true
		}
	}
})
</script>
