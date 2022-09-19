<template>
	<div class="flex flex-col gap-3">
		<div class="flex items-start gap-4 justify-between">
			<Avatar :name="user.bio.fullName" :size="64" :src="user.bio.photo" />
			<div class="flex flex-col w-full">
				<IonText class="font-bold flex gap-1 items-center" @click.prevent="verify">
					<span>{{ user.bio.fullName }}</span>
					<Verified :verified="user.isVerified" />
					<SpinLoading v-if="loading" />
				</IonText>
				<template v-if="user.isCollege(user)">
					<Institution :institutionId="user.school.institutionId"
						class="text-secondaryText text-sm font-bold" />
					<Department :departmentId="user.school.departmentId" :facultyId="user.school.facultyId"
						class="text-secondaryText text-sm" />
				</template>
				<div class="flex items-center gap-4 w-full text-sm">
					<IonText v-for="{ count, label } in [
						{ label: pluralize(user.meta.questions, 'question', 'questions'), count: formatNumber(user.meta.questions) },
						{ label: pluralize(user.meta.flashCards, 'flashcard', 'flashcards'), count: formatNumber(user.meta.flashCards) },
						{ label: pluralize(user.score, 'pt', 'pts'), count: formatNumber(user.score, 1) }
					]" :key="label">
						<span class="font-bold">{{ count }}</span>
						<span>&nbsp;{{ label }}</span>
					</IonText>
				</div>
			</div>
			<router-link v-if="user.id === id" class="text-xl leading-none lg:hidden" to="/settings">
				<IonIcon :icon="settingsOutline" />
			</router-link>
		</div>
		<IonText v-if="user.bio.description">{{ user.bio.description }}</IonText>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UserEntity } from '@modules/users'
import { formatNumber, pluralize } from '@utils/commons'
import { settingsOutline } from 'ionicons/icons'
import Department from '@app/components/school/departments/Department.vue'
import Institution from '@app/components/school/institutions/Institution.vue'
import { useAuth } from '@app/composable/auth/auth'
import { openProfileMenuModal } from '@app/composable/users/users'
import { useVerifiedRoles } from '@app/composable/users/roles/verified'

export default defineComponent({
	name: 'UserPageCard',
	components: { Department, Institution },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup (props) {
		const { id, isAdmin } = useAuth()
		const { loading, verifyUser } = useVerifiedRoles()
		const verify = async () => {
			if (!isAdmin.value) return
			if (id.value === props.user.id) return
			return await verifyUser(props.user, !props.user.isVerified)
		}
		return {
			settingsOutline, loading, verify,
			id, formatNumber, pluralize, openProfileMenuModal
		}
	}
})
</script>
