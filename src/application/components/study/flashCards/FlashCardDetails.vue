<template>
	<Flash v-if="tab === 'flash'" :close="() => tab = null" :flashCard="flashCard" />
	<Read v-else-if="tab === 'read'" :close="() => tab = null" :flashCard="flashCard" />
	<Settings v-else-if="tab === 'settings'" :close="() => tab = null" :flashCard="flashCard" />
	<div v-else class="showcase-flex !gap-6">
		<div class="flex gap-4 justify-between items-center text-lg">
			<IonBackButton v-if="$route.meta.back" :icon="arrowBackOutline" defaultHref="/dashboard" mode="ios"
				text="" />
			<div class="flex gap-4 items-center">
				<Share :link="flashCard.shareLink" :title="flashCard.title" text="Share this flashcard" />
				<IonIcon :icon="ellipsisHorizontalOutline" @click="tab = 'settings'" />
			</div>
		</div>
		<div class="flex gap-4 lg:gap-6 overflow-x-auto hide-scrollbar">
			<div v-for="(set, idx) in flashCard.set" :key="idx" class="flex flex-col min-w-[85%] lg:min-w-[40%]">
				<Flip :back="set.answer" :front="set.question" height="h-[200px]" />
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
				//{ label: 'Test', icon: documentTextOutline, sub: 'Multiple choice questions practice test', route: 'test' },
				//{ label: 'Match', icon: gitCompareOutline, sub: 'Pick questions and answers that correspond', route: 'match' },
				{ label: 'Read', icon: readerOutline, sub: 'Study questions with answers together', route: 'read' },
			]" :key="route" class="flex items-center card-padding !gap-4 card-sm" @click="tab = route">
				<span class="rounded-full w-14 h-14 flex items-center justify-center bg-bodyBg">
					<IonIcon :icon="icon" />
				</span>
				<span class="flex flex-col">
					<span class="font-bold">{{ label }}</span>
					<span class="text-sm text-secondaryText">{{ sub }}</span>
				</span>
			</a>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { arrowBackOutline, copyOutline, ellipse, ellipsisHorizontalOutline, readerOutline } from 'ionicons/icons'
import { useDeleteFlashCard } from '@app/composable/study/flashCards'
import Read from '@app/components/study/flashCards/modes/Read.vue'
import Flash from '@app/components/study/flashCards/modes/Flash.vue'
import Flip from '@app/components/study/flashCards/modes/Flip.vue'
import Settings from '@app/components/study/flashCards/modes/Settings.vue'
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
