<template>
	<router-link
		:class="`m-0 w-full bg-white rounded-xl flex flex-col justify-center md:gap-2 gap-[1rem] box-border py-4`"
		:to="`/study/notes/${note.id}`"
	>
		<div class="flex flex-col items-center justify-between w-full">
			<div class="w-full justify-between items-start flex px-4 pt-3 pb-1 ">
				<div class="w-full flex">
					<img :src="note.preview.link"
						class="bg-faded_gray  h-[5.375rem] w-[4.5rem] rounded-md object-cover " />
					<div class="text-base text-main_dark font-bold  text-left flex-col flex ml-4">
						<ion-text>
							{{ note.title }}
						</ion-text>
						<ion-text class="text-gray">
							Mathematics
							<!-- {{ note.subjecti }} -->
						</ion-text>
					</div>
				</div>
				<ion-icon :icon="ellipsisVertical" class="text-gray text-2xl" />
			</div>
			<div class="w-full flex items-center justify-center  px-4 mt-2 pb-4">
				<ion-button :href="`/study/notes/${note.id}`"
					class="btn-outline text-primary font-bold w-full lg:min-w-[7.5rem] ">
					Start reading
				</ion-button>
			</div>
		</div>
	</router-link>
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

<style lang="scss" scoped>
	ion-card {
		box-shadow: none !important;

	}
</style>
