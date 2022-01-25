<template>
	<div
		class="hidden lg:flex bg-white py-3 pl-3 w-[16%] h-full left-0 top-0 flex-col z-30">
		<div class="flex flex-col pl-8 mt-6">
			<router-link v-for="{ path, icon, name } in [
					{ name: 'home', path: '/dashboard', icon: home },
					{ name: 'questions', path: '/questions', icon: helpCircle },
					{ name: 'Study', path: '/study', icon: library }
				]" :key="path" :to="path"
				class="flex flex-col rounded-l-full text-icon_inactive cursor-pointer text-sm hover:text-main_dark mb-2">
				<div :class="{'text-main_dark bg-new_gray active-route-link relative' : $route.path === path }"
					class="py-5 flex flex-row px-4 items-center rounded-l-full">
					<ion-icon :icon="icon" class="text-[23px] mr-4"></ion-icon>
					<span class="font-semibold capitalize">{{ name }}</span>
				</div>
			</router-link>

		</div>

	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { calendarClear, helpCircle, home, library, people } from 'ionicons/icons'
import { useRoute } from 'vue-router'
import { IonIcon } from '@ionic/vue'

export default defineComponent({
	components: { IonIcon },
	setup () {
		const route = useRoute()
		return {
			library,
			home,
			helpCircle,
			people,
			route,
			calendarClear
		}
	}
})
</script>

<style scoped>
	.active-route-link::after,
	.active-route-link::before {
		content: "";
		position: absolute;
		background-color: transparent;
		height: 3rem;
		width: 1.5rem;
		right: 0;
	}

	.active-route-link::before {
		bottom: -50px;
		border-top-right-radius: 1.5rem;
		box-shadow: 0 -1.5rem 0 0 #F2F3F5;
	}

	.active-route-link::after {
		top: -3rem;
		border-bottom-right-radius: 1.5rem;
		box-shadow: 0 1.5rem 0 0 #F2F3F5;
	}
</style>
