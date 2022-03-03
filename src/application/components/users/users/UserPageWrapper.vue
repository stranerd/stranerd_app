<template>
	<Justified>
		<div class="text-body h-full md:bg-new_gray">
			<PageLoading v-if="loading" />
			<PageLoading v-if="verifiedLoading" />
			<template v-if="user">
				<div class="blueTop pt-4 px-4">
					<div class="w-full md:w-10/12 lg:w-6/12 mx-auto">
						<div class="text-body w-full flex gap-2 md:gap-4 items-center mb-4">
							<div class="relative border-white border-4 rounded-full">
								<Avatar :id="user.id" :name="user.bio.firstName" :size="72" :src="user.avatar"
									class="md:hidden" />
								<Avatar :id="user.id" :name="user.bio.firstName" :size="90" :src="user.avatar"
									class="hidden md:block"
									color="#C7D6E3" />
							</div>
							<div class="flex flex-col justify-start items-start gap-1">
								<h2 class="lg:text-xl text-base font-bold text-white flex gap-1 items-center">
									<span>{{ user.fullName }}</span>
									<IonIcon v-if="user.isVerified" :icon="checkmarkCircleOutline" color="white" />
								</h2>
								<Tag :index="user.rank.level - 1" :secondary="true" :tag="user.rank.id" />
								<IonButton v-if="isAdmin && id !== user.id" class="btn-white" size="small"
									@click="user.isVerified ? deVerifyUser(user) : verifyUser(user)">
									{{ user.isVerified ? 'Mark User Unverified' : 'Mark User Verified' }}
								</IonButton>
							</div>
						</div>
						<div class="nav-scroll">
							<router-link :to="`/users/${user.id}/questions`"
								class="pb-2 cursor-pointer"
								exact-active-class="border-b-4 text-white border-white">
								Questions
							</router-link>
							<router-link :to="`/users/${user.id}/answers`"
								class="pb-2 cursor-pointer"
								exact-active-class="border-b-4 text-white border-white">
								Answers
							</router-link>
							<router-link :to="`/users/${user.id}/flashCards`"
								class="pb-2 cursor-pointer"
								exact-active-class="border-b-4 text-white border-white">
								FlashCards
							</router-link>
							<router-link :to="`/users/${user.id}/notes`"
								class="pb-2 cursor-pointer"
								exact-active-class="border-b-4 text-white border-white">
								Notes
							</router-link>
							<router-link :to="`/users/${user.id}/videos`"
								class="pb-2 cursor-pointer"
								exact-active-class="border-b-4 text-white border-white">
								Videos
							</router-link>
							<router-link :to="`/users/${user.id}/sets`"
								class="pb-2 cursor-pointer"
								exact-active-class="border-b-4 text-white border-white">
								Saved
							</router-link>
							<router-link :to="`/users/${user.id}/`" class="pb-2 cursor-pointer"
								exact-active-class="border-b-4 text-white border-white">
								About
							</router-link>
						</div>
					</div>
				</div>
				<div class="w-full md:w-10/12 lg:w-6/12 mx-auto p-4 md:mt-8">
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
			verifiedLoading, verifyUser, deVerifyUser
		}
	}
})
</script>
