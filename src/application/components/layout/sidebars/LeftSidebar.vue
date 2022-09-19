<template>
	<div class="flex flex-col text-secondaryText">
		<router-link v-for="{ name, path, icon, iconOutline } in [
				{ name: 'Home', path: '/dashboard', icon: home, iconOutline: homeOutline },
				{ name: 'Questions', path: '/questions', icon: helpCircle, iconOutline: helpCircleOutline },
				{ name: 'Study', path: '/study', icon: book, iconOutline: bookOutline },
				{ name: 'Classes', path: '/classes', icon: people, iconOutline: peopleOutline },
				...(isAdmin ? [{ name: 'Admin', path: '/admin', icon: statsChart, iconOutline: statsChartOutline }] : [])
			]" :key="path" :class="{'text-primaryBg font-bold bg-highlight': $route.path === path}" :to="path"
			class="flex items-center text-lg gap-4 px-8 py-4">
			<IonIcon :icon="$route.path === path ? icon : iconOutline" />
			<span>{{ name }}</span>
		</router-link>
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
import { useAuth } from '@app/composable/auth/auth'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'LeftSidebar',
	setup () {
		const { isAdmin } = useAuth()
		return {
			isAdmin,
			addOutline, people, peopleOutline, helpCircle, helpCircleOutline,
			home, homeOutline, book, bookOutline, statsChart, statsChartOutline
		}
	}
})
</script>

