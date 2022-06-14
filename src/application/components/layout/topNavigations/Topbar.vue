<template>
	<IonHeader class="block ion-no-border inset-x-0 w-full lg:shadow-md z-10">
		<IonToolbar class="lg:hidden px-4 border-bottom-line md:h-auto min-h-[3rem] flex items-center justify-center">
			<div class="flex items-center justify-between">
				<router-link v-if="$route.meta.back" :to="$route.meta.back">
					<IonIcon :icon="arrowBackOutline" class="text-heading2" />
				</router-link>
				<IonText class="font-bold text-heading">
					{{ $route.meta.routeName ?? 'Stranerd' }}
				</IonText>
				<div class="flex gap-4 items-center">
					<router-link to="/search">
						<IonIcon :icon="searchOutline" class="text-heading2" />
					</router-link>
					<NotificationIcon />
				</div>
			</div>
		</IonToolbar>

		<!-- large screens -->
		<BigScreenBar />
	</IonHeader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BigScreenBar from './screens/BigScreenBar.vue'
import { arrowBackOutline, searchOutline } from 'ionicons/icons'
import NotificationIcon from '@app/components/users/notifications/NotificationIcon.vue'

export default defineComponent({
	name: 'Topbar',
	components: { BigScreenBar, NotificationIcon },
	setup () {
		return { arrowBackOutline, searchOutline }
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
