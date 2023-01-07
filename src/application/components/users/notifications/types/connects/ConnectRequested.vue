<template>
	<div v-if="user && connect" class="flex border-bottom-line card-padding items-start">
		<Avatar :id="connect.from.id" :name="connect.from.bio.fullName" :size="32" :src="connect.from.bio.photo" />
		<div class="flex flex-col gap-2 flex-1">
			<div class="flex gap-2 items-center">
				<IonText>{{ user.bio.fullName }} is requesting to connect</IonText>
				<IonIcon :icon="ellipse" class="dot" />
				<IonText>{{ formatTime(notification.createdAt) }}</IonText>
			</div>
			<div v-if="connect.pending && connect.from.id === userId" class="flex gap-4">
				<IonButton class="btn-primary flex-1" @click.prevent="acceptConnect(connect, true)">
					<SpinLoading v-if="loading" class="mr-2" />
					<span>Accept</span>
				</IonButton>
				<IonButton class="btn-outline flex-1" @click.prevent="acceptConnect(connect, false)">
					<SpinLoading v-if="loading" class="mr-2" />
					<span>Reject</span>
				</IonButton>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useConnects } from '@app/composable/users/connects'
import { NotificationEntity } from '@modules/users'
import { formatTime } from '@utils/dates'
import { ellipse } from 'ionicons/icons'
import { useUser } from '@app/composable/users/users'

export default defineComponent({
	name: 'ConnectRequested',
	props: {
		notification: {
			type: NotificationEntity,
			required: true
		},
		connectId: {
			type: String,
			required: true
		},
		userId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { connects, acceptConnect, deleteConnect, loading } = useConnects()
		const { user } = useUser(props.userId)
		const connect = computed(() => connects.value.find((c) => c.id === props.connectId))
		return { connect, user, acceptConnect, deleteConnect, loading, formatTime, ellipse }
	}
})
</script>
