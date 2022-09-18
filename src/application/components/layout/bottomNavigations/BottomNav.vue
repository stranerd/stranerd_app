<template>
	<IonFooter class="ion-no-border border-top-line">
		<IonToolbar class="py-1">
			<div class="flex justify-around items-center overflow-x-auto">
				<router-link
					v-for="{ name, path, icon, iconOutline } in [
						{ name: 'Home', path: '/dashboard', icon: home, iconOutline: homeOutline },
						{ name: 'Questions', path: '/questions', icon: helpCircle, iconOutline: helpCircleOutline },
						{ name: 'Study', path: '/study', icon: book, iconOutline: bookOutline },
						{ name: 'Classes', path: '/classes', icon: people, iconOutline: peopleOutline },
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

<script lang="ts">
import { defineComponent } from 'vue'
import {
	book,
	bookOutline,
	helpCircle,
	helpCircleOutline,
	home,
	homeOutline,
	people,
	peopleOutline,
	person,
	personOutline,
	search,
	searchOutline,
	statsChart,
	statsChartOutline
} from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	setup () {
		const { isAdmin } = useAuth()
		return {
			isAdmin, personOutline, person, peopleOutline, people, bookOutline, book,
			helpCircleOutline, helpCircle, homeOutline, home, searchOutline, search, statsChartOutline, statsChart
		}
	}
})
</script>

<style lang="scss" scoped>
ion-toolbar {
	--background: #{$color-bodyBg};
	--color: #{$color-bodyText};
}
</style>
