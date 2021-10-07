<template>
	<!-- smaller screens -->
	<div class="md:hidden  bg-[#F7F7FC] py-[10px] fixed w-full bottom-0  grid grid-cols-4 z-50">
		<router-link to="/dashboard/home" class="col-span-1 text-icon_inactive flex flex-row items-center justify-center">
			<ion-icon :icon="home" :class="route.name == 'home' ? 'w-6 text-primary' : ' w-6' "></ion-icon>
		</router-link>

		<router-link to="/dashboard/questions" class="col-span-1 text-icon_inactive flex flex-row items-center justify-center">
			<ion-icon :icon="helpCircle" :class="route.name == 'questions' ? 'w-6 text-primary' : ' w-6' "></ion-icon>
		</router-link>

		<router-link to="/dashboard/tutors" class="col-span-1 text-icon_inactive flex flex-row items-center justify-center">
			<ion-icon :icon="people" :class="route.name == 'tutors' ? 'w-6 text-primary' : ' w-6' "></ion-icon>
		</router-link>

		<router-link to="/dashboard/chat" class="col-span-1  text-icon_inactive flex flex-row items-center justify-center">
			<ion-icon :icon="chatbubble" :class="route.name == 'chat' ? 'w-6 text-primary' : ' w-6' "></ion-icon>
		</router-link>
	</div>

	<!-- medium screens -->
	<div class="hidden lg:hidden md:flex bg-white py-3 px-3 fixed w-full bottom-0 flex-row items-center z-50">
		<div class="w-2/5 flex flex-row items-center gap-20">
			<router-link tab="home" class="px-3 py-2 bg-light_gray text-icon_inactive rounded-lg" to="/dashboard/home">
				<div class="flex flex-col py-1 items-center justify-center">
					<ion-icon :icon="home" :class="route.name == 'home' ? 'w-12 text-primary' : ' w-12' "></ion-icon>
				</div>
			</router-link>
		
			<router-link tab="questions" class="px-3 py-2  bg-light_gray text-icon_inactive rounded-lg" to="/dashboard/questions">
				<div class="flex flex-col py-1 items-center justify-center">
					<ion-icon :icon="helpCircle" :class="route.name == 'questions' ? 'w-12 text-primary' : ' w-12' "></ion-icon>
				</div>
			</router-link>

		</div>

		<div class="w-1/5 flex flex-row items-center justify-center">
			<router-link tab="questions" class="px-3 py-2 bg-primary text-white rounded-lg" to="/dashboard/questions">
				<div class="flex flex-col py-1 items-center justify-center">
					<ion-icon :icon="add" class="w-12" ></ion-icon>
				</div>
			</router-link>
		</div>
		
		<div class="w-2/5 flex flex-row-reverse items-center gap-20">
			
			<router-link tab="chat" class="px-3 py-2  bg-light_gray text-icon_inactive rounded-lg" to="/dashboard/chat">
				<div class="flex flex-col py-1 items-center justify-center">
					<ion-icon :icon="chatbubble" :class="route.name == 'chat' ? 'w-12 text-primary' : ' w-12' "></ion-icon>
				</div>
			</router-link>	

			<router-link tab="tutors" class="px-3 py-2  bg-light_gray text-icon_inactive rounded-lg" to="/dashboard/tutors">
				<div class="flex py-1 flex-col items-center justify-center">
					<ion-icon :icon="people" :class="route.name == 'tutors' ? 'w-12 text-primary ' : 'w-12' " ></ion-icon>
				</div>
			</router-link>
        
		</div>
		
	</div>

	<!-- large screens -->
	<div class="hidden md:hidden lg:flex bg-light_gray py-3 pl-3 fixed w-[16%] h-full bottom-0 flex-col rounded-tr-3xl rounded-br-3xl">

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

import { IonIcon } from '@ionic/vue'
import { home, helpCircle, people , chatbubble, add, calendarClear, wallet } from 'ionicons/icons'
const NavElement = defineAsyncComponent(() => import('@/application/components/layout/bottomNavigations/SideBarElement.vue'))

import { useRoute } from 'vue-router'


export default defineComponent({
	components: { IonIcon, NavElement },
	setup() {
		const route = useRoute()
		return {
			home, 
			helpCircle, 
			people,
			chatbubble,
			add,
			route,
			calendarClear,
			wallet
		}
	}
})
</script>
<style scoped>


.tabStyle {
	@apply border-t-2 border-gray-300 
}

ion-tab-button  {
	--color-selected: #546DD3;
	--padding-top: 1px;
	--padding-bottom: 1px;
	--color: #808e9c;
	--ripple-color: #546DD3;
}

ion-tab-bar {
	--background: #F7F7FC;
}

ion-icon {
  font-size: 23px;
}

</style>
