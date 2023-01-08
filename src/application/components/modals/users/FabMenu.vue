<template>
	<Modal :close="close" :hideHeader="true">
		<div class="flex flex-col">
			<router-link v-for="{ path, icon, name } in [
				{ name: 'Ask a question', path: '/questions/create', icon: helpCircleOutline },
				{ name: 'Create a flashcard set', path: '/study/flashCards/create', icon: copyOutline }
			]" :key="path" :to="path" class="flex items-center gap-4 py-4 text-secondaryText">
				<IonIcon :icon="icon" />
				<span>{{ name }}</span>
				<IonIcon :icon="arrowForwardOutline" />
			</router-link>
		</div>
	</Modal>
</template>

<script lang="ts" setup>
import { arrowForwardOutline, copyOutline, helpCircleOutline } from 'ionicons/icons'

defineProps({
	close: {
		type: Function,
		required: true
	}
})
</script>
