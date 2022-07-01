<template>
	<div class="showcase-flex">
		<EmptyState v-if="!loading && !error && pendingConnects.length === 0" class="border-bottom-line"
			info="No pending requests." />
		<div v-for="connect in pendingConnects" :key="connect.hash"
			class="flex items-center card card-padding border-bottom-line">
			<Avatar :name="connect.from.bio.fullName" :size="24" :src="connect.from.bio.photo" />
			<span class="flex items-center gap-1">
				<IonText>{{ connect.from.bio.fullName }}</IonText>
				<Verified :verified="connect.from.roles.isVerified" />
			</span>
			<div class="flex gap-4 ml-auto">
				<IonIcon :icon="checkmarkOutline" class="text-success" @click="acceptConnect(connect, true)" />
				<IonIcon :icon="closeOutline" class="text-danger" @click="acceptConnect(connect, false)" />
			</div>
		</div>
		<BlockLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useConnects } from '@app/composable/users/connects'
import { checkmarkOutline, closeOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'ConnectRequests',
	setup () {
		const { loading, error, pendingConnects, acceptConnect } = useConnects()
		return {
			loading, error, pendingConnects, acceptConnect,
			checkmarkOutline, closeOutline
		}
	}
})
</script>
