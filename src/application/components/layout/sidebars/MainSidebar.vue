<template>
	<div class="bg-primaryBg fixed inset-y-0 w-16 md:flex flex-col items-center py-8 gap-7 z-50 hidden ">
		<img src="@/assets/images/logo/logo.svg" alt="logo" class="mb-3">

		
		<router-link
			v-for="{ path, icon, iconOutline } in [
				{ name: 'Home', path: '/dashboard', icon: home, iconOutline:homeOutline },
				{ name: 'Questions', path: '/questions', icon: helpCircle, iconOutline:helpCircleOutline },
				{ name: 'Discussions', path: '/messages', icon: chatbubbles, iconOutline:chatbubblesOutline },
				{ name: 'Tests', path: '/study/preps/', icon: receipt, iconOutline:receiptOutline },
				...(isLoggedIn ? [{ name: 'Account', path: `/account`, icon: person, iconOutline: personOutline }] : []),
				...(isAdmin ? [{ name: 'Admin', path: `/admin/`, icon: statsChart, iconOutline: statsChartOutline }] : [])
			]" :key="path"  :to="path"
			class="col-span-1 flex flex-col items-center justify-center text-primaryText">
			<IonIcon :icon="$route.path === path ? icon : iconOutline" class="text-2xl " />
		</router-link>


		<div class="bg-bodyBg rounded-full p-2 flex justify-center items-center" @click="openModal">
			<IonIcon :icon="addOutline" />
		</div>

	
	</div>
</template>

<script setup lang="ts">
import {
	chatbubbles, addOutline,
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
import { useUserModal } from '@app/composable/core/modals'
import { useAuth } from '@app/composable/auth/auth'

const openModal = () => useUserModal().openFabMenu()

const { isLoggedIn, isAdmin } = useAuth()
</script>

