<template>
	<!-- <div class="flex flex-col items-end "> -->
	<router-link
		:class="`m-0   md:!w-[18rem] !w-[17rem]  ${colorClass}  rounded-xl  flex flex-col justify-between md:gap-2 gap-[1rem] box-border  pb-5 `"

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
				<ion-button class="btn-outline  text-primary   font-bold w-full  lg:min-w-[7.5rem] " :href="`/study/notes/${note.id}`">
					Start reading
				</ion-button>
			</div>
		</div>


	</router-link>

	<!-- <ion-text class="font-bold text-delete_red cursor-pointer" v-if="editState['note']" @click="deleteNote">
			Remove
		</ion-text> -->
	<!-- </div> -->
	<!-- <page-loading v-if="deleteLoading"/> -->
</template>

<script lang="ts">
import { calendar, play, ellipsisVertical } from 'ionicons/icons'
import { defineComponent } from 'vue'
import { formatNumber } from '@utils/commons'
// import ShowRatings from '@app/components/core/ShowRatings.vue'
import { NoteEntity } from '@modules/study'
import { useEditState } from '@app/composable/study/state'
import { useDeleteNote } from '@app/composable/study/notes'

export default defineComponent({
	name: 'NoteListCard',
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
			editState,  formatNumber,
			calendar, play, ellipsisVertical
		}
	},
})
</script>

<style lang="scss" scoped>
	ion-card {
		box-shadow: none !important;

	}
</style>
