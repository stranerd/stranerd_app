<template>
	<div class="bg-white card-padding rounded-xl">
		<div class="flex items-center gap-2">
			<Avatar :name="user.bio.fullName" :size="48" :src="user.bio.photo" />
			<div class="flex flex-col">
				<IonText class="flex gap-1 items-center text-secondaryText">
					<span>{{ user.bio.fullName }}</span>
					<Verified :verified="user.roles.isVerified" />
				</IonText>
				<div class="flex gap-2 items-center">
					<Tag :index="user.rank.level" :secondary="true" :tag="user.rank.id" />
					<Tag :tag="`${user.formattedScore} pt`" />
				</div>
			</div>
			<span class="ml-auto flex gap-3 items-center">
				<template v-if="classInst.admins.includes(id)">
					<template v-if="classInst.requests.includes(user.id)">
						<IonIcon :icon="checkmarkOutline" class="cursor-pointer text-green text-2xl"
							@click="acceptRequest(user.id, true)" />
						<IonIcon :icon="closeOutline" class="cursor-pointer text-red text-2xl"
							@click="acceptRequest(user.id, false)" />
					</template>
					<template v-else-if="classInst.members.includes(user.id)">
						<IonIcon v-if="classInst.user.id !== user.id && user.id !== id"
							:icon="classInst.admins.includes(user.id) ? person : personOutline"
							class="cursor-pointer text-primary text-2xl"
							@click="changeRole(user.id, ClassUsers.admins, !classInst.admins.includes(user.id))" />
						<IonIcon v-if="classInst.user.id !== user.id && user.id !== id"
							:icon="personRemoveOutline"
							class="cursor-pointer text-red text-2xl"
							@click="addToClass(user.id, false)" />
					</template>
					<template v-else>
						<IonIcon v-if="classInst.user.id !== user.id && user.id !== id"
							:icon="personAddOutline"
							class="cursor-pointer text-primary text-2xl"
							@click="addToClass(user.id, true)" />
					</template>
				</template>
				<template v-if="classInst.members.includes(user.id)">
					<IonIcon v-if="user.id === id && classInst.user.id !== id"
						:icon="exitOutline" class="cursor-pointer text-red text-2xl"
						@click="leaveClass()" />
				</template>
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useClassMembersList } from '@app/composable/classes/classes'
import { useAuth } from '@app/composable/auth/auth'
import { ClassEntity, ClassUsers } from '@modules/classes'
import { UserEntity } from '@modules/users'
import {
	checkmarkOutline,
	closeOutline,
	exitOutline,
	person,
	personAddOutline,
	personOutline,
	personRemoveOutline
} from 'ionicons/icons'

export default defineComponent({
	name: 'ClassMember',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		},
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const {
			loading, error, admins, tutors, members,
			acceptRequest, leaveClass, addToClass, changeRole
		} = useClassMembersList(props.classInst)
		return {
			ClassUsers,
			admins, tutors, members, loading, error, id,
			acceptRequest, leaveClass, addToClass, changeRole,
			exitOutline, checkmarkOutline, closeOutline, personRemoveOutline, personOutline, person, personAddOutline
		}
	}
})
</script>
