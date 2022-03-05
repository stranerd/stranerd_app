<template>
	<Justified>
		<div class="text-body h-full md:bg-new_gray w-full lg:w-8/12 mx-auto lg:mt-6">
			<PageLoading v-if="loading" />
			<PageLoading v-if="verifiedLoading" />
			<template v-if="user">
				<div class="flex flex-col w-full rounded-xl border-bottom-line">
					<div class="bg-orange lg:rounded-t-xl h-11 md:h-32" />
					<div class="bg-white rounded-b-xl px-4 flex flex-col">
						<Avatar :id="user.id" :name="user.bio.firstName" :size="72" :src="user.avatar"
							class="md:hidden -mt-9" />
						<Avatar :id="user.id" :name="user.bio.firstName" :size="96" :src="user.avatar"
							class="hidden md:inline -mt-12" />
						<h2 class="md:text-xl text-base font-bold text-main_dark flex gap-1 items-center mt-4 mb-1">
							<span>{{ user.fullName }}</span>
							<IonIcon v-if="user.isVerified" :icon="checkmarkCircleOutline" color="white" />
						</h2>
						<div class="flex items-start mb-1 gap-2">
							<Tag :index="6" :tag="`${user.score} pts`" class="font-bold" />
							<Tag :index="user.rank.level" :secondary="true" :tag="user.rank.id" class="font-bold" />
						</div>

						<IonButton v-if="isAdmin && id !== user.id" class="btn-white" size="small"
							@click="user.isVerified ? deVerifyUser(user) : verifyUser(user)">
							{{ user.isVerified ? 'Mark User Unverified' : 'Mark User Verified' }}
						</IonButton>
						<span v-if="user.description" class="text-main_dark text-sm md:text-base">{{
							user.description
						}}</span>
						<span class="text-gray text-xs">Nerd since {{ formatTime(user.dates.createdAt) }}</span>

						<div
							class="nav-scroll mt-4">
							<router-link :to="`/users/${user.id}/questions`">
								Questions
							</router-link>
							<router-link :to="`/users/${user.id}/answers`">
								Answers
							</router-link>
							<router-link :to="`/users/${user.id}/flashCards`">
								FlashCards
							</router-link>
							<router-link :to="`/users/${user.id}/notes`">
								Notes
							</router-link>
							<router-link :to="`/users/${user.id}/videos`">
								Videos
							</router-link>
							<router-link :to="`/users/${user.id}/sets`">
								Saved
							</router-link>
							<router-link :to="`/users/${user.id}/`">
								About
							</router-link>
						</div>
					</div>
				</div>

				<div class="md:mt-6 md:px-4 lg:px-0">
					<slot :user="user" />
				</div>
			</template>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageLoading from '@app/components/core/PageLoading.vue'
import Justified from '@app/layouts/Justified.vue'
import { useUser } from '@app/composable/users/users'
import { useRoute } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'
import { formatTime } from '@utils/dates'
import { checkmarkCircleOutline } from 'ionicons/icons'
import { useVerifiedRoles } from '@app/composable/users/roles/verified'

export default defineComponent({
	name: 'UserPageWrapper',
	components: { PageLoading, Justified },
	setup () {
		const { id, isAdmin } = useAuth()
		const { userId } = useRoute().params
		const { user, loading, error } = useUser(userId as string)
		const { loading: verifiedLoading, verifyUser, deVerifyUser } = useVerifiedRoles()
		return {
			id, isAdmin, user, loading, error, checkmarkCircleOutline,
			verifiedLoading, verifyUser, deVerifyUser, formatTime
		}
	}
})
</script>
