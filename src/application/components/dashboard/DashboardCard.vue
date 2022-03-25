<template>
	<div class="bg-white rounded-xl p-4 md:p-6 flex flex-col items-start gap-2 md:gap-3">
		<IonIcon :class="iconClass" :icon="icon" class="text-heading2" />
		<ion-text class="font-bold text-main_dark text-heading leading-none">{{ title }}</ion-text>
		<ion-text class="text-gray leading-none">{{ subtitle }}</ion-text>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'DashboardCard',
	props: {
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
			default: 'text-orange'
		}
	}
})
</script>
