<template>
	<template v-if="fetched">
		<IonButton v-if="!connect" class="btn-primary" @click="createConnect(userId)">
			<SpinLoading v-if="loading" />
			<IonIcon v-else :icon="linkOutline" />
			<span class="ml-2">Connect</span>
		</IonButton>
		<IonButton v-else-if="connect.pending && connect.to.id === userId" class="btn-outline"
			@click="deleteConnect(connect)">
			<SpinLoading v-if="loading" />
			<IonIcon v-else :icon="closeOutline" />
			<span class="ml-2">Cancel</span>
		</IonButton>
		<IonButton v-else-if="connect.pending && connect.from.id === userId" class="btn-primary"
			@click="acceptConnect(connect, true)">
			<SpinLoading v-if="loading" />
			<IonIcon v-else :icon="linkOutline" />
			<span class="ml-2">Accept</span>
		</IonButton>
		<router-link v-else-if="connect.accepted" :to="`/messages/personal/${userId}`">
			<IonButton class="btn-primary">Message</IonButton>
		</router-link>
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

<style lang="scss" scoped>
ion-button {
	--border-radius: 10rem;
}
</style>
