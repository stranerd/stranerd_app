<template>
	<div
		class="m-0 w-full bg-white rounded-xl flex flex-col justify-between items-start gap-4 box-border p-4 text-main_dark">
		<div class="w-full justify-between items-start flex">
			<ion-icon :icon="document" class="text-2xl" />
			<ion-text class="font-semibold ml-2 flex-grow truncate">{{ note.title }}</ion-text>
			<ion-icon :icon="ellipsisVertical" class="text-gray text-xl" @click="openMenu" />
		</div>
		<div class="w-full flex items-center justify-between">
			<div class="flex items-center gap-2">
				<Avatar :id="note.userId" :size="24" :src="note.userBio.photo" />
				<ion-text class="text-xs">{{ note.userBio.firstName }}</ion-text>
			</div>
			<router-link :to="`/study/notes/${note.id}`">
				<ion-button class="btn-outline text-primary w-full lg:min-w-[7.5rem]" size="small">
					Read
				</ion-button>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { document, ellipsisVertical } from 'ionicons/icons'
import { defineComponent } from 'vue'
import { formatNumber } from '@utils/commons'
import { NoteEntity } from '@modules/study'

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
	setup () {
		return { formatNumber, ellipsisVertical, document }
	}
})
</script>
