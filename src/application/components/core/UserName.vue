<template>
	<IonText class="flex gap-1 items-center">
		<span>{{ name }}</span>
		<IonIcon v-if="isTutor" :icon="checkmarkCircle" class="text-primaryBg" style="font-size: 1.2em;" />
	</IonText>
</template>

<script lang="ts" setup>
import { checkmarkCircle } from 'ionicons/icons'

defineProps({
	name: {
		type: String,
		required: true
	},
	isTutor: {
		type: Boolean,
		required: false,
		default: false
	}
})
</script>
