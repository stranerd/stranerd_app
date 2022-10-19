<template>
	<router-link :to="`/users/${user.id}`" class="flex items-center card card-padding">
		<Avatar :id="user.id" :name="user.bio.fullName" :size="24" :src="user.bio.photo" />
		<UserName :isTutor="user.roles.isStranerdTutor" :name="user.bio.fullName" />
		<span class="ml-auto flex gap-3 items-center">
			<template v-if="classInst.admins.includes(id)">
				<template v-if="classInst.requests.includes(user.id)">
					<IonIcon :icon="checkmarkOutline" class="text-success"
						@click.prevent="acceptRequest(user.id, true)" />
					<IonIcon :icon="closeOutline" class="text-danger"
						@click.prevent="acceptRequest(user.id, false)" />
				</template>
				<template v-else-if="classInst.members.includes(user.id)">
					<IonIcon v-if="classInst.user.id !== user.id && user.id !== id"
						:icon="classInst.admins.includes(user.id) ? person : personOutline"
						class="text-primaryBg"
						@click.prevent="changeRole(user.id, ClassUsers.admins, !classInst.admins.includes(user.id))" />
					<IonIcon v-if="classInst.user.id !== user.id && user.id !== id"
						:icon="removeCircleOutline" class="text-danger"
						@click.prevent="addToClass(user.id, false)" />
				</template>
				<template v-else>
					<IonIcon v-if="classInst.user.id !== user.id && user.id !== id"
						:icon="personAddOutline" class="text-primaryBg"
						@click.prevent="addToClass(user.id, true)" />
				</template>
			</template>
			<template v-if="classInst.members.includes(user.id)">
				<IonIcon v-if="user.id === id && classInst.user.id !== id"
					:icon="exitOutline" class="text-danger" @click.prevent="leaveClass()" />
			</template>
		</span>
	</router-link>
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
	removeCircleOutline
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
		} = useClassMembersList(props.classInst, true)
		return {
			ClassUsers,
			admins, tutors, members, loading, error, id,
			acceptRequest, leaveClass, addToClass, changeRole,
			exitOutline, checkmarkOutline, closeOutline, removeCircleOutline, personOutline, person, personAddOutline
		}
	}
})
</script>
