<template>
	<div class="flex flex-col gap-8 px-8">
		<div class="flex items-center gap-6">
			<Search class="flex-grow" />
			<router-link to="/notifications">
				<NotificationIcon :key="user?.id" />
			</router-link>
			<router-link to="/settings">
				<IonIcon :icon="settingsOutline" />
			</router-link>
			<Avatar :id="user?.id" :name="user?.bio.fullName" :size="36" :src="user?.bio.photo" />
		</div>

		<SideLeaderboard />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideLeaderboard from '@app/components/users/leaderboard/SideLeaderboard.vue'
import Search from '@app/components/search/Search.vue'
import NotificationIcon from '@app/components/users/notifications/NotificationIcon.vue'
import { useAuth } from '@app/composable/auth/auth'
import { settingsOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'RightSidebar',
	components: { SideLeaderboard, Search, NotificationIcon },
	setup () {
		const { user } = useAuth()
		return { user, settingsOutline }
	}
})
</script>
