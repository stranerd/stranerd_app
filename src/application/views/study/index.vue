<template>
	<DefaultLayout>
		<div class="flex page-padding flex-col gap-8">
			<div class="flex flex-col gap-2">
				<IonText class="font-bold text-lg">Assignment help</IonText>
				<IonText class="text-secondaryText">Get answers to assignment questions from expert tutors</IonText>
				<router-link class="w-full mt-2" to="/questions/create">
					<IonButton class="btn-primary w-full">
						<div class="flex w-full items-center gap-4">
							<IonIcon :icon="helpCircleOutline" />
							<span class="flex-1 text-left">Post your assignment</span>
							<IonIcon :icon="arrowForwardOutline" />
						</div>
					</IonButton>
				</router-link>
			</div>
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-2">
					<IonText class="font-bold text-lg">Exam prep</IonText>
					<IonText class="text-secondaryText">
						Study tools and materials for easier and efficient learning
					</IonText>
				</div>
				<component :is="route ? 'router-link' : 'span'" v-for="{ title, sub, route, icon } in [
						{ icon: copyOutline, title: 'Create a flashcard', sub: 'Flashcards and other study modes', route: '/study/flashCards/create' },
						{ icon: searchOutline, title: 'Explore flashcards', sub: 'Find flashcards created by others', route: '/study/flashCards' },
						{ icon: documentTextOutline, title: 'Study with past questions', sub: '', route: '' },
						{ icon: readerOutline, title: 'Access textbook solutions', sub: '', route: '' }
					]" :key="title" :class="{'opacity-50': !route}" :to="route"
					class="flex items-center card-padding !gap-4 card-sm">
					<span
						class="rounded-full w-14 h-14 flex items-center justify-center bg-bodyBg">
						<IonIcon :icon="icon" />
					</span>
					<span class="flex flex-col">
						<span class="font-bold">{{ title }}</span>
						<span class="text-sm text-secondaryText">{{ route ? sub : 'Coming soon' }}</span>
					</span>
				</component>
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import {
	arrowForwardOutline,
	copyOutline,
	documentTextOutline,
	helpCircleOutline,
	readerOutline,
	searchOutline
} from 'ionicons/icons'

export default defineComponent({
	name: 'Study',
	setup () {
		useRouteMeta('Study', {})
		return {
			arrowForwardOutline, copyOutline, helpCircleOutline, documentTextOutline, searchOutline, readerOutline
		}
	}
})
</script>
