<template>
	<div
		class="hidden lg:flex py-3   h-full flex-col z-30">
		<div class="flex flex-col pl-8 mt-6">
			<router-link v-for="{ path, icon, name, iconOutline } in [
					{ name: 'Home', path: '/dashboard', icon: home, iconOutline:homeOutline },
					{ name: 'Questions', path: '/questions', icon: helpCircle, iconOutline:helpCircleOutline },
					{ name: 'TestPreps', path: '/testPreps', icon: receipt, iconOutline:receiptOutline },
					{ name: 'Library', path: '/study', icon: library, iconOutline:libraryOutline },
					{ name: 'Classes', path: '/classes', icon: people, iconOutline:peopleOutline }
				]" :key="path" :to="path"
				class="flex flex-col rounded-xl text-icon_inactive cursor-pointer text-sm hover:text-main_dark mb-2">
				<div :class="{'text-main_dark  active-route-link relative bg-[#13274015] ' : $route.path === path }"
					class="py-3 flex flex-row px-3 items-center rounded-xl">
					<ion-icon :icon="$route.path === path ? icon : iconOutline " class="text-[23px] mr-4"></ion-icon>
					<span class="font-semibold capitalize">{{ name }}</span>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { helpCircleOutline, homeOutline, libraryOutline, peopleOutline, library, home, helpCircle, people, receipt, receiptOutline } from 'ionicons/icons'
import { IonIcon } from '@ionic/vue'

export default defineComponent({
	components: { IonIcon },
	setup () {
		return { libraryOutline, homeOutline, helpCircleOutline, peopleOutline, library, home, helpCircle, people, receipt, receiptOutline }
	}
})
</script>

<style scoped>
</style>
