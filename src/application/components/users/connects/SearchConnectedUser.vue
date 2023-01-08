<template>
	<div class="flex items-center w-full gap-2">
		<Avatar :name="user.bio.fullName" :src="user.bio.photo" />
		<UserName :isTutor="user.roles.isStranerdTutor" :name="user.bio.fullName" class="truncate" />
		<div class="flex-1" />
		<span v-if="connect" class="text-success">Connected</span>
		<IonButton v-else :disabled="loading" class="btn-primary" @click="createConnect(user.id)">
			Connect
		</IonButton>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { UserEntity } from '@modules/users'
import { useConnects } from '@app/composable/users/connects'
import { useAuth } from '@app/composable/auth/auth'

const props = defineProps({
	user: {
		type: UserEntity,
		required: true
	}
})

const { id } = useAuth()
const { connects, loading, createConnect } = useConnects()
const connect = computed(() => connects.value.find((c) => {
	const arr = [c.to.id, c.from.id]
	return arr.includes(props.user.id) && arr.includes(id.value)
}))
</script>
