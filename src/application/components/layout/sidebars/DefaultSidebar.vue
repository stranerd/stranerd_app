<template>
	<div
		class="hidden lg:flex bg-light_gray py-3 pl-3 w-[16%] h-full  left-0 top-0 flex-col rounded-tr-3xl rounded-br-3xl z-50">

		<div class="py-5 pl-11 flex flex-row items-center">
			<img class="w-32" src="/assets/images/logo.svg" />
		</div>

		<div class="flex flex-col pl-8 mt-6">

			<router-link v-for="{ path, icon, name } in [
					{ name: 'home', path: '/dashboard/', icon: home },
					{ name: 'questions', path: '/questions', icon: helpCircle },
					{ name: 'wallet', path: '/dashboard/wallet', icon: wallet }
				]" :key="path" :to="path"
				class="flex flex-col rounded-l-[150px] text-icon_inactive cursor-pointer text-sm hover:text-dark_gray mb-2">
				<div :class="{'text-dark_gray bg-white' : $route.path === path }"
					class="py-5 flex flex-row px-4 items-center rounded-l-3xl">
					<ion-icon :icon="icon" class="text-[23px] mr-4"></ion-icon>
					<span class="font-semibold capitalize">{{ name }}</span>
				</div>
			</router-link>

		</div>

	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { calendarClear, helpCircle, home, people, wallet } from 'ionicons/icons'
import { useRoute } from 'vue-router'
import { IonIcon } from '@ionic/vue'

export default defineComponent({
	components: { IonIcon },
	setup () {
		const route = useRoute()
		return {
			home,
			helpCircle,
			people,
			route,
			calendarClear,
			wallet
		}
	}
})
</script>
