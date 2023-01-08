<template>
	<IonText v-if="error" class="text-sm text-danger">
		{{ error }}
	</IonText>
</template>

<script lang="ts" setup>
defineProps({
	error: {
		type: String,
		required: true
	}
})
</script>
