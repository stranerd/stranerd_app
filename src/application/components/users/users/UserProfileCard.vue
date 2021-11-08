<template>
	<div>
		<PageLoading v-if="loading" />
		<div v-if="user" class="w-full col-span-12 mb-4 flex-col flex gap-2 items-center justify-center normalText">
			<Avatar :size="90" :src="user.avatar" />
			<h2 class="headings font-bold text-dark_gray">{{ user.fullName }}</h2>
			<span
				class="py-1 px-4 rounded-md border-faded_gray border-[1px] font-bold text-icon_inactive bg-light_green">
				{{ user.rank.id }}
			</span>
			<ShowRatings :rating="user.averageRating" />
			<button v-if="canRequestSession" class="actionBtn mt-2 text-white" @click="requestNewSession">
				Request a session
			</button>
		</div>
		<div class="grid grid-cols-12 border-b-[1px] border-faded_gray my-5 lg:rounded-br-3xl lg:rounded-bl-3xl">
			<div
				class="col-span-12 sm:place-content-center md:col-start-2 md:col-end-12 lg:col-start-3 lg:col-end-11 lg:justify-center lg:items-center flex flex-row  px-3 headings gap-5 text-icon_inactive font-bold  whitespace-normal overflow-x-auto">
				<router-link :to="`/users/${userId}/`" class="pb-2 pr-3 cursor-pointer"
					exact-active-class="border-b-4 text-dark_gray border-primary">
					Dashboard
				</router-link>
				<router-link :to="`/users/${userId}/bio`" class="pb-2 pr-3 cursor-pointer"
					exact-active-class="border-b-4 text-dark_gray border-primary">
					Bio
				</router-link>
				<router-link :to="`/users/${userId}/questions`"
					class="pb-2 pr-3 cursor-pointer"
					exact-active-class="border-b-4 text-dark_gray border-primary">
					Questions
				</router-link>
				<router-link :to="`/users/${userId}/answers`"
					class="pb-2 pr-3 cursor-pointer"
					exact-active-class="border-b-4 text-dark_gray border-primary">
					Answers
				</router-link>
				<router-link :to="`/users/${userId}/answers`"
					class="pb-2 pr-3 cursor-pointer"
					exact-active-class="border-b-4 text-dark_gray border-primary">
					Answers
				</router-link>
				<router-link :to="`/users/${userId}/answers`"
					class="pb-2 pr-3 cursor-pointer"
					exact-active-class="border-b-4 text-dark_gray border-primary">
					Answers
				</router-link>
				<router-link v-if="id === userId" :to="`/users/${userId}/settings`"
					class="pb-2 pr-3 cursor-pointer"
					exact-active-class="border-b-4 text-dark_gray border-primary">
					Settings
				</router-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Avatar from '@app/components/core/Avatar.vue'
import { useAuth } from '@app/composable/auth/auth'
import { useUser } from '@app/composable/users/user'
import ShowRatings from '@app/components/core/ShowRatings.vue'
import { setNewSessionTutorIdBio } from '@app/composable/sessions/sessions'
import PageLoading from '@app/components/core/PageLoading.vue'
import { useSessionModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'UserProfileCard',
	components: {
		Avatar,
		ShowRatings,
		PageLoading

	},
	props: {
		userId: {
			required: true,
			type: String
		}
	},
	setup (props) {
		const { id, user: authUser } = useAuth()
		const { error, loading, user } = useUser(props.userId)
		const canRequestSession = computed({
			get: () => authUser.value &&
				authUser.value.id !== user.value?.id &&
				authUser.value.canRequestSessions &&
				user.value?.canHostSessions,
			set: () => {
			}
		})

		const requestNewSession = () => {
			setNewSessionTutorIdBio({ id: user.value?.id!, user: user.value?.bio! })
			useSessionModal().openCreateSession()
		}

		return {
			id,
			error,
			loading,
			user,
			requestNewSession,
			canRequestSession
		}
	}
})
</script>
