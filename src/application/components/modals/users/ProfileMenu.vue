<template>
	<div v-if="user" class="modal-content">
		<div class="p-6 md:p-8 flex flex-col text-secondaryText">
			<template v-if="user.id === id">
				<router-link v-for="{ label, route, icon, hide } in [
					{ label: 'Stats', route: '/account/stats', icon: gridOutline },
					{ label: 'My Library', route: '/account/files', icon: libraryOutline },
					{ label: 'Saved', route: '/account/sets', icon: bookmarkOutline },
					{ label: 'Subscription', route: '/account/subscription', icon: cardOutline },
					{ label: 'Wallet', route: '/account/wallet', icon: walletOutline },
					{ label: 'Settings', route: '/settings', icon: settingsOutline, hide:true },
				]" :key="route" :class="[hide&&'md:hidden','flex gap-4 py-4 items-center']" :to="route">
					<IonIcon :icon="icon" />
					<span>{{ label }}</span>
				</router-link>
			</template>
			<template v-else>
				<Share :link="user.shareLink" :text="user.bio.description"
					:title="`Share ${user.bio.firstName}'s profile`">
					<div class="flex gap-4 py-4 items-center">
						<IonIcon :icon="shareOutline" />
						<span>Share profile</span>
					</div>
				</Share>
				<template v-if="connect && !connect.accepted">
					<span class="text-primaryBg flex gap-4 py-4 items-center" @click="acceptConnect(connect, true)">
						<SpinLoading v-if="connectLoading" />
						<IonIcon v-else :icon="linkOutline" />
						<span>Accept connection</span>
					</span>
					<span class="text-danger flex gap-4 py-4 items-center" @click="acceptConnect(connect, false)">
						<SpinLoading v-if="connectLoading" />
						<IonIcon v-else :icon="linkOutline" />
						<span>Reject connection</span>
					</span>
				</template>
				<span v-if="connect && connect.accepted" class="text-danger flex gap-4 py-4 items-center"
					@click="deleteConnect(connect)">
					<SpinLoading v-if="connectLoading" />
					<IonIcon v-else :icon="linkOutline" />
					<span>Remove connection</span>
				</span>
			</template>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import {
	bookmarkOutline,
	cardOutline,
	gridOutline,
	libraryOutline,
	linkOutline,
	settingsOutline,
	shareOutline,
	walletOutline
} from 'ionicons/icons'
import { getProfileMenuUser } from '@app/composable/users/users'
import { useAuth } from '@app/composable/auth/auth'
import { useConnects } from '@app/composable/users/connects'

const props = defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})
const { id, isAdmin } = useAuth()
const user = getProfileMenuUser()
if (!user) props.close()
const { connects, acceptConnect, deleteConnect, loading: connectLoading } = useConnects()
const connect = computed(() => connects.value.find((c) => c.members.includes(id.value) && c.members.includes(user?.id as any)))
</script>
