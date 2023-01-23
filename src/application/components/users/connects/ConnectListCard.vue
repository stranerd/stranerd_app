<template>
	<div v-if="user && connect.from.id === id" class="card-padding flex items-center">
		<Avatar :id="user.id" :name="user.bio.fullName" :src="user.bio.photo" />
		<div class="flex-1 truncate">
			<UserName :isTutor="user.roles.isStranerdTutor" :name="user.bio.fullName" />
			<Institution v-if="user.isCollege(user)" :institutionId="user.school.institutionId" />
		</div>
		<IonButton class="btn-outline" @click="deleteConnect(connect)">
			Cancel
		</IonButton>
	</div>
	<div v-else-if="user && connect.to.id === id" class="card-padding flex items-start">
		<Avatar :id="user.id" :name="user.bio.fullName" :src="user.bio.photo" />
		<div class="flex flex-col flex-1 truncate gap-1">
			<span class="flex gap-1 items-center">
				<UserName :isTutor="user.roles.isStranerdTutor" :name="user.bio.fullName" class="truncate" />
				<span class="flex-1" />
				<span class="text-secondaryText text-sm">{{ formatTime(connect.createdAt) }}</span>
			</span>
			<Institution v-if="user.isCollege(user)" :institutionId="user.school.institutionId" />
			<div class="flex gap-4">
				<IonButton class="btn-primary w-full" @click="acceptConnect(connect, true)">
					Accept
				</IonButton>
				<IonButton class="btn-outline w-full" @click="acceptConnect(connect, false)">
					Reject
				</IonButton>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ConnectEntity } from '@modules/users'
import { useAuth } from '@app/composable/auth/auth'
import { useUser } from '@app/composable/users/users'
import { formatTime } from '@utils/dates'
import Institution from '@app/components/school/institutions/Institution.vue'
import { useConnects } from '@app/composable/users/connects'

const props = defineProps({
	connect: {
		type: ConnectEntity,
		required: true
	}
})

const { id } = useAuth()
const { user } = useUser(props.connect.from.id === id.value ? props.connect.to.id : props.connect.from.id)
const { acceptConnect, deleteConnect, loading, error } = useConnects()
</script>
