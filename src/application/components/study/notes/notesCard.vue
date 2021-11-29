<template>
	<!-- <div class="flex flex-col items-end "> -->
	<router-link :to="`/study/note/${note.id}`"

		:class="`m-0  h-[18rem] md:!w-[18rem] !w-[17rem]  ${bgColor(index)}  rounded-xl  flex flex-col justify-between md:gap-2 gap-[1rem] box-border  pb-5 border border-faded_gray lg:border-0`"
	>
		<div class="flex flex-col items-center justify-between w-full">
			<template v-if="note.preview">
				<img :src="note.preview" class="bg-faded_gray min-h-[10.5rem] min-w-[57px] w-full  rounded-md "/>
			</template>
			<div class="bg-faded_gray min-h-[10.5rem] min-w-[57px] w-full grid place-items-center rounded-md " v-else>
				<ion-text class="text-2xl text-white font-bold p-5 pb-2">
					PREVIEW
				</ion-text>
			</div>
            
			<ion-text class="text-sm text-main_dark font-bold p-5 pb-1 w-full text-left">
				{{note.title}}
			</ion-text> 
		</div>

		<div class="w-full flex items-center justify-between  px-5">
			<ShowRatings :rating="4"/>

			<div class="flex items-center">
				<ion-text class="text-xs font-bold text-main_dark mr-3">
					{{note.userBio.firstName}}
				</ion-text>
				<Avatar :size="24" :src="note.userBio.photo"/>
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
import { calendar, play } from 'ionicons/icons'
import { defineComponent,  } from 'vue'
import { formatNumber } from '@utils/commons'
import ShowRatings from '@app/components/core/ShowRatings.vue'
import Avatar from '@app/components/core/Avatar.vue'
import { NoteEntity } from '@root/modules/study'
import { useEditState } from '@app/composable/study/state'
import { useDeleteNote } from '@root/application/composable/study/notes'

export default defineComponent({
	name: 'TutorCard',
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		note:{
			type:NoteEntity,
			required:true
		},
		index:{
			type:Number,
			required:false
		}
	},
	setup(props) {
		const {editState} = useEditState()

		const {loading: deleteLoading, error, deleteNote} = useDeleteNote(props.note.id)

		const bgColor = (index: any)=>{
			if (index === 1 ) return 'bg-light_green'
			else if (index ===2) return 'bg-tinted_pink'
			else if(index === 3) return 'bg-butter_yellow'
		}
		return {
			deleteNote,	deleteLoading,
			editState, bgColor, formatNumber,
			calendar, play
		}
	},
	components: { ShowRatings, Avatar }
})
</script>

<style lang="scss" scoped>
	ion-card {
		box-shadow: none !important;

	}
</style>
