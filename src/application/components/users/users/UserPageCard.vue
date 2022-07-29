<template>
	<div class="flex flex-col gap-3">
		<div class="flex items-center gap-6 justify-between">
			<Avatar :name="user.bio.fullName" :size="64" :src="user.bio.photo" />
			<div class="flex items-center gap-4">
				<ConnectWith v-if="user.id !== id" :userId="user.id" />
				<span class="text-2xl leading-none">
					<IonIcon :icon="ellipsisHorizontalCircleOutline" @click="openProfileMenuModal(user)" />
				</span>
			</div>
		</div>
		<div class="flex flex-col">
			<IonText class="font-bold flex gap-1 items-center">
				<span>{{ user.bio.fullName }}</span>
				<Verified :verified="user.isVerified" />
				<Tag :tag="user.rank.id" />
			</IonText>
			<template v-if="user.isCollege(user)">
				<Institution :institutionId="user.school.institutionId" class="text-secondaryText text-sm font-bold" />
				<Department :departmentId="user.school.departmentId" :facultyId="user.school.facultyId"
					class="text-secondaryText text-sm" />
			</template>
		</div>
		<IonText v-if="user.bio.description">{{ user.bio.description }}</IonText>
		<div class="flex items-center gap-4 w-full text-sm">
			<IonText>
				<span class="font-bold">{{ formatNumber(user.score, 1) }}</span>
				<span>&nbsp;{{ pluralize(user.score, 'pt', 'pts') }}</span>
			</IonText>
			<IonText>
				<span class="font-bold">{{ formatNumber(user.meta.connects) }}</span>
				<span>&nbsp;{{ pluralize(user.meta.connects, 'connect', 'connects') }}</span>
			</IonText>
			<IonText>
				<span class="font-bold">{{ formatNumber(user.meta.bestAnswers) }}</span>
				<span>&nbsp;best {{ pluralize(user.meta.bestAnswers, 'answer', 'answers') }}</span>
			</IonText>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UserEntity } from '@modules/users'
import { formatNumber, pluralize } from '@utils/commons'
import { ellipsisHorizontalCircleOutline } from 'ionicons/icons'
import Department from '@app/components/school/departments/Department.vue'
import Institution from '@app/components/school/institutions/Institution.vue'
import { useAuth } from '@app/composable/auth/auth'
import ConnectWith from '@app/components/users/connects/ConnectWith.vue'
import { openProfileMenuModal } from '@app/composable/users/users'

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
		const { id } = useAuth()
		return {
			ellipsisHorizontalCircleOutline,
			id, formatNumber, pluralize, openProfileMenuModal
		}
	}
})
</script>
