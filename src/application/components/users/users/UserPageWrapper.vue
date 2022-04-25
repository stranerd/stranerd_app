<template>
	<Justified>
		<div class="h-full md:bg-new_gray w-full lg:w-8/12 mx-auto lg:mt-6">
			<PageLoading v-if="loading" />
			<PageLoading v-if="verifiedLoading" />
			<template v-if="user">
				<div class="flex flex-col w-full rounded-xl border-bottom-line bg-white">
					<div class="flex flex-col">
						<CoverAvatar :src="user.bio.coverPhoto" class="h-20" />
						<div class="px-4 flex justify-between gap-2">
							<Avatar :name="user.bio.fullName" :size="80" :src="user.bio.photo"
								class="relative top-[-40px] -mb-10" />
							<div v-if="user.id === id" class="flex gap-1 mt-2">
								<router-link
									class="py-1 px-4 border border-primary text-primary rounded-full text-sub flex justify-center items-center"
									to="/settings/profile">
									Edit Profile
								</router-link>
							</div>
						</div>
					</div>
					<div class="rounded-b-xl px-4 flex flex-col gap-1 md:gap-2 mt-2">
						<h2 class="text-heading font-bold text-main_dark flex gap-1 items-center">
							<span>{{ user.bio.fullName }}</span>
							<IonIcon v-if="user.isVerified" :icon="checkmarkCircleOutline" color="white" />
						</h2>
						<div class="flex items-start gap-2">
							<Tag :index="6" :tag="`${user.formattedScore} pts`" class="font-bold" />
							<Tag :index="user.rank.level" :secondary="true" :tag="user.rank.id" class="font-bold" />
						</div>

						<IonButton v-if="isAdmin && id !== user.id" class="btn-primary w-full" size="small"
							@click="user.isVerified ? deVerifyUser(user) : verifyUser(user)">
							{{ user.isVerified ? 'Mark User Unverified' : 'Mark User Verified' }}
						</IonButton>
						<span v-if="user.isCollege" class="text-sub text-gray">
							<Institution :institutionId="user.school.institutionId" /> - <Department
								:departmentId="user.school.departmentId"
								:facultyid="user.school.facultyId" />
						</span>
						<span v-else-if="user.isAspirant" class="text-gray text-sub">
							<IonIcon :icon="receiptOutline" class="mr-2 text-cyan text-heading" />
							<span v-for="(exam, index) in user.school.exams" :key="exam.institutionId">
								<Institution :institutionId="exam.institutionId" />
								<span v-if="index !== user.school.exams.length -1">,&nbsp;</span>
							</span>
						</span>
						<span v-if="user.bio.description" class="text-sub">
							{{ user.bio.description }}
						</span>
						<span class="text-gray text-sub">Joined {{ formatTime(user.dates.createdAt) }}</span>
						<div class="nav-scroll mt-2">
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
				<div class="md:p-4 lg:px-0">
					<slot :user="user" />
				</div>
			</template>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { useUser } from '@app/composable/users/users'
import { useRoute } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'
import { formatTime } from '@utils/dates'
import { checkmarkCircleOutline, receiptOutline } from 'ionicons/icons'
import { useVerifiedRoles } from '@app/composable/users/roles/verified'
import CoverAvatar from '@app/components/core/CoverAvatar.vue'
import Institution from '@app/components/school/institutions/Institution.vue'
import Department from '@app/components/school/departments/Department.vue'

export default defineComponent({
	name: 'UserPageWrapper',
	components: { CoverAvatar, Justified, Department, Institution },
	setup () {
		const { id, isAdmin } = useAuth()
		const { userId } = useRoute().params
		const { user, loading, error } = useUser(userId as string)
		const { loading: verifiedLoading, verifyUser, deVerifyUser } = useVerifiedRoles()
		return {
			id, isAdmin, user, loading, error, checkmarkCircleOutline, receiptOutline,
			verifiedLoading, verifyUser, deVerifyUser, formatTime
		}
	}
})
</script>
