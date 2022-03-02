<template>
	<div class="w-full bg-white rounded-xl flex flex-col justify-between gap-6 box-border p-4 text-main_dark">
		<div class="w-full justify-between items-center flex">
			<div class="text-base flex-col flex gap-2 items-start flex-grow truncate">
				<ion-text class="font-semibold truncate w-48">{{ note.title }}</ion-text>

			</div>
			<router-link v-if="content" :to="`/study/notes/${note.id}`">
				<ion-icon :icon="arrowForwardCircleOutline" class="text-gray text-xl" />
			</router-link>
			<IonSpinner v-else-if="loading" color="primary" />
			<IonIcon v-else :icon="downloadOutline" class="text-xl" @click="download" />
		</div>

		<div class="w-full flex items-center justify-between gap-2">
			<Tag :index="1" tag="Note">
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
				<ion-icon :icon="isSaved ? bookmark : bookmarkOutline" class="text-xl" />
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
			isSaved
		}
	}
})
</script>
