<template>
	<div class="flex flex-col gap-4 w-full">
		<IonText class="font-bold text-lg">Suggested actions</IonText>
		<div class="flex flex-col gap-4 w-full text-secondaryText">
			<router-link v-for="{ title, route, icon } in [
				{ title: 'Ask a question', route: '/questions/create', icon: helpCircleOutline },
				{ title: 'Create a flashcard', route: '/study/flashCards/create', icon: copyOutline },
				{ title: 'Practice for tests and exams', route: '/study/', icon: bookOutline },
			]" :key="route" :to="route" class="card-sm card-padding !gap-4 items-center flex">
				<IonIcon :icon="icon" />
				<IonText>{{ title }}</IonText>
				<IonIcon :icon="arrowForwardOutline" class="ml-auto" />
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { arrowForwardOutline, bookOutline, copyOutline, helpCircleOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'SuggestedActions',
	setup () {
		return { arrowForwardOutline, helpCircleOutline, copyOutline, bookOutline }
	}
})
</script>
