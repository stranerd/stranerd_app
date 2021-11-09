<template>
	<div
		class=" w-full  md:rounded-xl rounded-md flex flex-col md:gap-2 gap-1 cardPadding justify-center items-center"
	>
		<avatar :has-dot="true" :photo-url="tutor?.avatar?.link" :size="'46'" />

		<div class="flex gap-2">
			<span class="font-bold normalText text-main_dark">
				{{ tutor.bio.fullName }}
			</span>
			<img alt="ask a question" class="w-[14px] md:w-4" src="../../../assets/images/icons/verified.svg">
		</div>

		<show-ratings :rating="4" />

		<a class="mt-2 font-bold cursor-pointer text-sm border-[1px] py-2  px-2 text-icon_inactive rounded-xl border-icon_inactive"
			@click="requestNewSession">
			Request a session
		</a>

	</div>

</template>

<script lang="ts">
import ShowRatings from '@app/components/core/ShowRatings.vue'
import { UserEntity } from '@modules/users'
import { defineAsyncComponent } from 'vue'
import { setNewSessionTutorIdBio } from '@app/composable/sessions/sessions'
import { useSessionModal } from '@app/composable/core/modals'

const Avatar = defineAsyncComponent(() => import('@app/components/core/AvatarUser.vue'))

export default {
	name: 'TutorCard',
	components: { Avatar, ShowRatings },
	props: {
		style: {
			required: false,
			type: String
		},
		showButton: {
			required: false,
			type: Boolean,
			default: false
		},
		tutor: {
			required: true,
			type: UserEntity
		}
	},
	setup (props: any) {

		const requestNewSession = () => {
			setNewSessionTutorIdBio({ id: props.tutor.id!, user: props.tutor.bio })
			useSessionModal().openCreateSession()

		}

		return {
			requestNewSession
		}

	}

}
</script>

<style lang="scss" scoped>
	ion-card {
		box-shadow: none !important;


	}

</style>
