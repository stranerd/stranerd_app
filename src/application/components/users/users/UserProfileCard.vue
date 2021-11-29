<template>
	<div class="bg-primary pt-8">
		<div class="w-full col-span-12 mb-4 flex-col flex gap-2 items-center justify-center normalText ">
			<div class="relative">
				<Avatar :id="user.id" :size="90" :src="user.avatar" color="#C7D6E3"/>
				<!-- <ion-icon
					v-if="showUpload"
					:icon="camera"
					class="text-primary absolute rounded-full right-1 bottom-1 text-lg bg-white p-1 border border-primary cursor-pointer"
					@click="openUploadModal()"

				/> -->
			</div>

			<h2 class="headings font-bold text-white">{{ user.fullName }}</h2>
			<span
				class="py-1 px-4 rounded-md border-faded_gray border-[1px] font-bold text-icon_inactive bg-light_green">
				{{ user.rank.id }}
			</span>

		</div>
		<div class="grid grid-cols-12 border-b-[1px] border-faded_gray my-5 lg:rounded-br-3xl lg:rounded-bl-3xl">
			<div
				class="col-span-12 sm:place-content-center md:col-start-2 md:col-end-12 lg:col-start-3 lg:col-end-11 lg:justify-center lg:items-center flex flex-row  px-3 gap-5 text-faded_gray font-bold  whitespace-normal overflow-x-auto">
				<router-link :to="`/users/${user.id}`" class="pb-2 pr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					Dashboard
				</router-link>
				<router-link :to="`/users/${user.id}/bio`" class="pb-2 pr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					Bio
				</router-link>
				<router-link :to="`/users/${user.id}/questions`"
					class="pb-2 pr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					Questions
				</router-link>
				<router-link :to="`/users/${user.id}/answers`"
					class="pb-2 pr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					Answers
				</router-link>
				<router-link v-if="id === user.id" :to="`/users/${user.id}/settings`"
					class="pb-2 pr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					Settings
				</router-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import Avatar from '@app/components/core/Avatar.vue'
import { setNewSessionTutorIdBio } from '@app/composable/sessions/sessions'
import { useSessionModal, useUploadModal } from '@app/composable/core/modals'
import { UserEntity } from '@modules/users'
import { camera } from 'ionicons/icons'

export default defineComponent({
	name: 'UserProfileCard',
	components: { Avatar },
	props: {
		user: {
			required: true,
			type: UserEntity
		}
	},
	setup (props) {
		const { id, user: authUser } = useAuth()
		const canRequestSession = computed({
			get: () => authUser.value &&
				authUser.value.id !== props.user.id &&
				authUser.value.canRequestSessions &&
				props.user.canHostSessions,
			set: () => {
			}
		})

		const showUpload = computed({
			get: () => authUser.value?.id === props.user.id,
			set: () => {
			}
		})

		const requestNewSession = () => {
			setNewSessionTutorIdBio({ id: props.user.id, user: props.user.bio })
			useSessionModal().openCreateSession()
		}

	

		return {
			id, requestNewSession, canRequestSession, camera, showUpload
		}
	}
})
</script>
