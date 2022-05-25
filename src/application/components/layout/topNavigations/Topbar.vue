<template>
	<ion-header class="block ion-no-border inset-x-0 w-full lg:shadow-md z-10">
		<ion-toolbar class="lg:hidden px-4 border-bottom-line md:h-auto min-h-[3rem] flex items-center justify-center">
			<div class="flex items-center justify-between">
				<div>
					<!-- TODO: Only show back button if there is a previous page & it's not the homePage -->
					<ion-icon v-if="true" :icon="arrowBackOutline" class="text-xl" @click="$router.go(-1)" />
				</div>
				<router-link to="/">
					<IonText class="font-bold text-heading">
						{{ $route.meta.displayName ?? 'Stranerd' }}
					</IonText>
				</router-link>
				<div />
			</div>
		</ion-toolbar>

		<!-- large screens -->
		<BigScreenBar />
	</ion-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonHeader, IonToolbar } from '@ionic/vue'
import BigScreenBar from './screens/BigScreenBar.vue'
import { arrowBackOutline } from 'ionicons/icons'
import NotificationIcon from '@app/components/users/notifications/NotificationIcon.vue'

export default defineComponent({
	name: 'Topbar',
	components: { IonHeader, IonToolbar, BigScreenBar, NotificationIcon },
	setup () {
		return { arrowBackOutline }
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
</style>
