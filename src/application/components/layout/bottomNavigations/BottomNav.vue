<template>
	<IonFooter class="ion-no-border">
		<IonToolbar class="lg:hidden !bg-white">
			<div class="flex justify-around items-center text-sm">
				<router-link class="col-span-1 text-faded_gray flex flex-col items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/dashboard">
					<ion-icon :icon="homeOutline" class="w-6 md:w-14" />
					<IonText>Home</IonText>
				</router-link>
				<router-link class="col-span-1 text-faded_gray flex flex-col items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/searchOutline">
					<ion-icon :icon="searchOutline" class="w-6 md:w-14" />
					<IonText>Search</IonText>
				</router-link>
				<router-link class="col-span-1 text-faded_gray flex flex-col items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/questions">
					<ion-icon :icon="helpCircleOutline" class="w-6 md:w-14" />
					<IonText>Questions</IonText>
				</router-link>
				<router-link class="col-span-1 text-faded_gray flex flex-col items-center justify-center"
					exact-active-class="!text-main_dark"
					to="/study">
					<ion-icon :icon="bookOutline" class="w-6 md:w-14" />
					<IonText>Library</IonText>
				</router-link>
			</div>
		</IonToolbar>
	</IonFooter>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonFooter, IonIcon, IonToolbar } from '@ionic/vue'
import { add, bookOutline, calendarClear, chatbubble, helpCircleOutline, homeOutline, people, searchOutline } from 'ionicons/icons'

export default defineComponent({
	components: { IonFooter, IonIcon, IonToolbar },
	setup () {
		return {
			homeOutline, bookOutline, helpCircleOutline,
			people, searchOutline, chatbubble, add,
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
