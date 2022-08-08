<template>
	<IonHeader class="block ion-no-border inset-x-0 w-full z-10">
		<IonToolbar class="px-4 lg:px-6 border-bottom-line min-h-[4rem] flex items-center justify-center">
			<div class="flex items-center justify-between lg:gap-16 py-2">
				<router-link class="hidden lg:inline-block" to="/">
					<Logo />
				</router-link>
				<IonBackButton v-if="$route.meta.back" :icon="arrowBackOutline"
					class="text-base text-headerText lg:hidden"
					defaultHref="/dashboard" text="" mode="ios" />
				<IonText class="font-bold text-xl lg:hidden truncate max-w-[240px]">
					{{ $route.meta.routeName ?? 'Stranerd' }}
				</IonText>
				<Search class="flex-grow hidden lg:flex" />
				<div class="flex gap-6 lg:gap-8 items-center">
					<router-link class="lg:hidden" to="/search">
						<IonIcon :icon="searchOutline" />
					</router-link>
					<NotificationIcon :key="user?.id" />
					<router-link class="hidden lg:inline-block" to="/users/leaderboard">
						<IonIcon :icon="podiumOutline" />
					</router-link>
					<router-link class="hidden lg:inline-block" to="/settings">
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
import { arrowBackOutline, podiumOutline, searchOutline, settingsOutline } from 'ionicons/icons'
import NotificationIcon from '@app/components/users/notifications/NotificationIcon.vue'
import Search from '@app/components/search/Search.vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'Topbar',
	components: { NotificationIcon, Search },
	setup () {
		const { user } = useAuth()
		return { user, arrowBackOutline, searchOutline, settingsOutline, podiumOutline }
	}
})
</script>

<style lang="scss" scoped>
	ion-toolbar {
		--background: #{$color-headerBg};
		--color: #{$color-headerText};
		--box-shadow: none;
	}

	ion-header {
		--background: #{$color-headerBg};
		--color: #{$color-headerText};
		--box-shadow: none;
	}

	::v-deep() {
		ion-searchbar {
			background: $color-primaryHover !important;
		}
	}
</style>
