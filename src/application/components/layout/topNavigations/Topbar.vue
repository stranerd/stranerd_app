<template>
	<IonHeader class="block ion-no-border inset-x-0 w-full lg:shadow-md z-10">
		<IonToolbar class="lg:hidden px-4 border-bottom-line md:h-auto min-h-[3rem] flex items-center justify-center">
			<div class="flex items-center justify-between">
				<div>
					<!-- TODO: Only show back button if there is a previous page & it's not the homePage -->
					<IonIcon v-if="true" :icon="arrowBackOutline" class="text-heading2" @click="$router.go(-1)" />
				</div>
				<router-link to="/">
					<IonText class="font-bold text-heading">
						{{ $route.meta.routeName ?? 'Stranerd' }}
					</IonText>
				</router-link>
				<div />
			</div>
		</IonToolbar>

		<!-- large screens -->
		<BigScreenBar />
	</IonHeader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BigScreenBar from './screens/BigScreenBar.vue'
import { arrowBackOutline } from 'ionicons/icons'
import NotificationIcon from '@app/components/users/notifications/NotificationIcon.vue'

export default defineComponent({
	name: 'Topbar',
	components: { BigScreenBar, NotificationIcon },
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
