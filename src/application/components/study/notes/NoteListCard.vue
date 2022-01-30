<template>
	<div :class="`m-0 w-full bg-white rounded-xl flex flex-col md:gap-2 gap-[1rem] box-border p-4`">
		<div class="w-full justify-between items-start flex">
			<img :src="note.preview.link"
				class="bg-faded_gray h-[4rem] w-[4rem] rounded-md object-cover" />
			<div class="text-base text-main_dark font-bold text-left flex-col flex ml-4 flex-grow">
				<ion-text>{{ note.title }}</ion-text>
			</div>
			<ion-icon :icon="ellipsisVertical" class="text-gray text-xl cursor-pointer" @click="openMenu" />
		</div>
		<div class="w-full flex items-center justify-between">
			<div class="flex items-center">
				<Avatar :id="note.userId" :size="24" :src="note.userBio.photo" />
				<ion-text class="text-xs font-bold text-main_dark ml-2">{{ note.userBio.firstName }}</ion-text>
			</div>
			<router-link :to="`/study/notes/${note.id}`">
				<ion-button  class="btn-outline text-primary font-bold w-full lg:min-w-[7.5rem]">
					Read
				</ion-button>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { ellipsisVertical } from 'ionicons/icons'
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
		return { formatNumber, ellipsisVertical }
	}
})
</script>
