<template>
	<IonFooter class="ion-no-border border-top-line">
		<IonToolbar class="py-1">
			<div class="flex justify-around items-center">
				<router-link
					v-for="{ path, icon, iconOutline } in [
						{ name: 'Home', path: '/dashboard', icon: home, iconOutline:homeOutline },
						{ name: 'Discussions', path: '/messages', icon: chatbubbles, iconOutline:chatbubblesOutline },
						{ name: 'Questions', path: '/questions', icon: helpCircle, iconOutline:helpCircleOutline },
						{ name: 'Tests', path: '/study/preps/', icon: receipt, iconOutline:receiptOutline },
						...(isLoggedIn ? [{ name: 'Account', path: `/account`, icon: person, iconOutline: personOutline }] : []),
						...(isAdmin ? [{ name: 'Admin', path: `/admin/`, icon: statsChart, iconOutline: statsChartOutline }] : [])
					]" :key="path" :class="{'text-secondaryText': $route.path !== path}" :to="path"
					class="col-span-1 flex flex-col items-center justify-center">
					<IonIcon :icon="$route.path === path ? icon : iconOutline" class="text-3xl" />
				</router-link>
			</div>
		</IonToolbar>
	</IonFooter>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
	chatbubbles,
	chatbubblesOutline,
	helpCircle,
	helpCircleOutline,
	home,
	homeOutline,
	person,
	personOutline,
	receipt,
	receiptOutline,
	search,
	searchOutline,
	statsChart,
	statsChartOutline
} from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	setup () {
		const { isLoggedIn, isAdmin } = useAuth()
		return {
			isLoggedIn, isAdmin,
			personOutline, person, chatbubblesOutline, chatbubbles, receiptOutline, receipt,
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
