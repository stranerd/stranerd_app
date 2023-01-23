<template>
	<div class="py-4 flex flex-col items-start gap-3">
		<IonIcon :class="iconClass" :icon="icon" class="-ml-1" />
		<IonText class="font-bold text-xl leading-none">{{ title }}</IonText>
		<IonText class="text-secondaryText leading-none">{{ subtitle }}</IonText>
	</div>
</template>

<script lang="ts" setup>
defineProps({
	icon: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	subtitle: {
		type: String,
		required: true
	},
	iconClass: {
		type: String,
		required: false,
		default: 'text-info'
	}
})
</script>
