<template>
	<router-link
		:class="`m-0  w-full  ${colorClass}  rounded-xl  flex flex-col justify-between md:gap-2 gap-[1rem] box-border  pb-5 `"

		:to="`/study/notes/${note.id}`"
	>
		<div class="flex flex-col items-center justify-between w-full">
			<template v-if="note.preview">
				<img :src="note.preview.link" class="bg-faded_gray  h-[10.9rem] min-w-[57px] w-full  rounded-md " />
			</template>
			<div v-else class="bg-faded_gray min-h-[10.5rem] min-w-[57px] w-full grid place-items-center rounded-md ">
				<ion-text class="text-2xl text-white font-bold p-5 pb-2">
					PREVIEW
				</ion-text>
			</div>

			<div class="w-full justify-between items-center flex px-4 pt-3 pb-1 w-full">
				<div class="text-base text-main_dark font-bold  text-left flex-col flex">
					<ion-text class="text-gray">
						Mathematics
					</ion-text>
					<ion-text>
						{{ note.title }}
					</ion-text>
				</div>


				<ion-icon

					:icon="ellipsisVertical"
					class="text-gray text-2xl"
				/>

			</div>


			<div class="w-full flex items-center justify-center  px-4 mt-2 pb-4">
				<ion-button :href="`/study/notes/${note.id}`"
					class="btn-outline  text-primary   font-bold w-full  lg:min-w-[7.5rem] ">
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
import { useEditState } from '@app/composable/study/state'
import { useDeleteNote } from '@app/composable/study/notes'

export default defineComponent({
	name: 'StudyNoteListCard',
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		note: {
			type: NoteEntity,
			required: true
		},
		index: {
			type: Number,
			required: false
		}
	},
	setup (props) {
		const { editState } = useEditState()
		const { loading: deleteLoading, error, deleteNote } = useDeleteNote(props.note.id)
		return {
			deleteNote, deleteLoading,
			editState, formatNumber,
			calendar, play, ellipsisVertical
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-card {
		box-shadow: none !important;

	}
</style>
