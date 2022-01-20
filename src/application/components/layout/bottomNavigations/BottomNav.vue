<template>
	<IonFooter class="ion-no-border">
		<IonToolbar class="lg:hidden !bg-white">
			<div class="flex justify-around items-center">
				<router-link class="col-span-1 text-faded_gray flex items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/dashboard">
					<ion-icon :icon="home" class="w-6 md:w-14" />
				</router-link>
				<router-link class="col-span-1 text-faded_gray flex items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/explore">
					<ion-icon :icon="search" class="w-6 md:w-14" />
				</router-link>
				<router-link class="col-span-1 text-faded_gray flex items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/questions">
					<ion-icon :icon="helpCircle" class="w-6 md:w-14" />
				</router-link>
				<router-link class="col-span-1 text-faded_gray flex items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/study">
					<ion-icon :icon="book" class="w-6 md:w-14" />
				</router-link>
			</div>
		</IonToolbar>
	</IonFooter>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonFooter, IonIcon, IonToolbar } from '@ionic/vue'
import { add, book, calendarClear, chatbubble, helpCircle, home, people, search } from 'ionicons/icons'

export default defineComponent({
	components: { IonFooter, IonIcon, IonToolbar },
	setup () {
		return {
			home, book, helpCircle,
			people, search, chatbubble, add,
			calendarClear
		}
	}
})
</script>

<style scoped>
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

	ion-icon {
		font-size: 23px;
	}
</style>
