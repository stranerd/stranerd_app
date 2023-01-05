<template>
	<ReadList v-if="tab === 'read'" :close="() => tab = null" :flashCard="flashCard" />
	<div v-else class="showcase-flex !gap-6">
		<div class="flex gap-4 justify-between items-center">
			<IonIcon :icon="arrowBackOutline" />
			<div class="flex gap-4 items-center">
				<span class="font-bold text-lg">
					{{ flashCard.set.length }} {{ pluralize(flashCard.set.length, 'term', 'terms') }}
				</span>
			</div>
		</div>
		<div class="flex gap-4 lg:gap-6 overflow-x-auto hide-scrollbar min-h-[150px]">
			<div v-for="(set, idx) in flashCard.set" :key="idx"
				class="flex flex-col card-sm card-padding min-w-[85%] lg:min-w-[40%]">
				<h1>{{ set.question }}</h1>
			</div>
		</div>
		<div class="flex flex-col">
			<IonText class="font-bold text-lg">{{ flashCard.title }}</IonText>
			<div class="flex items-center gap-2 text-secondaryText">
				<Avatar :id="flashCard.user.id" :name="flashCard.user.bio.fullName" :size="20"
					:src="flashCard.user.bio.photo" />
				<UserName :isTutor="flashCard.user.roles.isStranerdTutor" :name="flashCard.user.bio.fullName"
					class="font-bold" />
				<IonIcon :icon="ellipse" class="dot" />
				<span>
					{{ flashCard.set.length }} {{ pluralize(flashCard.set.length, 'term', 'terms') }}
				</span>
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<a v-for="{ label, sub, icon, route } in [
				{ label: 'Flashcard', icon: copyOutline, sub: 'The best way to memorize your studies', route: 'flash' },
				{ label: 'Test', icon: documentTextOutline, sub: 'Multiple choice questions practice test', route: 'test' },
				{ label: 'Match', icon: gitCompareOutline, sub: 'Pick questions and answers that correspond', route: 'match' },
				{ label: 'Read', icon: readerOutline, sub: 'Study questions with answers together', route: 'read' },
			]" :key="route" class="flex items-center card-padding !gap-4 card-sm" @click="tab = route">
				<span class="rounded-full w-12 h-12 flex items-center justify-center bg-secondaryText text-itemBg">
					<IonIcon :icon="icon" />
				</span>
				<span class="flex flex-col">
					<span class="text-lg font-bold">{{ label }}</span>
					<span class="text-secondaryText">{{ sub }}</span>
				</span>
			</a>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
	arrowBackOutline,
	copyOutline,
	documentTextOutline,
	ellipse,
	gitCompareOutline,
	readerOutline
} from 'ionicons/icons'
import { useDeleteFlashCard } from '@app/composable/study/flashCards'
import ReadList from '@app/components/study/flashCards/modes/ReadList.vue'
import { useAuth } from '@app/composable/auth/auth'
import { FlashCardEntity } from '@modules/study'
import { pluralize } from '@utils/commons'

const props = defineProps({
	flashCard: {
		type: FlashCardEntity,
		required: true
	}
})

const { id } = useAuth()
const tab = ref(null as string | null)
const cardMode = ref(true)
const { deleteFlashCard, loading, error } = useDeleteFlashCard(props.flashCard.id)
</script>
