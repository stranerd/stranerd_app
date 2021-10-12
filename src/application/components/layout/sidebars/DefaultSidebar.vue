<template>
	<!-- large screens -->
	<div class="hidden md:hidden lg:flex bg-light_gray py-3 pl-3 fixed w-[16%] h-full  left-0 top-0 flex-col rounded-tr-3xl rounded-br-3xl z-50">

		<div class="py-5  pl-11 flex flex-row items-center">
			<img src="/assets/images/logo.svg" class="w-32" />
		</div>

		<div class="flex flex-col pl-8 mt-6">
			
			<nav-element :icon="home" :route="route" tab="home" ></nav-element>

			<nav-element :icon="helpCircle" :route="route" tab="questions" ></nav-element>

			<nav-element :icon="people" :route="route" tab="tutors" ></nav-element>

			<nav-element :icon="calendarClear" :route="route" tab="schedule" ></nav-element>

			<nav-element :icon="wallet" :route="route" tab="wallet" ></nav-element>

		</div>
		
	</div>
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import { home, helpCircle, people, calendarClear, wallet } from 'ionicons/icons'

const NavElement = defineAsyncComponent(() => import('@/application/components/layout/sidebars/SideBarElement.vue'))

import { useRoute } from 'vue-router'

export default defineComponent({
	components: { NavElement },
	setup() {
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
