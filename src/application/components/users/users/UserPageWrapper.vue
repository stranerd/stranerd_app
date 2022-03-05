<template>
	<Justified>
		<div class="text-body h-full md:bg-new_gray">
			<PageLoading v-if="loading" />
			<PageLoading v-if="verifiedLoading" />
			<template v-if="user">
				<div class="flex justify-center w-full">
					<div class="flex flex-col w-full md:w-10/12 lg:w-7/12 rounded-xl pt-0 md:pt-6">
						<div class="bg-orange md:rounded-t-xl h-11 md:h-32"/>
						<div class="bg-white rounded-b-xl px-4 flex flex-col ">
							<Avatar :id="user.id" :size="72" :src="user.avatar" class="md:hidden -mt-9" color="#C7D6E3" />
							<Avatar :id="user.id" :size="96" :src="user.avatar" class="hidden md:block -mt-12"
								color="#C7D6E3" />
							<h2 class="md:text-xl text-base font-bold text-main_dark flex gap-1 items-center mt-4 mb-1">
								<span>{{ user.fullName }}</span>
								<IonIcon v-if="user.isVerified" :icon="checkmarkCircleOutline" color="white" />
							</h2>
							<div class="flex items-start mb-1">
								<Tag :index="6"  :tag="`${user.score} pts`" className="font-bold rounded-2xl mr-2 "   />
								<Tag :index="user.rank.level - 1" :secondary="true" :tag="user.rank.id" className="font-bold rounded-2xl "  />
							</div>
						
							<IonButton v-if="isAdmin && id !== user.id" class="btn-white" size="small"
								@click="user.isVerified ? deVerifyUser(user) : verifyUser(user)">
								{{ user.isVerified ? 'Mark User Unverified' : 'Mark User Verified' }}
							</IonButton>
							<span class="text-main_dark text-base">{{ user.description || 'N/A' }}</span>
							<span class="text-gray text-xs">Nerd since {{ formatTime(user.dates.createdAt) }}</span>


							<div class="flex justify-between items-center pt-4 md:border-0 border-b border-new_gray px-4 -mx-4">
								<router-link :to="`/users/${user.id}/questions`"
									class="pb-2 cursor-pointer"
									exact-active-class="border-b-2 text-primary border-primary">
									Questions
								</router-link>
								<router-link :to="`/users/${user.id}/answers`"
									class="pb-2 cursor-pointer"
									exact-active-class="border-b-2 text-primary border-primary">
									Answers
								</router-link>
								<router-link :to="`/users/${user.id}/flashCards`"
									class="pb-2 cursor-pointer"
									exact-active-class="border-b-2 text-primary border-primary">
									FlashCards
								</router-link>
								<router-link :to="`/users/${user.id}/notes`"
									class="pb-2 cursor-pointer"
									exact-active-class="border-b-2 text-primary border-primary">
									Notes
								</router-link>
								<router-link :to="`/users/${user.id}/videos`"
									class="pb-2 cursor-pointer"
									exact-active-class="border-b-2 text-primary border-primary">
									Videos
								</router-link>
								<router-link :to="`/users/${user.id}/sets`"
									class="pb-2 cursor-pointer"
									exact-active-class="border-b-2 text-primary border-primary">
									Saved
								</router-link>
								<router-link :to="`/users/${user.id}/`" class="pb-2 cursor-pointer"
									exact-active-class="border-b-2 text-primary border-primary">
									About
								</router-link>
							</div>
						</div>
					</div>
				</div>
		
				<div class="w-full md:w-10/12 lg:w-7/12 mx-auto md:mt-6">
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
