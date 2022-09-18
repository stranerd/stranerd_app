<template>
	<div class="flex flex-col items-center gap-8">
		<router-link v-for="{ path, icon, iconOutline } in [
				{ name: 'Home', path: '/dashboard', icon: home, iconOutline: homeOutline },
				{ name: 'Questions', path: '/questions', icon: helpCircle, iconOutline: helpCircleOutline },
				{ name: 'Study', path: '/study', icon: book, iconOutline: bookOutline },
				{ name: 'Classes', path: '/classes', icon: people, iconOutline: peopleOutline },
				...(isAdmin ? [{ name: 'Admin', path: '/admin', icon: statsChart, iconOutline: statsChartOutline }] : [])
			]" :key="path" :class="$route.path === path ? 'text-primaryBg' : 'text-secondaryText'" :to="path"
			class="flex flex-col items-center justify-center text-xl">
			<IonIcon :icon="$route.path === path ? icon : iconOutline" />
		</router-link>
		<div class="bg-primaryBg text-primaryText rounded-full p-2.5 flex justify-center items-center"
			@click="openModal">
			<IonIcon :icon="addOutline" class="text-2xl" />
		</div>
	</div>
</template>

<script lang="ts">
import {
	addOutline,
	book,
	bookOutline,
	helpCircle,
	helpCircleOutline,
	home,
	homeOutline,
	people,
	peopleOutline,
	statsChart,
	statsChartOutline
} from 'ionicons/icons'
import { useUserModal } from '@app/composable/core/modals'
import { useAuth } from '@app/composable/auth/auth'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'LeftSidebar',
	setup () {
		const { isAdmin } = useAuth()
		return {
			isAdmin, openModal: () => useUserModal().openFabMenu(),
			addOutline, people, peopleOutline, helpCircle, helpCircleOutline,
			home, homeOutline, book, bookOutline, statsChart, statsChartOutline
		}
	}
})
</script>

