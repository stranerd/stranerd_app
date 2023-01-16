<template>
	<div class="h-full flex flex-col">
		<a class="flex gap-4 justify-between items-center page-padding text-lg">
			<span class="font-bold">Options</span>
			<IonIcon :icon="closeOutline" @click="close" />
		</a>
		<SaveToSet :entity="flashCard" class="!mt-auto page-padding border-top-line">
			<div class="flex gap-4 items-center">
				<IonIcon :icon="bookmarkOutline" />
				<span>Save</span>
			</div>
		</SaveToSet>
		<Share :link="flashCard.shareLink" :title="flashCard.title" class="page-padding border-top-line"
			text="Share this flashcard">
			<div class="flex gap-4 items-center">
				<IonIcon :icon="shareOutline" />
				<span>Share</span>
			</div>
		</Share>
		<a class="flex gap-4 items-center page-padding border-top-line" @click="openReportModal">
			<IonIcon :icon="flagOutline" />
			<span>Report</span>
		</a>
		<template v-if="flashCard.user.id === id">
			<a class="flex gap-4 items-center page-padding border-top-line"
				@click="openFlashCardEditModal(flashCard, $router)">
				<IonIcon :icon="pencilOutline" />
				<span>Edit</span>
			</a>
			<a class="flex gap-4 items-center page-padding border-top-line text-danger" @click="deleteFlashCard">
				<IonIcon :icon="trashBinOutline" />
				<span>Delete</span>
			</a>
			<PageLoading v-if="loading" />
		</template>
		<template v-else>
			<a class="flex gap-4 items-center page-padding border-top-line"
				@click.prevent="cloneFlashCard(flashCard, $router)">
				<IonIcon :icon="copyOutline" />
				<span>Clone</span>
			</a>
		</template>
	</div>
</template>

<script lang="ts" setup>
import { FlashCardEntity } from '@modules/study'
import {
	bookmarkOutline,
	closeOutline,
	copyOutline,
	flagOutline,
	pencilOutline,
	shareOutline,
	trashBinOutline
} from 'ionicons/icons'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'
import { openCreateReportModal } from '@app/composable/moderation/reports'
import { ReportType } from '@modules/moderation'
import { useAuth } from '@app/composable/auth/auth'
import { cloneFlashCard, openFlashCardEditModal, useDeleteFlashCard } from '@app/composable/study/flashCards'
import { PropType } from 'vue'

const props = defineProps({
	flashCard: {
		type: FlashCardEntity,
		required: true
	},
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const { id } = useAuth()
const openReportModal = () => openCreateReportModal(ReportType.flashCards, props.flashCard.id)
const { deleteFlashCard, loading } = useDeleteFlashCard(props.flashCard.id)
</script>
