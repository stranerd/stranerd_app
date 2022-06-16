<template>
	<IonFooter class="ion-no-border border-top-line">
		<IonToolbar class="lg:hidden pt-0.5">
			<div class="flex justify-around items-center text-sub">
				<router-link
					v-for="{ path, icon, iconOutline } in [
						{ name: 'Classes', path: '/classes', icon: home, iconOutline:homeOutline },
						{ name: 'Questions', path: '/questions', icon: helpCircle, iconOutline:helpCircleOutline },
						{ name: 'Discussions', path: '/messages', icon: chatbubbles, iconOutline:chatbubblesOutline },
						{ name: 'Tests', path: '/study/preps/', icon: receipt, iconOutline:receiptOutline },
						...(isLoggedIn ? [{ name: 'Account', path: `/account`, icon: person, iconOutline: personOutline }] : []),
						...(isAdmin ? [{ name: 'Admin', path: `/admin`, icon: statsChart, iconOutline: statsChartOutline }] : [])
					]" :key="path" :class="{'text-secondaryText': $route.path !== path}" :to="path"
					class="col-span-1 flex flex-col items-center justify-center">
					<IonIcon :icon="$route.path === path ? icon : iconOutline" class="w-6 md:w-14" />
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
	ion-icon {
		font-size: 23px;
	}

	ion-toolbar {
		--background: #{$color-bodyBg};
		--color: #{$color-bodyText};
	}
</style>
