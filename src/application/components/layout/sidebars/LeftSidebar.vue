<template>
	<div class="flex flex-col items-center gap-8">
		<router-link v-for="{ path, icon, iconOutline } in [
				{ name: 'Home', path: '/dashboard', icon: home, iconOutline:homeOutline },
				{ name: 'Discussions', path: '/messages', icon: chatbubbles, iconOutline:chatbubblesOutline },
				{ name: 'Questions', path: '/questions', icon: helpCircle, iconOutline:helpCircleOutline },
				{ name: 'Tests', path: '/study/preps/', icon: receipt, iconOutline:receiptOutline },
				...(isAdmin ? [{ name: 'Admin', path: `/admin/`, icon: statsChart, iconOutline: statsChartOutline }] : [])
			]" :key="path" :to="path"
			class="flex flex-col items-center justify-center">
			<IonIcon :icon="$route.path === path ? icon : iconOutline" class="text-2xl" />
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
	chatbubbles,
	chatbubblesOutline,
	helpCircle,
	helpCircleOutline,
	home,
	homeOutline,
	receipt,
	receiptOutline,
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
			addOutline, chatbubbles, chatbubblesOutline, helpCircle, helpCircleOutline,
			home, homeOutline, receipt, receiptOutline, statsChart, statsChartOutline
		}
	}
})
</script>

