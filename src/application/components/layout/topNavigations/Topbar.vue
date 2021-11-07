<template>
	<!-- Small screens -->
	<div v-if="!props.isNotDashboard && !store.state.showPage"
		class="md:hidden bg-[#F7F7FC] py-[8px] px-4 fixed flex w-full top-0 border-0 flex-row items-center z-50">
		<router-link :to="profileLink" class="flex flex-row items-center w-[15%]">
			<avatar :photo-url="user?.avatar?.link" :size="'30'" />
		</router-link>

		<div class="flex flex-row items-center px-3 w-[70%] justify-center">
			<div class="py-1 px-3 w-full bg-[#8B9EB1] flex rounded-xl flex-row items-center">
				<div class="w-1/3 flex flex-row items-center">
					<img class="inline h-6 mr-2" src="/assets/images/bronze.svg" />
					<span class="font-semibold text-xs text-white ">{{ user?.account.coins.bronze }}</span>
				</div>
				<div class="w-1/3 flex flex-row items-center justify-center">
					<img class="inline h-4 text-white" src="/assets/images/add.svg" />
				</div>
				<div class="w-1/3 flex flex-row-reverse items-center">
					<span class="font-semibold text-xs text-white ">{{ user?.account.coins.gold }}</span>
					<img class="inline h-6 mr-2" src="/assets/images/gold.svg" />
				</div>
			</div>
		</div>

		<div class="flex flex-row-reverse items-center  w-[15%] ">
			<img class=" h-6" src="/assets/images/search.svg" />
		</div>

	</div>

	<!-- medium screens -->
	<div v-if="!props.isNotDashboard && !store.state.showPage "
		class="hidden lg:hidden md:flex bg-white py-3 px-3 fixed w-full top-0 flex-row items-center z-50">
		<div class="flex flex-row items-center gap-9 w-1/4">
			<router-link :to="profileLink"
				class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center">
				<avatar :custom-class="'h-6'" :photo-url="user?.avatar?.link" />
			</router-link>

			<div class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center">
				<img :size="'28'" src="/assets/images/cap.svg" />
			</div>

		</div>

		<div class="flex flex-row items-center px-6 w-2/4 justify-center">
			<div class="py-2 px-4 w-full bg-light_gray flex rounded-lg flex-row items-center">
				<div class="w-1/3 flex flex-row items-center">
					<img class="inline h-7 mr-2" src="/assets/images/bronze.svg" />
					<span class="font-semibold text-sm text-dark_grey ">{{ user?.account.coins.bronze }}</span>
				</div>
				<div class="w-1/3 flex flex-row items-center justify-center">
					<img class="inline h-6" src="/assets/images/add.svg" />
				</div>
				<div class="w-1/3 flex flex-row-reverse items-center">
					<span class="font-semibold text-sm text-dark_grey ">{{ user?.account.coins.gold }}</span>
					<img class="inline h-7 mr-2" src="/assets/images/gold.svg" />
				</div>
			</div>
		</div>


		<div class="flex flex-row-reverse items-center gap-9 w-1/4">
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center"
				to="/notifications">
				<img class="inline h-6" src="/assets/images/bell.svg" />
			</router-link>

			<div class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center">
				<img class="inline h-6" src="/assets/images/search.svg" />
			</div>

		</div>
	</div>

	<!-- large screens -->
	<div
		:class="noSideBar ? 'w-[100%]' : 'w-[84%] left-[16%]'"
		class="hidden md:hidden lg:flex bg-white py-3 pl-16 pr-[100px] fixed w-[84%]  top-0  flex-row items-center gap-16 z-50">
		<div v-if="noSideBar" class="flex flex-row items-center py-1 gap-3 w-[16%] justify-between">
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center"
				to="/dashboard">
				<ion-icon :icon="home" class="text-xl text-icon_inactive"></ion-icon>
			</router-link>
			<div class="py-2 px-3 rounded-md flex flex-row items-center justify-center">
				<img class="inline h-6" src="/assets/images/logo.svg" />
			</div>
		</div>
		<div :class="noSideBar ? 'w-[63%]' : 'w-3/4'" class="flex flex-row items-center py-1 gap-6 justify-around">
			<div class="bg-light_gray py-2 px-6 rounded-lg flex-grow flex flex-row items-center">
				<input class="focus:outline-none bg-light_gray flex-grow text-sm placeholder-gray-400 py-1 px-1"
					placeholder="Search for anything" />
				<img class="inline h-5" src="/assets/images/search.svg" />
			</div>
			<router-link class="px-4 py-1 bg-primary text-white rounded-lg" to="/questions">
				<div class="flex flex-col py-1 items-center justify-center">
					<ion-icon :icon="add" class="text-xl"></ion-icon>
				</div>
			</router-link>
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center"
				to="/notifications">
				<img class="inline h-5" src="/assets/images/bell.svg" />
			</router-link>
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center"
				to="/questions">
				<img class="inline h-5" src="/assets/images/cap.svg" />
			</router-link>
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center"
				to="/chat">
				<img class="inline h-5" src="/assets/images/chatbubble.svg" />
			</router-link>
			<router-link :to="profileLink"
				class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center">
				<avatar :photo-url="user?.avatar?.link" :size="'26'" />
			</router-link>
		</div>
		<div :class="noSideBar ? 'w-[21%]' : 'w-1/4'" class="flex flex-row items-center py-1 -mr-5">
			<div class="py-2 px-4 w-full bg-light_gray flex rounded-lg flex-row items-center">
				<div class="w-1/3 flex flex-row items-center">
					<img class="inline h-5 mr-2" src="/assets/images/bronze.svg" />
					<span class="font-semibold text-sm text-dark_grey ">{{ user?.account.coins.bronze }}</span>
				</div>
				<div class="w-1/3 flex flex-row items-center justify-center">
					<img class="inline h-5" src="/assets/images/add.svg" />
				</div>
				<div class="w-1/3 flex flex-row-reverse items-center">
					<span class="font-semibold text-sm text-dark_grey ">{{ user?.account.coins.gold }}</span>
					<img class="inline h-5 mr-2" src="/assets/images/gold.svg" />
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from 'vue'
import { IonIcon } from '@ionic/vue'
import { add, home } from 'ionicons/icons'
import { useStore } from '@app/store'
import { useAuth } from '@app/composable/auth/auth'

const Avatar = defineAsyncComponent(() => import('@app/components/core/AvatarUser.vue'))

export default defineComponent({
	props: {
		isNotDashboard: {
			type: Boolean,
			default: true
		},
		noSideBar: {
			type: Boolean,
			default: false
		}
	},
	setup (props) {
		const { id, isLoggedIn, user } = useAuth()
		const profileLink = computed({
			get: () => isLoggedIn.value ? `/profile/${id.value}#dashboard` : '/auth/signin',
			set: () => {
			}
		})

		const store = useStore()
		return {
			profileLink,
			add,
			props,
			store,
			home,
			user
		}
	},
	components: { IonIcon, Avatar }
})
</script>
