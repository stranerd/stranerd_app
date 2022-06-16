<template>
	<DefaultLayout>
		<div v-if="user">
			<div class="flex flex-col border-bottom-line gap-4 px-4 py-6">
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
					<template v-if="isUserCollege(user)">
						<Institution :institutionId="user.school.institutionId"
							class="text-secondaryText text-sub font-bold" />
						<Department :departmentId="user.school.departmentId" :facultyId="user.school.facultyId"
							class="text-secondaryText text-sub" />
					</template>
					<IonText v-if="user.bio.description" class="mt-4">{{ user.bio.description }}</IonText>
				</div>
			</div>

			<div v-if="0" class="border-bottom-line py-6 px-4 flex items-center gap-2">
				<IonIcon :icon="helpCircleOutline" class="text-heading" />
				<IonText>You have 5 questions to ask</IonText>
				<IonIcon :icon="cartOutline" class="text-heading ml-auto" />
			</div>

			<div class="flex flex-col gap-6 px-4 py-8 text-secondaryText">
				<router-link v-for="{ label, route, icon } in [
					{ label: 'Stats', route: '/account/stats', icon: gridOutline },
					{ label: 'Questions', route: '/account/questions', icon: helpCircleOutline },
					{ label: 'Answers', route: '/account/answers', icon: readerOutline },
					{ label: 'Flashcards', route: '/account/flashCards', icon: flashOutline },
					{ label: 'Documents', route: '/account/documents', icon: documentTextOutline },
					{ label: 'Saved', route: '/account/sets', icon: bookmarkOutline },
					{ label: 'Settings', route: '/settings', icon: settingsOutline },
				]" :key="route" :to="route" class="flex gap-3 items-center">
					<IonIcon :icon="icon" class="text-heading" />
					<span>{{ label }}</span>
				</router-link>
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import Department from '@app/components/school/departments/Department.vue'
import Institution from '@app/components/school/institutions/Institution.vue'
import {
	bookmarkOutline,
	cartOutline,
	checkmarkCircleOutline,
	documentTextOutline,
	flashOutline,
	gridOutline,
	helpCircleOutline,
	linkOutline,
	podiumOutline,
	readerOutline,
	settingsOutline
} from 'ionicons/icons'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { formatNumber } from '@utils/commons'
import { isUserCollege } from '@modules/users'

export default defineComponent({
	name: 'Account',
	components: { Department, Institution },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Profile', {})
		const { id, isAdmin, user } = useAuth()
		return {
			id, isAdmin, user, formatNumber, isUserCollege,
			gridOutline, helpCircleOutline, readerOutline, flashOutline,
			documentTextOutline, bookmarkOutline, settingsOutline, cartOutline,
			podiumOutline, linkOutline, checkmarkCircleOutline
		}
	}
})
</script>
