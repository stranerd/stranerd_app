<template>
	<div class="page-side-padding showcase-flex !gap-6">
		<div class="flex gap-4 justify-between items-center text-lg">
			<IonBackButton v-if="$route.meta.back" :icon="arrowBackOutline" defaultHref="/dashboard" mode="ios"
				text="" />
			<div class="flex gap-4 items-center">
				<Share :link="flashCard.shareLink" :title="flashCard.title" text="Share this flashcard" />
				<IonIcon :icon="ellipsisHorizontalOutline" @click="isOpen = true" />
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
					{ label: 'Test', icon: documentTextOutline, sub: 'Multiple choice questions practice test', route: 'test' },
					{ label: 'Match', icon: gitCompareOutline, sub: 'Pick questions and answers that correspond', route: 'match' },
					{ label: 'Read', icon: readerOutline, sub: 'Study questions with answers together', route: 'read' },
				]" :key="route" class="flex items-center card-padding !gap-4 card-sm"
				@click="$router.push(`/study/flashCards/${flashCard.id}/${route}`)">
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
	<IonModal v-bind="{ ...modalProps, isOpen }" @didDismiss="isOpen = false">
		<div class="overflow-y-auto flex flex-col modal-content">
			<a class="flex gap-4 justify-between items-center card-padding text-lg">
				<span class="font-bold">Options</span>
				<IonIcon :icon="closeOutline" @click="isOpen = false" />
			</a>
			<SaveToSet :entity="flashCard" class="card-padding border-top-line !mt-auto">
				<div class="flex gap-4 items-center">
					<IonIcon :icon="bookmarkOutline" />
					<span>Save</span>
				</div>
			</SaveToSet>
			<Share :link="flashCard.shareLink" :title="flashCard.title" class="card-padding border-top-line"
				text="Share this flashcard">
				<div class="flex gap-4 items-center">
					<IonIcon :icon="shareOutline" />
					<span>Share</span>
				</div>
			</Share>
			<a class="flex gap-4 items-center card-padding border-top-line" @click="openReportModal">
				<IonIcon :icon="flagOutline" />
				<span>Report</span>
			</a>
			<template v-if="flashCard.user.id === id">
				<a class="flex gap-4 items-center card-padding border-top-line"
					@click="openFlashCardEditModal(flashCard, $router)">
					<IonIcon :icon="pencilOutline" />
					<span>Edit</span>
				</a>
				<a class="flex gap-4 items-center card-padding border-top-line text-danger" @click="deleteFlashCard">
					<IonIcon :icon="trashBinOutline" />
					<span>Delete</span>
				</a>
				<PageLoading v-if="loading" />
			</template>
			<template v-else>
				<a class="flex gap-4 items-center card-padding border-top-line"
					@click.prevent="cloneFlashCard(flashCard, $router)">
					<IonIcon :icon="copyOutline" />
					<span>Clone</span>
				</a>
			</template>
		</div>
	</IonModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
	arrowBackOutline,
	bookmarkOutline,
	closeOutline,
	copyOutline,
	documentTextOutline,
	ellipse,
	ellipsisHorizontalOutline,
	flagOutline,
	gitCompareOutline,
	pencilOutline,
	readerOutline,
	shareOutline,
	trashBinOutline
} from 'ionicons/icons'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'
import Flip from '@app/components/study/flashCards/modes/Flip.vue'
import { FlashCardEntity } from '@modules/study'
import { pluralize } from '@utils/commons'
import { modalProps } from '@app/composable/core/modal'
import { useAuth } from '@app/composable/auth/auth'
import { openCreateReportModal } from '@app/composable/moderation/reports'
import { ReportType } from '@modules/moderation'
import { cloneFlashCard, openFlashCardEditModal, useDeleteFlashCard } from '@app/composable/study/flashCards'

const props = defineProps({
	flashCard: {
		type: FlashCardEntity,
		required: true
	}
})

const isOpen = ref(false)
const { id } = useAuth()
const openReportModal = () => openCreateReportModal(ReportType.flashCards, props.flashCard.id)
const { deleteFlashCard, loading } = useDeleteFlashCard(props.flashCard.id)
</script>
