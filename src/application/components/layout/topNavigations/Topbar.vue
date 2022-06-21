<template>
	<IonHeader class="block ion-no-border inset-x-0 w-full z-10">
		<IonToolbar class="px-4 border-bottom-line min-h-[4rem] flex items-center justify-center">
			<div class="flex items-center justify-between">
				<IonBackButton v-if="$route.meta.back" :icon="arrowBackOutline" class="text-base" text="" />
				<IonText class="font-bold text-xl">
					{{ $route.meta.routeName ?? 'Stranerd' }}
				</IonText>
				<div class="flex gap-6 items-center">
					<router-link to="/search">
						<IonIcon :icon="searchOutline" />
					</router-link>
					<NotificationIcon />
				</div>
			</div>
		</IonToolbar>
	</IonHeader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { arrowBackOutline, searchOutline } from 'ionicons/icons'
import NotificationIcon from '@app/components/users/notifications/NotificationIcon.vue'

export default defineComponent({
	name: 'Topbar',
	components: { NotificationIcon },
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
