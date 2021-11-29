<template>
	<router-link :to="`/study/video/${video.id}`"
		:class="`m-0  h-[18rem]  md:!w-[18rem] !w-[17rem]  ${bgColor(index)}  rounded-xl  flex flex-col md:gap-2 gap-[1rem] box-border justify-between  pb-5 border border-faded_gray lg:border-0`"
	>
		<div class="flex flex-col items-center justify-between w-full">
			<div class="bg-faded_gray min-h-[10.5rem] min-w-[57px] w-full grid place-items-center rounded-md ">
				<div class="bg-white rounded-full grid place-items-center h-16 w-16">
					<ion-icon
						class="text-faded_gray text-3xl"
						:icon="play"
					/>
				</div>
		
			</div>
            
			<ion-text class="text-sm text-main_dark font-bold p-5 pb-1 w-full text-left">
				{{video.title}}
			</ion-text> 
		</div>

		<div class="w-full flex items-center justify-start  px-5">
			<!-- <ShowRatings :rating="4"/> -->

			<div class="flex items-center">
				<Avatar :size="24" :src="video.userBio.photo"/>
				<ion-text class="text-xs font-bold text-main_dark ml-3">
					{{video.userBio.firstName}}
				</ion-text>
				
			</div>
		</div>

	</router-link>
</template>

<script lang="ts">
import { calendar, play } from 'ionicons/icons'
import { defineComponent,  } from 'vue'
import { formatNumber } from '@utils/commons'
// import ShowRatings from '@app/components/core/ShowRatings.vue'
import Avatar from '@app/components/core/Avatar.vue'
import { VideoEntity } from '@root/modules/study'
import { useEditState } from '@app/composable/study/state'
import { useDeleteVideo } from '@root/application/composable/study/videos'

export default defineComponent({
	name: 'VideoCard',
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		video:{
			type:VideoEntity,
			required:true
		},
		index:{
			type:Number,
			required:false
		}
	},
	setup(props) {
		const {editState} = useEditState()

		const {loading: deleteLoading, error, deleteVideo} = useDeleteVideo(props.video.id)

		const bgColor = (index: any)=>{
			if (index === 1 ) return 'bg-light_green'
			else if (index ===2) return 'bg-tinted_pink'
			else if(index === 3) return 'bg-butter_yellow'
		}
		return {
			deleteVideo,	deleteLoading,
			editState, bgColor, formatNumber,
			calendar, play
		}
	},
	components: {  Avatar }
})
</script>

<style lang="scss" scoped>
	ion-card {
		box-shadow: none !important;

	}
</style>
