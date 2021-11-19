<template>
	<IonFooter>
		<!-- smaller screens -->
		<!-- <IonToolbar class="md:hidden bg-[#F7F7FC]"> -->
		<IonToolbar class="md:hidden !bg-white">
			<div class="flex justify-around items-center">
				<router-link class="col-span-1 text-faded_gray flex flex-row items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/dashboard">
					<ion-icon :icon="home" class="w-7" />
				</router-link>
				<router-link class="col-span-1 text-faded_gray flex flex-row items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/">
					<ion-icon :icon="book" class="w-7" />
				</router-link>
				<router-link class="col-span-1 text-faded_gray flex flex-row items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/profile">
					<ion-icon :icon="person" class="w-7" />
				</router-link>

				<!-- <router-link class="col-span-1 text-icon_inactive flex flex-row items-center justify-center"
					exact-active-class="text-primary"
					to="/questions/create">
					<ion-icon :icon="add" class="w-7" />
				</router-link> -->
				<!-- <router-link class="col-span-1 text-faded_gray flex flex-row items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/questions/create">
					<ion-icon :icon="add" class="w-7" />
				</router-link> -->

				<router-link class="col-span-1 text-faded_gray flex flex-row items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/questions">
					<ion-icon :icon="helpCircle" class="w-6" />
				</router-link>
			</div>
		</IonToolbar>

		<!-- medium screens -->
		<!-- <IonToolbar class="hidden lg:hidden md:flex bg-white">
			<div class="flex justify-around items-center">
				<router-link class="px-3 py-2 bg-light_gray text-icon_inactive rounded-lg"
					exact-active-class="text-primary"
					to="/dashboard">
					<div class="flex flex-col py-1 items-center justify-center">
						<ion-icon :icon="home" class="w-12" />
					</div>
				</router-link>

				<router-link class="px-3 py-2 bg-primary text-white rounded-lg" to="/questions/create">
					<div class="flex flex-col py-1 items-center justify-center">
						<ion-icon :icon="add" class="w-12" />
					</div>
				</router-link>

				<router-link class="px-3 py-2 bg-light_gray text-icon_inactive rounded-lg"
					exact-active-class="text-primary"
					to="/questions">
					<div class="flex flex-col py-1 items-center justify-center">
						<ion-icon :icon="helpCircle" class="w-12" />
					</div>
				</router-link>
			</div>
		</IonToolbar> -->
		<IonToolbar class="hidden lg:hidden md:flex bg-white">
			<div class="flex justify-around items-center">
				<router-link class="col-span-1 text-faded_gray flex flex-row items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/dashboard">
					<ion-icon :icon="home" class="w-12" />
				</router-link>
				<router-link class="col-span-1 text-faded_gray flex flex-row items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/">
					<ion-icon :icon="book" class="w-12" />
				</router-link>
				<router-link class="col-span-1 text-faded_gray flex flex-row items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/profile">
					<ion-icon :icon="person" class="w-12" />
				</router-link>
				<router-link class="col-span-1 text-faded_gray flex flex-row items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/questions">
					<ion-icon :icon="helpCircle" class="w-12" />
				</router-link>
			</div>
		</IonToolbar>
	</IonFooter>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonFooter, IonIcon, IonToolbar } from '@ionic/vue'
import { add, calendarClear, chatbubble, helpCircle, book, person, home, people } from 'ionicons/icons'

export default defineComponent({
	components: { IonFooter, IonIcon, IonToolbar },
	setup () {
		return {
			home,
			book,
			helpCircle,
			people,
			person,
			chatbubble,
			add,
			calendarClear
		}
	}
})
</script>

<style scoped>
	/* .tabStyle {
		@apply border-t-2 border-gray-300
	} */

	ion-toolbar {
    	--background: #FFFFFF;
	}

	ion-tab-button {
		--color-selected: #546DD3;
		--padding-top: 1px;
		--padding-bottom: 1px;
		--color: #808e9c;
		--ripple-color: #546DD3;
	}

	/* ion-tab-bar {
		--background: #F7F7FC;
	} */

	ion-icon {
		font-size: 23px;
	}

</style>
