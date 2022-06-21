<template>
	<div class=" md:flex flex-col py-3 fixed inset-y-0 right-0 w-[25%] border-left-line px-5 hidden">
		<div class="flex mb-4 items-center gap-6">
			<Search class="" />
			<router-link to="/notifications">
				<NotificationIcon :key="user?.id" />
			</router-link>
			<router-link to="/notifications">
				<IonIcon :icon="settingsOutline"  />
			</router-link>
		
			<div>
				<avatar :name="user?.bio.fullName" :size="24" :src="user?.bio.photo" />
			</div>
		

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

		const { isLoggedIn, user, signout } = useAuth()

		return {
			isLoggedIn, user, signout, settingsOutline
		}
	}
})
</script>
