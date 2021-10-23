<template>
	<div class="w-full col-span-12 mb-4 flex-col flex gap-2 items-center justify-center normalText" v-if="user">
		<!-- <img src="/assets/images/person-circle.svg" class="inline h-20 "/> -->
		<avatar :size="90" :src="user.avatar"/>
		<h2 class="headings font-bold text-dark_gray">{{ user.fullName }}</h2>
		<span class="py-1 px-4 rounded-md border-faded_gray border-[1px] font-bold text-icon_inactive bg-light_green">
			{{ user.rank.id }}
		</span>
		<div class="flex flex-row gap-1 items-center justify-center ">
			<ShowRatings :rating="user.averageRating"/>
		</div>
		<button v-if="canRequestSession" class="actionBtn mt-2 text-white" @click="requestNewSession">
			Request a session
		</button>

		
	</div>
	<div class="col-span-12 grid grid-cols-12 border-b-[1px] border-faded_gray mt-5 mb-5 lg:rounded-br-3xl lg:rounded-bl-3xl">
		<div class=" col-span-12  md:col-start-2 md:col-end-12 lg:col-start-3 lg:col-end-11 lg:justify-center lg:items-center flex flex-row  px-3 headings gap-5 text-icon_inactive font-bold  whitespace-normal overflow-x-auto">
			<div class="pb-2 pr-3 cursor-pointer" @click="goToTab('#dashboard')" :class="selectedTab == '#dashboard' ? 'border-b-4 text-dark_gray border-primary' : ''">
				Dashboard
			</div>
			<div class="pb-2  pr-3 cursor-pointer" @click="goToTab('#bio')"  :class="selectedTab == '#bio' ? 'border-b-4 text-dark_gray border-primary' : ''">
				Bio
			</div>
			<div  class="pb-2  pr-3 cursor-pointer"  @click="goToTab('#questions')" :class="selectedTab == '#questions' ? 'border-b-4 text-dark_gray border-primary' : ''">
				Questions
			</div>
			<div  class="pb-2  pr-3 cursor-pointer" @click="goToTab('#answers')" :class="selectedTab == '#answers' ? 'border-b-4 text-dark_gray border-primary' : ''">
				Answers
			</div>
			<div class="pb-2  pr-3 cursor-pointer" @click="goToTab('#achievements')" :class="selectedTab == '#achievements' ? 'border-b-4 text-dark_gray border-primary' : ''">
				Achievements
			</div>
			<div  class="pb-2 pr-3 cursor-pointer" @click="goToTab('#reviews')" :class="selectedTab == '#reviews' ? 'border-b-4 text-dark_gray border-primary' : ''">
				Reviews
			</div>
			<div  class="pb-2  pr-3 cursor-pointer" @click="goToTab('#settings')" :class="selectedTab == '#settings' ? 'border-b-4 text-dark_gray border-primary' : ''">
				Settings
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'

import {  star } from 'ionicons/icons'
import { selectedTab } from '@/application/composable/profile'
import Avatar from '../core/Avatar.vue'
import { useAuth } from '@/application/composable/auth/auth'
import { useUser } from '@/application/composable/users/user'
import ShowRatings from '../core/ShowRatings.vue'
import { toggleModal } from '@/application/composable/core/Modal'
import { setNewSessionTutorIdBio } from '@/application/composable/sessions/sessions'
import {   useRouter } from 'vue-router'

export default defineComponent({
	props:{
		userId:{
			required:true,
			type:String,
			default:''
		}
	},
	setup(props) {
		const router = useRouter()
	  const { id, user: authUser } = useAuth()
	  const { error, loading, user } = useUser(props.userId)
		const canRequestSession = computed({
			get: () => authUser.value &&
				authUser.value.id !== user.value?.id &&
				authUser.value.canRequestSessions &&
				user.value?.canHostSessions,
			set: () => {
			}
		})

		const requestNewSession = () => {
			setNewSessionTutorIdBio({ id: user.value?.id!, user: user.value?.bio! })
			// useSessionModal().openCreateSession()
			toggleModal()
		}

	  const goToTab = (tabname: string) => {
		  router.push(`/profile/${props.userId}${tabname}`)
		  selectedTab.value = tabname
	  }
		return {
			id,
			error,
			loading,
			user,
			requestNewSession,
			canRequestSession,
			star,
			selectedTab,
			goToTab
		}
	},
	components: {
		Avatar,
		ShowRatings

	}
})
</script>
