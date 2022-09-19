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

<script lang="ts">
import { defineComponent } from 'vue'
import { arrowForwardOutline, copyOutline, helpCircleOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'FabMenu',
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		return { arrowForwardOutline, helpCircleOutline, copyOutline }
	}
})
</script>
