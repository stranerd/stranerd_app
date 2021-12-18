<template>
	<div :class="`m-0 w-full bg-white rounded-xl flex flex-col md:gap-2 gap-[1rem] box-border py-4 px-4`">
		<div class="w-full justify-between items-start flex">
			<img :src="note.preview.link" class="bg-faded_gray h-[5.375rem] w-[4.5rem] rounded-md object-cover" />
			<div class="text-base text-main_dark font-bold text-left flex-col flex ml-4 flex-grow">
				<ion-text>{{ note.title }}</ion-text>
			</div>
			<ion-icon :icon="ellipsisVertical" class="text-gray text-2xl ml-auto" />
		</div>
		<router-link :to="`/study/notes/${note.id}`" class="mt-2">
			<ion-button class="btn-outline text-primary font-bold w-full lg:min-w-[7.5rem] ">
				Start reading
			</ion-button>
		</router-link>
	</div>
</template>


<script lang="ts">
import { calendar, ellipsisVertical, play } from 'ionicons/icons'
import { defineComponent } from 'vue'
import { formatNumber } from '@utils/commons'
import { NoteEntity } from '@modules/study'

export default defineComponent({
	name: 'NoteListCard',
	props: {
		note: {
			type: NoteEntity,
			required: true
		}
	},
	setup () {
		return { formatNumber, calendar, play, ellipsisVertical }
	}
})
</script>
