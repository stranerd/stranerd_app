<template>
	<!-- Small screens -->
	<!-- <div class="md:hidden bg-[#F7F7FC] py-[8px] px-4 fixed flex w-full top-0 border-0 flex-row items-center z-50" v-if="!props.isNotDashboard && !store.state.showPage"> -->
	<ion-header  class="block lg:hidden">
		<ion-toolbar class="px-2">
			<ion-buttons @click="router.go(-1)" slot="start">
				<ion-icon :icon="arrowBackOutline" class="text-[23px] text-dark_gray"></ion-icon>
			</ion-buttons>
			<ion-title class="mx-auto text-base font-bold text-dark_gray">{{displayName}}</ion-title>
		</ion-toolbar>
	</ion-header>
		
	<!-- </div> -->

	<!-- medium screens -->
	<div class="hidden lg:hidden md:flex bg-white py-3 px-3 fixed w-full top-0 flex-row items-center z-50" v-if="!props.isNotDashboard && !store.state.showPage ">
		<div class="flex flex-row items-center gap-9 w-1/4">
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center " :to="profileLink">
				<avatar :src="user?.avatar?.link" :size="26"/>
			</router-link>

			<div class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center">
				<ion-icon :icon="school" class="text-2xl text-icon_inactive" ></ion-icon>
			</div>

		</div>

		<div class="flex flex-row items-center px-6 w-2/4 justify-center" >
			<div class="py-2 px-4 w-full bg-light_gray flex rounded-lg flex-row items-center">
				<div class="w-1/3 flex flex-row items-center">
					<Coins :gold="false" :size="28" class="mr-2 inline" />
					<span class="font-semibold text-sm text-dark_grey ">{{ user?.account.coins.bronze }}</span>
				</div>
				<div class="w-1/3 flex flex-row items-center justify-center">
					<ion-icon :icon="add" class="text-3xl text-icon_inactive" ></ion-icon>
                    
				</div>
				<div class="w-1/3 flex flex-row-reverse items-center">
					<span class="font-semibold text-sm text-dark_grey ">{{ user?.account.coins.gold }}</span>
					<Coins :gold="true" :size="28" class="mr-2 inline" />
				</div>
			</div>
		</div>

	

		<div class="flex flex-row-reverse items-center gap-9 w-1/4">
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center" to="/notifications">
				<ion-icon :icon="notifications" class="text-2xl text-icon_inactive" ></ion-icon>
                
			</router-link>

			<div class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center">
				
				<ion-icon :icon="search" class="text-2xl text-icon_inactive" ></ion-icon>

                
			</div>

		</div>
	</div>

	<!-- large screens -->
	<div class="hidden md:hidden lg:flex bg-white py-3 pl-16 pr-[100px] fixed   top-0  flex-row items-center gap-16 z-50 w-full">
		<div class="flex flex-row items-center py-1 gap-3 w-[16%] justify-between" >
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center" to="/dashboard/home">
				<ion-icon :icon="home" class="text-xl text-icon_inactive" ></ion-icon>
			</router-link>
			<div class="py-2 px-3 rounded-md flex flex-row items-center justify-center">
				<img src="/assets/images/logo.svg" class="min-h-[25px] object-fit max-w-[8.9rem]"/>
			</div>
		</div>
		<div class="flex flex-row items-center py-1 gap-6 justify-around" :class="noSideBar ? 'w-[63%]' : 'w-3/4'">
			<div class="bg-light_gray py-2 px-6 rounded-lg flex-grow flex flex-row items-center">
				<input class="focus:outline-none bg-light_gray flex-grow text-sm placeholder-gray-400 py-1 px-1"
					placeholder="Search for anything" />
				<ion-icon :icon="search" class="text-xl text-icon_inactive" ></ion-icon>
			</div>
			<router-link class="px-4 py-1 bg-primary text-white rounded-lg" to="/dashboard/questions">
				<div class="flex flex-col py-1 items-center justify-center">
					<ion-icon :icon="add" class="text-xl" ></ion-icon>
				</div>
			</router-link>
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center" to="/notifications">
				<ion-icon :icon="notifications" class="text-xl text-icon_inactive" ></ion-icon>
			</router-link>
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center" to="/dashboard/questions">
				<ion-icon :icon="school" class="text-xl text-icon_inactive" ></ion-icon>
			</router-link>
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center" to="/dashboard/questions">
				<ion-icon :icon="chatbubble" class="text-xl text-icon_inactive" ></ion-icon>
			</router-link>
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center" :to="profileLink">
				<avatar :src="user?.avatar?.link" :size="26"/>
			</router-link>
		</div>
		<div class="flex flex-row items-center py-1 -mr-5"  :class="noSideBar ? 'w-[21%]' : 'w-1/4'">
			<div class="py-2 px-4 w-full bg-light_gray flex rounded-lg flex-row items-center">
				<div class="w-1/3 flex flex-row items-center">
					<Coins :gold="false" :size="20" class="mr-2 inline" />
					<span class="font-semibold text-sm text-dark_grey ">{{ user?.account.coins.bronze }}</span>
				</div>
				<div class="w-1/3 flex flex-row items-center justify-center">
					<ion-icon :icon="add" class="text-xl" ></ion-icon>
				</div>
				<div class="w-1/3 flex flex-row-reverse items-center">
					<span class="font-semibold text-sm text-dark_grey ">{{ user?.account.coins.gold }}</span>
					<Coins :gold="true" :size="20" class="mr-2 inline" />
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import {  defineComponent } from 'vue'
import { IonIcon, IonButtons, IonHeader,  IonToolbar } from '@ionic/vue'
import { add, home, school, notifications, search, chatbubble } from 'ionicons/icons'
import { useStore } from '@/application/store'
import { useAuth } from '@/application/composable/auth/auth'
import Coins from '../../core/Coins.vue'
import Avatar from '@/application/components/core/Avatar.vue'
import { useRouter, useRoute } from 'vue-router'
import { arrowBackOutline } from 'ionicons/icons'

export default defineComponent({
	components: { IonIcon, Avatar, IonButtons, IonHeader,  IonToolbar, Coins },
	props: {
		isNotDashboard: {
			type: Boolean,
			default: true
		},
		noSideBar: {
			type: Boolean,
			default: false
		},
	},
	 setup(props) {
		const router = useRouter()
		
		const displayName = useRoute().meta.displayName

		const  { user } =  useAuth()	
		const Localid = localStorage.getItem('authUserId')
		const id = Localid!.replace(/^"|"$/g,'')
		const profileLink = `/profile/${id}#dashboard`
		
		const store = useStore()
		return {
			displayName,
			profileLink,
			add,
			props,
			store,
			home,
			user,
			router,
			arrowBackOutline,
			school,
			notifications,
			search ,
			chatbubble
		}
	},
	
})
</script>

<style scoped lang="scss">
ion-toolbar{
--background:#F7F7FC;
--box-shadow: none;
}
ion-header{
--background:#F7F7FC;
--box-shadow: none;
height: 40px;
}
ion-title{
--background:#F7F7FC;
--box-shadow: none;
width: fit-content;
    position: relative;
    left: -23px;

}
</style>