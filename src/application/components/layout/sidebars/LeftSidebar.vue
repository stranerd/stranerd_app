<template>
	<div class="flex flex-col gap-8">
		<router-link class="px-8" to="/">
			<Logo :showName="true" />
		</router-link>
		<div class="flex flex-col text-secondaryText">
			<router-link v-for="{ name, path, icon, iconOutline } in [
					{ name: 'Home', path: '/dashboard', icon: home, iconOutline: homeOutline },
					{ name: 'Questions', path: '/questions', icon: helpCircle, iconOutline: helpCircleOutline },
					{ name: 'Study', path: '/study', icon: book, iconOutline: bookOutline },
					{ name: 'Chat', path: '/chat', icon: chatboxEllipses, iconOutline: chatboxEllipsesOutline },
					{ name: 'Profile', path: '/account', icon: person, iconOutline: personOutline },
					...(isAdmin ? [{ name: 'Admin', path: '/admin/', icon: statsChart, iconOutline: statsChartOutline }] : [])
				]" :key="path" :class="{'text-primaryBg font-semibold bg-highlight': $route.path === path}" :to="path"
				class="flex items-center text-lg gap-4 px-8 py-4">
				<IonIcon :icon="$route.path === path ? icon : iconOutline" />
				<span>{{ name }}</span>
			</router-link>
		</div>
		<SubscribeCTA v-if="!isSubscribed" class="mx-8 mt-auto" />
	</div>
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
	statsChart,
	statsChartOutline
} from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import SubscribeCTA from '@app/components/payment/plans/SubscribeCTA.vue'

const { isAdmin, isSubscribed } = useAuth()
</script>

