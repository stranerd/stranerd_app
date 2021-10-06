<template>
	<ion-tab-bar slot="bottom" class="md:hidden">
		<ion-tab-button tab="home" class="tabStyle tabStyleActive" href="/dashboard/home">
			<div class="flex flex-col py-1 items-center justify-center">
				<ion-icon :icon="home"></ion-icon>
			</div>
		</ion-tab-button>
		<ion-tab-button tab="questions" class="tabStyle tabStyleActive" href="/dashboard/questions">
			<div class="flex flex-col py-1 items-center justify-center">
				<ion-icon :icon="helpCircle"></ion-icon>
			</div>
		</ion-tab-button>
          
		<ion-tab-button tab="tutors" class="tabStyle" href="/dashboard/tutors">
			<div class="flex py-1 flex-col items-center justify-center">
				<ion-icon :icon="people"></ion-icon>
			</div>
		</ion-tab-button>
        
		<ion-tab-button tab="chat" class="tabStyle" href="/dashboard/chat">
			<div class="flex flex-col py-1 items-center justify-center">
				<ion-icon :icon="chatbubble"></ion-icon>
			</div>
		</ion-tab-button>	
	</ion-tab-bar>

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
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { IonTabBar, IonTabButton, IonIcon } from '@ionic/vue'
import { home, helpCircle, people , chatbubble, add } from 'ionicons/icons'

import { useRoute } from 'vue-router'


export default defineComponent({
	components: {  IonTabBar, IonTabButton, IonIcon },
	setup() {
		const route = useRoute()
		return {
			home, 
			helpCircle, 
			people,
			chatbubble,
			add,
			route
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
	--padding-top: 2px;
	--padding-bottom: 2px;
	--color: #8B9EB1;
	--ripple-color: #546DD3;
}

ion-tab-bar {
	--background: #F7F7FC;
}

.tabText {
	font-size: 10px;
}

ion-icon {
  font-size: 23px;
}

</style>
