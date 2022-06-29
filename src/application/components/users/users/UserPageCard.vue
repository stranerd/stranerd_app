<template>
	<div class="flex flex-col gap-4">
		<div class="flex items-center gap-6">
			<Avatar :name="user.bio.fullName" :size="64" :src="user.bio.photo" />
			<div class="flex items-center justify-between w-full text-secondaryText max-w-[350px]">
				<div class="flex items-center gap-2">
					<IonIcon :icon="podiumOutline" />
					<IonText class="flex-col flex">
						<span class="text-xl">{{ formatNumber(user.score, 1) }}</span>
						<span class="text-sm">{{ pluralize(user.score, 'Point', 'Points') }}</span>
					</IonText>
				</div>
				<div class="flex items-center gap-2">
					<IonIcon :icon="linkOutline" />
					<IonText class="flex-col flex">
						<span class="text-xl">{{ formatNumber(user.meta.connects) }}</span>
						<span class="text-sm">{{ pluralize(user.meta.connects, 'Connect', 'Connects') }}</span>
					</IonText>
				</div>
				<div class="flex items-center gap-2">
					<IonIcon :icon="checkmarkCircleOutline" />
					<IonText class="flex-col flex">
						<span class="text-xl">{{ formatNumber(user.meta.bestAnswers) }}</span>
						<span class="text-sm">Best ans</span>
					</IonText>
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-1">
			<IonText class="text-xl font-bold flex gap-1 items-center">
				<span>{{ user.bio.fullName }}</span>
				<Verified :verified="user.isVerified" />
			</IonText>
			<template v-if="user.isCollege(user)">
				<Institution :institutionId="user.school.institutionId" class="text-secondaryText text-sm font-bold" />
				<Department :departmentId="user.school.departmentId" :facultyId="user.school.facultyId"
					class="text-secondaryText text-sm" />
			</template>
			<IonText v-if="user.bio.description" class="mt-4">{{ user.bio.description }}</IonText>
		</div>

		<template v-if="user.id !== id">
			<ConnectWith :userId="user.id" />

			<IonButton v-if="isAdmin" class="btn-primary w-full"
				@click="user.isVerified ? deVerifyUser(user) : verifyUser(user)">
				<SpinLoading v-if="verifiedLoading" />
				<span v-else>{{ user.isVerified ? 'Mark User Unverified' : 'Mark User Verified' }}</span>
			</IonButton>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UserEntity } from '@modules/users'
import { formatNumber, pluralize } from '@utils/commons'
import { checkmarkCircleOutline, linkOutline, podiumOutline } from 'ionicons/icons'
import Department from '@app/components/school/departments/Department.vue'
import Institution from '@app/components/school/institutions/Institution.vue'
import { useAuth } from '@app/composable/auth/auth'
import { useVerifiedRoles } from '@app/composable/users/roles/verified'
import ConnectWith from '@app/components/users/connects/ConnectWith.vue'

export default defineComponent({
	name: 'UserPageCard',
	components: { ConnectWith, Department, Institution },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup () {
		const { id, isAdmin } = useAuth()
		const { loading: verifiedLoading, verifyUser, deVerifyUser } = useVerifiedRoles()
		return {
			podiumOutline, linkOutline, checkmarkCircleOutline,
			id, isAdmin, formatNumber, pluralize,
			verifiedLoading, verifyUser, deVerifyUser
		}
	}
})
</script>
