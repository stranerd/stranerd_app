<template>
	<div class="w-full bg-white rounded-xl flex flex-col justify-between box-border card-padding text-main_dark">
		<div class="w-full justify-between items-center flex gap-2">
			<ion-text class="font-semibold truncate w-full">{{ note.title }}</ion-text>
			<router-link v-if="content" :to="`/study/notes/${note.id}`">
				<ion-icon :icon="arrowForwardCircleOutline" class="text-primary text-xl" />
			</router-link>
			<IonSpinner v-else-if="loading" color="primary" />
			<IonIcon v-else :icon="downloadOutline" class="text-primary text-xl" @click="download" />
		</div>

		<div class="w-full flex items-center justify-between gap-2">
			<Tag tag="Note">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<ion-icon :icon="documentOutline" class="text-base mr-1" />
						<ion-text class="text-xs">{{ slotProps.tag }}</ion-text>
					</span>
				</template>
			</Tag>
			<div class="flex items-center text-gray gap-2">
				<Avatar :id="note.userId" :size="24" :src="note.userBio.photo" />
				<Share :link="note.shareLink" :text="note.description" :title="note.title" cssClass="text-xl" />
				<ion-icon :icon="isSaved ? bookmark : bookmarkOutline" class="text-xl" @click="openSaveModal(note)" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {
	arrowForwardCircleOutline,
	bookmark,
	bookmarkOutline,
	checkmarkCircleOutline,
	documentOutline,
	downloadOutline,
	ellipsisVerticalOutline
} from 'ionicons/icons'
import { computed, defineComponent } from 'vue'
import { NoteEntity } from '@modules/study'
import { IonSpinner } from '@ionic/vue'
import { useDownload } from '@app/composable/meta/media'
import { useUserSetList } from '@app/composable/users/users/sets'
import { openSaveModal } from '@app/composable/study/menus'

export default defineComponent({
	name: 'NoteListCard',
	props: {
		note: {
			type: NoteEntity,
			required: true
		}
	},
	components: { IonSpinner },
	setup (props) {
		const {
			loading,
			content,
			error,
			download,
			deleteFromDownloads
		} = useDownload(props.note.fileName, props.note.fileLink, 'notes')
		const { sets } = useUserSetList()
		const isSaved = computed(() => sets.value.some((set) => set.allSaved.includes(props.note.id)))

		return {
			arrowForwardCircleOutline,
			ellipsisVerticalOutline,
			documentOutline,
			downloadOutline,
			checkmarkCircleOutline,
			bookmark,
			bookmarkOutline,
			download,
			loading,
			content,
			error,
			deleteFromDownloads,
			isSaved,
			openSaveModal
		}
	}
})
</script>
