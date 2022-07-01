<template>
	<template v-if="fetched">
		<IonButton v-if="!connect" class="btn-primary w-full" @click="createConnect(userId)">
			<SpinLoading v-if="loading" />
			<IonIcon v-else :icon="linkOutline" />
			<span class="ml-2">Connect</span>
		</IonButton>
		<IonButton v-else-if="connect.pending && connect.to.id === userId" class="btn-outline w-full"
			@click="deleteConnect(connect)">
			<SpinLoading v-if="loading" />
			<IonIcon v-else :icon="closeOutline" />
			<span class="ml-2">Cancel Request</span>
		</IonButton>
		<IonButton v-else-if="connect.pending && connect.from.id === userId" class="btn-primary w-full"
			@click="acceptConnect(connect, true)">
			<SpinLoading v-if="loading" />
			<IonIcon v-else :icon="linkOutline" />
			<span class="ml-2">Accept Connect</span>
		</IonButton>
		<IonButton v-else-if="connect.accepted" class="btn-outline outline-danger w-full"
			@click="deleteConnect(connect)">
			<SpinLoading v-if="loading" />
			<IonIcon v-else :icon="unlinkOutline" />
			<span class="ml-2">Disconnect</span>
		</IonButton>
	</template>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useConnects } from '@app/composable/users/connects'
import { closeOutline, linkOutline, unlinkOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'ConnectWith',
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const {
			connects, loading, error, fetched,
			createConnect, acceptConnect, deleteConnect
		} = useConnects()
		const connect = computed(() => connects.value.find((c) => [c.from.id, c.to.id].includes(props.userId)) ?? null)
		return {
			connect, loading, error, fetched,
			createConnect, acceptConnect, deleteConnect,
			closeOutline, linkOutline, unlinkOutline
		}
	}
})
</script>
