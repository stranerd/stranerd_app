<template>
	<Justified>
		<div v-if="user">
			<div class="flex flex-col border-bottom-line gap-6 px-4 py-6">
				<div class="flex items-center gap-4">
					<Avatar :name="user.bio.fullName" :size="64" :src="user.bio.photo" />
					<div class="flex flex-col gap-2">
						<IonText class="text-heading font-bold flex gap-1 items-center">
							<span>{{ user.bio.fullName }}</span>
							<Verified :verified="user.isVerified" />
						</IonText>
						<template v-if="user.isCollege">
							<Institution :institutionId="user.school.institutionId"
								class="text-secondaryText text-sub font-bold" />
							<Department :departmentId="user.school.departmentId" :facultyId="user.school.facultyId"
								class="text-secondaryText text-sub" />
						</template>
					</div>
				</div>
				<IonText v-if="user.bio.description" class="text-sub">{{ user.bio.description }}</IonText>
				<div class="flex items-center justify-around gap-4 text-sub text-secondaryText">
					<span class="flex items-center gap-2">
						<IonIcon :icon="helpCircleOutline" class="text-heading" />
						<span>{{ formatNumber(user.meta.questions) }}</span>
					</span>
					<span class="flex items-center gap-2">
						<IonIcon :icon="readerOutline" class="text-heading" />
						<span>{{ formatNumber(user.meta.answers) }}</span>
					</span>
					<span class="flex items-center gap-2">
						<IonIcon :icon="checkmarkCircleOutline" class="text-heading" />
						<span>{{ formatNumber(user.meta.bestAnswers) }}</span>
					</span>
					<span class="flex items-center gap-2">
						<IonIcon :icon="flashOutline" class="text-heading" />
						<span>{{ formatNumber(user.meta.flashCards) }}</span>
					</span>
				</div>
				<IonButton v-if="isAdmin && id !== user.id" class="btn-primary w-full"
					@click="user.isVerified ? deVerifyUser(user) : verifyUser(user)">
					{{ user.isVerified ? 'Mark User Unverified' : 'Mark User Verified' }}
				</IonButton>
			</div>
			<div class="flex flex-col gap-4 py-6">
				<div class="flex items-center justify-between px-4 text-sub">
					<span v-for="(path, idx) in ['questions', 'answers', 'flashCards', 'documents']" :key="path"
						:class="{ 'bg-primaryBg !text-primaryText': path === tab, 'rounded-l-full': idx ===0, 'rounded-r-full': idx === 3 }"
						class="border border-primaryBg text-primaryBg py-1 px-3 capitalize w-full text-center"
						@click="tab = path">
						{{ path }}
					</span>
				</div>
				<UserQuestions v-if="tab === 'questions'" :user="user" />
				<UserAnswers v-if="tab === 'answers'" :user="user" />
				<UserFlashCards v-if="tab === 'flashCards'" :user="user" />
				<UserDocuments v-if="tab === 'documents'" :user="user" />
			</div>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import Justified from '@app/layouts/Justified.vue'
import Department from '@app/components/school/departments/Department.vue'
import Institution from '@app/components/school/institutions/Institution.vue'
import { useRoute } from 'vue-router'
import { useUser } from '@app/composable/users/users'
import { useVerifiedRoles } from '@app/composable/users/roles/verified'
import { checkmarkCircleOutline, flashOutline, helpCircleOutline, readerOutline } from 'ionicons/icons'
import { formatNumber } from '@utils/commons'
import UserQuestions from '@app/components/users/users/UserQuestions.vue'
import UserAnswers from '@app/components/users/users/UserAnswers.vue'
import UserFlashCards from '@app/components/users/users/UserFlashCards.vue'
import UserDocuments from '@app/components/users/users/UserDocuments.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'UsersUserId',
	components: { Justified, Department, Institution, UserQuestions, UserAnswers, UserFlashCards, UserDocuments },
	beforeRouteEnter: generateMiddlewares([async ({ to }) => {
		if (to.params.userId === useAuth().id.value) return '/account'
	}]),
	setup () {
		useRouteMeta('Profile')
		const { id, isAdmin } = useAuth()
		const { userId } = useRoute().params
		const { user, loading, error } = useUser(userId as string)
		const { loading: verifiedLoading, verifyUser, deVerifyUser } = useVerifiedRoles()
		const tab = ref('questions')
		return {
			id, isAdmin, user, loading, error, formatNumber,
			verifiedLoading, verifyUser, deVerifyUser, tab,
			helpCircleOutline, readerOutline, checkmarkCircleOutline, flashOutline
		}
	}
})
</script>
