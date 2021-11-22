<template>
	<IonFooter class="ion-no-border">
		<!-- smaller screens -->
		<IonToolbar class="md:hidden !bg-white">
			<div class="flex justify-around items-center">
				<router-link class="col-span-1 text-faded_gray flex flex-row items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/dashboard">
					<ion-icon :icon="home" class="w-6" />
				</router-link>
				<router-link class="col-span-1 text-faded_gray flex flex-row items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/questions">
					<ion-icon :icon="helpCircle" class="w-6" />
				</router-link>
				<router-link class="col-span-1 text-faded_gray flex flex-row items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/study">
					<ion-icon :icon="book" class="w-6" />
				</router-link>
				<router-link class="col-span-1 text-faded_gray flex flex-row items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/account">
					<ion-icon :icon="person" class="w-6" />
				</router-link>
			</div>
		</IonToolbar>

	
		<IonToolbar class="hidden lg:hidden md:flex bg-white">
			<div class="flex justify-around items-center">
				<router-link class="col-span-1 text-faded_gray flex flex-row items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/dashboard">
					<ion-icon :icon="home" class="w-14" />
				</router-link>
			
				<router-link class="col-span-1 text-faded_gray flex flex-row items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/questions">
					<ion-icon :icon="helpCircle" class="w-14" />
				</router-link>
				<router-link class="col-span-1 text-faded_gray flex flex-row items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/">
					<ion-icon :icon="book" class="w-14" />
				</router-link>
				<router-link class="col-span-1 text-faded_gray flex flex-row items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/profile">
					<ion-icon :icon="person" class="w-14" />
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
		--border-color: rgba(0, 0, 0, .4)
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
