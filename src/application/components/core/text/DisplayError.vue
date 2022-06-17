<template>
	<IonText v-if="error" class="text-sm text-red">
		{{ error }}
	</IonText>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'DisplayError',
	props: {
		error: {
			type: String,
			required: true
		}
	}
})
</script>
