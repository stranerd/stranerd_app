<template>
	<DefaultLayout>
		<div v-if="user">
			<div class="flex flex-col gap-6 px-4 py-6">
				<div class="flex items-center gap-6">
					<Avatar :name="user.bio.fullName" :size="64" :src="user.bio.photo" />
					<div class="flex items-center justify-between w-full text-secondaryText">
						<div class="flex items-center gap-2">
							<IonIcon :icon="podiumOutline" class="text-heading2" />
							<IonText class="flex-col flex">
								<span class="text-heading">{{ formatNumber(user.score, 1) }}</span>
								<span class="text-sub">Points</span>
							</IonText>
						</div>
						<div class="flex items-center gap-2">
							<IonIcon :icon="linkOutline" class="text-heading2" />
							<IonText class="flex-col flex">
								<span class="text-heading">{{ formatNumber(user.meta.connects) }}</span>
								<span class="text-sub">Connects</span>
							</IonText>
						</div>
						<div class="flex items-center gap-2">
							<IonIcon :icon="checkmarkCircleOutline" class="text-heading2" />
							<IonText class="flex-col flex">
								<span class="text-heading">{{ formatNumber(user.meta.bestAnswers) }}</span>
								<span class="text-sub">Best ans</span>
							</IonText>
						</div>
					</div>
				</div>
				<div class="flex flex-col gap-1">
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
					<IonText v-if="user.bio.description" class="mt-4">{{ user.bio.description }}</IonText>
				</div>

				<IonButton class="btn-primary w-full">
					<IonIcon :icon="linkOutline" class="text-heading3 mr-2" />
					Connect
				</IonButton>

				<IonButton v-if="isAdmin && id !== user.id" class="btn-primary w-full"
					@click="user.isVerified ? deVerifyUser(user) : verifyUser(user)">
					{{ user.isVerified ? 'Mark User Unverified' : 'Mark User Verified' }}
				</IonButton>
			</div>
			<div class="flex flex-col gap-4 py-6">
				<div class="flex items-center justify-between">
					<span v-for="path in [
							{ name: 'questions', icon: helpCircleOutline },
							{ name: 'answers', icon: checkmarkCircleOutline },
							{ name: 'flashCards', icon: flashOutline },
							{ name: 'documents', icon: readerOutline }
						]" :key="path.name"
						:class="{ 'border-b-2 !text-primaryBg !border-primaryBg': path.name === tab}"
						class="border-b border-itemBg text-secondaryText p-4 capitalize w-full flex justify-center items-center gap-2"
						@click="tab = path.name">
						<IonIcon :icon="path.icon" class="text-heading" />
						<span>{{ formatNumber(user.meta[path.name]) }}</span>
					</span>
				</div>
				<UserQuestions v-if="tab === 'questions'" :user="user" />
				<UserAnswers v-if="tab === 'answers'" :user="user" />
				<UserFlashCards v-if="tab === 'flashCards'" :user="user" />
				<UserDocuments v-if="tab === 'documents'" :user="user" />
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import Department from '@app/components/school/departments/Department.vue'
import Institution from '@app/components/school/institutions/Institution.vue'
import { useRoute } from 'vue-router'
import { useUser } from '@app/composable/users/users'
import { useVerifiedRoles } from '@app/composable/users/roles/verified'
import {
	checkmarkCircleOutline,
	flashOutline,
	helpCircleOutline,
	linkOutline,
	podiumOutline,
	readerOutline
} from 'ionicons/icons'
import { formatNumber } from '@utils/commons'
import UserQuestions from '@app/components/users/users/UserQuestions.vue'
import UserAnswers from '@app/components/users/users/UserAnswers.vue'
import UserFlashCards from '@app/components/users/users/UserFlashCards.vue'
import UserDocuments from '@app/components/users/users/UserDocuments.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'UsersUserId',
	components: { Department, Institution, UserQuestions, UserAnswers, UserFlashCards, UserDocuments },
	beforeRouteEnter: generateMiddlewares([async ({ to }) => {
		if (to.params.userId === useAuth().id.value) return '/account'
	}]),
	setup () {
		useRouteMeta('Profile', {})
		const { id, isAdmin } = useAuth()
		const { userId } = useRoute().params
		const { user, loading, error } = useUser(userId as string)
		const { loading: verifiedLoading, verifyUser, deVerifyUser } = useVerifiedRoles()
		const tab = ref('questions')
		return {
			id, isAdmin, user, loading, error, formatNumber,
			verifiedLoading, verifyUser, deVerifyUser, tab, podiumOutline, linkOutline,
			helpCircleOutline, readerOutline, checkmarkCircleOutline, flashOutline
		}
	}
})
</script>
