<template>
	<IonFooter class="ion-no-border">
		<IonToolbar :class="{'h-0': hideContent}">
			<div v-if="!hideContent" class="flex justify-around items-center overflow-x-auto pb-1">
				<router-link
					v-for="{ name, path, icon, iconOutline } in [
						{ name: 'Home', path: '/dashboard', icon: home, iconOutline: homeOutline },
						{ name: 'Questions', path: '/questions', icon: helpCircle, iconOutline: helpCircleOutline },
						{ name: 'Study', path: '/study', icon: book, iconOutline: bookOutline },
						{ name: 'Chat', path: '/chat', icon: chatboxEllipses, iconOutline: chatboxEllipsesOutline },
						{ name: 'Profile', path: '/account', icon: person, iconOutline: personOutline },
						...(isAdmin ? [{ name: 'Admin', path: '/admin', icon: statsChart, iconOutline: statsChartOutline }] : [])
					]" :key="path" :class="$route.path === path ? 'text-primaryBg' : 'text-secondaryText'" :to="path"
					class="col-span-1 flex flex-col items-center justify-center text-lg leading-none min-w-[40px]">
					<IonIcon :icon="$route.path === path ? icon : iconOutline" />
					<span class="text-sm">{{ name }}</span>
				</router-link>
			</div>
		</IonToolbar>
	</IonFooter>
</template>

<script lang="ts" setup>
import {
	book,
	bookOutline,
	chatboxEllipses,
	chatboxEllipsesOutline,
	helpCircle,
	helpCircleOutline,
	home,
	homeOutline,
	person,
	personOutline,
	search,
	searchOutline,
	statsChart,
	statsChartOutline
} from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'

const props = defineProps({
	hideContent: {
		type: Boolean,
		default: false,
		required: false
	}
})

const { isAdmin } = useAuth()
</script>

<style lang="scss" scoped>
ion-toolbar {
	--background: #{$color-bodyBg};
	--color: #{$color-bodyText};
}
</style>
