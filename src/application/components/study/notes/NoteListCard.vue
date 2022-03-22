<template>
	<component :is="content ? 'router-link' : 'span'" :to="`/study/notes/${note.id}`"
		class="w-full bg-white rounded-xl flex flex-col justify-between box-border card-padding text-main_dark">
		<div class="w-full justify-between items-center flex gap-2">
			<ion-text class="font-500 truncate w-full">{{ note.title }}</ion-text>
			<IonSpinner v-if="loading" color="primary" />
			<IonIcon v-else-if="!content" :icon="downloadOutline" class="text-primary text-xl" @click="download" />
		</div>

		<div class="w-full flex items-center justify-between gap-2 text-sub">
			<Tag :index="2" tag="Note">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<ion-icon :icon="documentOutline" class="text-base mr-1" />
						<ion-text class="text-sub">{{ slotProps.tag }}</ion-text>
					</span>
				</template>
			</Tag>
			<div class="flex items-center text-gray gap-2">
				<Avatar :id="note.userId" :name="note.userBio.fullName" :size="24" :src="note.userBio.photo" />
				<Share :link="note.shareLink" :text="note.description" :title="note.title" cssClass="text-xl" />
				<SaveToSet :entity="note" />
			</div>
		</div>
	</component>
</template>

<script lang="ts">
import { documentOutline, downloadOutline, ellipsisVerticalOutline } from 'ionicons/icons'
import { defineComponent } from 'vue'
import { NoteEntity } from '@modules/study'
import { IonSpinner } from '@ionic/vue'
import { useDownload } from '@app/composable/meta/media'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'

export default defineComponent({
	name: 'NoteListCard',
	props: {
		note: {
			type: NoteEntity,
			required: true
		}
	},
	components: { IonSpinner, SaveToSet },
	setup (props) {
		const {
			loading,
			content,
			error,
			download,
			deleteFromDownloads
		} = useDownload(props.note.fileName, props.note.fileLink, 'notes')

		return {
			ellipsisVerticalOutline,
			documentOutline,
			downloadOutline,
			download,
			loading,
			content,
			error,
			deleteFromDownloads
		}
	}
})
</script>
