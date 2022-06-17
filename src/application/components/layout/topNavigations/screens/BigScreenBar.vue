<template>
	<IonToolbar class="hidden lg:flex border-0 h-20">
		<div class="flex items-center">
			<div class="w-[16%]">
				<router-link class="flex items-center w-full justify-center" to="/">
					<Logo :secondary="true" class="w-40" />
				</router-link>
			</div>
			<div class="flex w-[84%] gap-10 px-12">
				<div class="w-3/4 flex-auto flex flex-row items-center">
					<Search class="flex-grow" />
				</div>
				<div class="w-[25%] flex-auto flex text-secondaryText">
					<div class="flex flex-row items-center py-1 gap-8 justify-between">
						<IonIcon :icon="addCircleOutline" class="text-3xl"
							@click="openCreateDashboardMenu" />
						<router-link to="/notifications">
							<NotificationIcon :key="user?.id" />
						</router-link>
						<div v-if="isLoggedIn"
							class="font-bold flex items-center justify-center gap-2 cursor-pointer"
							@click="openUserDashboardMenu"
						>
							<avatar :name="user?.bio.fullName" :size="24" :src="user?.bio.photo" />
							<span class="truncate max-w-[150px] flex items-center gap-1">
								<span>{{ user.bio.fullName }}</span>
								<Verified :verified="user.isVerified" />
							</span>
							<IonIcon :icon="chevronDownOutline" class="text-2xl" />
						</div>
						<router-link v-else to="/auth/signin">
							<avatar :size="24" />
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</IonToolbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { addCircleOutline, chevronDownOutline } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import { useMenuPopover } from '@app/composable/core/modals'
import Search from '@app/components/search/Search.vue'
import NotificationIcon from '@app/components/users/notifications/NotificationIcon.vue'

export default defineComponent({
	name: 'BigScreenBar',
	components: { Search, NotificationIcon },
	setup () {
		const openCreateDashboardMenu = useMenuPopover().openCreateDashboardMenu
		const openUserDashboardMenu = useMenuPopover().openUserDashboardMenu
		const { isLoggedIn, user, signout } = useAuth()

		return {
			openCreateDashboardMenu, openUserDashboardMenu,
			addCircleOutline, chevronDownOutline,
			isLoggedIn, user, signout
		}
	}
})
</script>
