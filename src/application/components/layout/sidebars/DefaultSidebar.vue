<template>
	<div
		class="hidden lg:flex py-3 bg-white h-full flex-col text-icon_inactive">
		<div class="flex flex-col pl-8 py-6">
			<router-link v-for="{ path, icon, name, iconOutline } in [
					{ name: 'Home', path: '/dashboard', icon: home, iconOutline:homeOutline },
					{ name: 'Questions', path: '/questions', icon: helpCircle, iconOutline:helpCircleOutline },
					{ name: 'Tests', path: '/study/preps/', icon: receipt, iconOutline:receiptOutline },
					{ name: 'Library', path: '/study', icon: library, iconOutline:libraryOutline },
					{ name: 'Classes', path: '/classes', icon: people, iconOutline:peopleOutline }
				]" :key="path" :to="path"
				class="flex py-6 px-8 items-center rounded-l-full text-sm hover:text-secondaryText font-bold"
				exact-active-class="text-secondaryText bg-new_gray !py-4">
				<IonIcon :icon="$route.path === path ? icon : iconOutline " class="text-[23px] mr-4" />
				<span class="capitalize">{{ name }}</span>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
	helpCircle,
	helpCircleOutline,
	home,
	homeOutline,
	library,
	libraryOutline,
	people,
	peopleOutline,
	receipt,
	receiptOutline
} from 'ionicons/icons'

export default defineComponent({
	setup () {
		return {
			libraryOutline, homeOutline, helpCircleOutline, peopleOutline, receiptOutline,
			library, home, helpCircle, people, receipt
		}
	}
})
</script>
