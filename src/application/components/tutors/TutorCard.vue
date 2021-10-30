<template>
	<div
		class=" w-full  md:rounded-xl rounded-md flex flex-col md:gap-2 gap-1 cardPadding justify-center items-center"
	>
		<avatar :photo-url="tutor?.avatar?.link" :size="'46'" :has-dot="true"/>

		<div class="flex gap-2">
			<span class="font-bold normalText text-main_dark">
				{{ tutor.bio.fullName }}
			</span>
			<img src="../../assets/images/icons/verified.svg" alt="ask a question" class="w-[14px] md:w-4">
		</div>

		<show-ratings :rating="4"/>
	
		<a @click="requestNewSession"  class="mt-2 font-bold cursor-pointer normalText border-[1px] py-2 md:py-2 md:px-4 px-2 text-icon_inactive rounded-xl border-icon_inactive">
			Request a session
		</a>
		
	</div>	

</template>

<script lang="ts">
import ShowRatings from '@/application/components/core/ShowRatings.vue'
import { componentName, showModal } from  '../../composable/core/Modal'
import { UserEntity } from '@/modules/users'
import { defineAsyncComponent } from 'vue'
import { setNewSessionTutorIdBio } from '@/application/composable/sessions/sessions'
const Avatar = defineAsyncComponent(() => import('@/application/components/core/AvatarUser.vue'))

export default {
	name: 'TutorCard',
	components: { Avatar, ShowRatings },
	props:{
		style: {
			required: false,
			type: String,
		},
		showButton: {
			required: false,
			type: Boolean,
			default:false
		},
		tutor: {
			required: true,
			type: UserEntity
		}
	},
	setup(props: any) {

		const requestNewSession = () => {
			setNewSessionTutorIdBio({ id: props.tutor.id!, user: props.tutor.bio })
			componentName.value = 'requestSession'
			showModal.value = true
		}

		return {
			requestNewSession
		}
		
	}

}
</script>

<style scoped lang="scss">
ion-card{
	box-shadow: none !important;


}

</style>