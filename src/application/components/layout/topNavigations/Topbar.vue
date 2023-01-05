<template>
	<IonHeader class="block ion-no-border inset-x-0 w-full z-10">
		<IonToolbar :class="{'h-0': hideContent}" class="px-4 lg:px-6 flex items-center justify-center">
			<div v-if="!hideContent" class="flex items-center justify-between lg:gap-16 pt-4 pb-2">
				<router-link class="hidden lg:inline-block" to="/">
					<Logo />
				</router-link>
				<span class="flex gap-0.5 lg:hidden">
					<span />
					<IonBackButton v-if="$route.meta.back" :icon="arrowBackOutline" defaultHref="/dashboard" mode="ios"
						text="" />
					<router-link v-else-if="user" class="flex items-center" to="/users/leaderboard">
						<span class="h-8 w-8 p-1 bg-warning rounded-full flex items-center justify-center">
							<IonIcon :icon="trophyOutline" />
						</span>
						<span class="rounded-r-full px-4 -ml-2 py-0.5 bg-[#FF880022]">
							{{ user.account.rankings.daily.value }}
						</span>
					</router-link>
				</span>
				<IonText class="font-bold text-xl lg:hidden truncate max-w-[240px] capitalize">
					{{ $route.meta.routeName ?? '' }}
				</IonText>
				<Search class="flex-grow hidden lg:flex" />
				<div class="flex gap-6 lg:gap-8 items-center">
					<router-link class="lg:hidden flex items-center" to="/search">
						<IonIcon :icon="searchOutline" />
					</router-link>
					<NotificationIcon :key="user?.id" />
					<router-link class="hidden lg:inline-flex items-center" to="/settings">
						<IonIcon :icon="settingsOutline" />
					</router-link>
					<Avatar :id="user?.id" :name="user?.bio.fullName" :size="36" :src="user?.bio.photo"
						class="hidden lg:inline-block" />
				</div>
			</div>
		</IonToolbar>
	</IonHeader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { arrowBackOutline, searchOutline, settingsOutline, trophyOutline } from 'ionicons/icons'
import NotificationIcon from '@app/components/users/notifications/NotificationIcon.vue'
import Search from '@app/components/search/Search.vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'Topbar',
	components: { NotificationIcon, Search },
	props: {
		hideContent: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup () {
		const { user } = useAuth()
		return { user, arrowBackOutline, searchOutline, settingsOutline, trophyOutline }
	}
})
</script>

<style lang="scss" scoped>
ion-toolbar {
	@media (min-width: $lg) {
		border: $border;
	}
}
</style>
