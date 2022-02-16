<template>
	<div
		class="m-0 w-full bg-white rounded-xl flex flex-col justify-between items-start gap-4 box-border p-4 text-main_dark">
		<div class="w-full justify-between items-start flex">
			<div class="text-base flex-col flex gap-2 items-start flex-grow truncate">
				<ion-text class="font-semibold truncate">{{ note.title }}</ion-text>
				<Tag :index="1" tag="Note">
					<template v-slot="slotProps">
						<span class="flex items-center">
							<ion-icon :icon="document" class="text-base mr-1" />
							<ion-text class="text-xs">{{ slotProps.tag }}</ion-text>
						</span>
					</template>
				</Tag>
			</div>
			<ion-icon :icon="ellipsisVertical" class="text-gray text-xl" @click="openMenu" />
		</div>
		<div class="w-full flex items-center justify-between">
			<div class="flex items-center gap-2">
				<Avatar :id="note.userId" :size="24" :src="note.userBio.photo" />
				<ion-text class="text-xs">{{ note.userBio.firstName }}</ion-text>
			</div>
			<router-link v-if="content" :to="`/study/notes/${note.id}`">
				<ion-button class="btn-outline text-primary w-full lg:min-w-[7.5rem]" size="small">
					Read
				</ion-button>
			</router-link>
			<IonSpinner v-else-if="loading" color="primary" />
			<IonIcon v-else :icon="downloadIcon" class="text-2xl" color="primary" @click="download" />
		</div>
	</div>
</template>

<script lang="ts">
import { document, download as downloadIcon, ellipsisVertical } from 'ionicons/icons'
import { defineComponent } from 'vue'
import { NoteEntity } from '@modules/study'
import { IonSpinner } from '@ionic/vue'
import { useDownload } from '@app/composable/meta/media'

export default defineComponent({
	name: 'NoteListCard',
	props: {
		note: {
			type: NoteEntity,
			required: true
		},
		openMenu: {
			type: Function,
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

		return {
			ellipsisVertical, document, downloadIcon,
			download, loading, content, error, deleteFromDownloads
		}
	}
})
</script>
