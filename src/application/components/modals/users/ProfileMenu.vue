<template>
	<div class="modal-content">
		<div class="p-6 py-8 md:p-8 flex flex-col text-secondaryText">
			<template v-if="user.id === id">
				<router-link v-for="{ label, route, icon, hide } in [
					{ label: 'Stats', route: '/account/stats', style: '', icon: gridOutline },
					{ label: 'My Library', route: '/account/files', style: '', icon: libraryOutline },
					{ label: 'Saved', route: '/account/sets', style: '', icon: bookmarkOutline },
					{ label: 'Settings', route: '/settings', style: '', icon: settingsOutline, hide:true },
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
				<span v-if="connect && connect.accepted" class="text-danger flex gap-4 py-4 items-center"
					@click="deleteConnect(connect)">
					<SpinLoading v-if="connectLoading" />
					<IonIcon v-else :icon="linkOutline" />
					<span>Remove connection</span>
				</span>
				<span class="flex gap-4 py-4 items-center" @click="verifyUser(user, !user.roles.isVerified)">
					<SpinLoading v-if="verifiedLoading" />
					<IonIcon v-else :icon="createOutline" />
					<span>Mark as {{ user.roles.isVerified ? 'unverified' : 'verified' }}</span>
				</span>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import {
	bookmarkOutline,
	createOutline,
	gridOutline,
	libraryOutline,
	linkOutline,
	settingsOutline,
	shareOutline
} from 'ionicons/icons'
import { getProfileMenuUser } from '@app/composable/users/users'
import { useAuth } from '@app/composable/auth/auth'
import { useVerifiedRoles } from '@app/composable/users/roles/verified'
import { useConnects } from '@app/composable/users/connects'

export default defineComponent({
	name: 'ProfileMenu',
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup (props) {
		const { id, isAdmin } = useAuth()
		const user = getProfileMenuUser()
		if (!user) props.close()
		const { loading: verifiedLoading, verifyUser } = useVerifiedRoles()
		const { connects, deleteConnect, loading: connectLoading } = useConnects()
		const connect = computed(() => connects.value.find((c) => c.members.includes(id.value) && c.members.includes(user?.id as any)))
		return {
			user, id, isAdmin,
			gridOutline, libraryOutline, bookmarkOutline, settingsOutline, createOutline, shareOutline, linkOutline,
			verifiedLoading, verifyUser, connect, connectLoading, deleteConnect
		}
	}
})
</script>
