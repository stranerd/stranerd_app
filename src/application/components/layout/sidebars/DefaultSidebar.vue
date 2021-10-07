<template>
	<div class=" layout-side-left ">

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

<script>
import { defineAsyncComponent } from 'vue'

import { home, helpCircle, people , chatbubble, add, calendarClear, wallet } from 'ionicons/icons'
const NavElement = defineAsyncComponent(() => import('@/application/components/layout/sidebars/SideBarElement.vue'))

export default {
	name: 'DefaultSidebar',
	components: {  NavElement },
	setup() {
		return {
			home, 
			helpCircle, 
			people,
			chatbubble,
			add,
			calendarClear,
			wallet
		}
	}

}
</script>

<style>

</style>