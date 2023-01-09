<template>
	<div class="h-full flex flex-col">
		<div class="flex gap-4 justify-between items-center page-padding text-lg">
			<span class="font-bold">Options</span>
			<IonIcon :icon="closeOutline" @click="close" />
		</div>
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
		<div class="flex gap-4 items-center page-padding border-top-line" @click="openReportModal">
			<IonIcon :icon="flagOutline" />
			<span>Report</span>
		</div>
		<template v-if="flashCard.user.id === id">
			<div class="flex gap-4 items-center page-padding border-top-line"
				@click="openFlashCardEditModal(flashCard, $router)">
				<IonIcon :icon="pencilOutline" />
				<span>Edit</span>
			</div>
			<div class="flex gap-4 items-center page-padding border-top-line text-danger" @click="deleteFlashCard">
				<IonIcon :icon="trashBinOutline" />
				<span>Delete</span>
			</div>
			<PageLoading v-if="loading" />
		</template>
	</div>
</template>

<script lang="ts" setup>
import { FlashCardEntity } from '@modules/study'
import {
	bookmarkOutline,
	closeOutline,
	flagOutline,
	pencilOutline,
	shareOutline,
	trashBinOutline
} from 'ionicons/icons'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'
import { openCreateReportModal } from '@app/composable/moderation/reports'
import { ReportType } from '@modules/moderation'
import { useAuth } from '@app/composable/auth/auth'
import { openFlashCardEditModal, useDeleteFlashCard } from '@app/composable/study/flashCards'
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
