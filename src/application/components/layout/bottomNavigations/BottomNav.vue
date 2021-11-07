<template>
	<div>
		<!-- smaller screens -->
		<div class="md:hidden bg-[#F7F7FC] py-[10px] w-full bottom-0  grid grid-cols-4 z-50">
			<router-link class="col-span-1 text-icon_inactive flex flex-row items-center justify-center"
						 exact-active-class="text-primary"
						 to="/dashboard/">
				<ion-icon :icon="home" class="w-7" />
			</router-link>

			<router-link class="col-span-1 text-icon_inactive flex flex-row items-center justify-center"
						 exact-active-class="text-primary"
						 to="/questions">
				<ion-icon :icon="helpCircle" class="w-7" />
			</router-link>

			<router-link class="col-span-1 text-icon_inactive flex flex-row items-center justify-center"
						 exact-active-class="text-primary"
						 to="/dashboard/tutors">
				<ion-icon :icon="people" class="w-6" />
			</router-link>

			<router-link class="col-span-1 text-icon_inactive flex flex-row items-center justify-center"
						 exact-active-class="text-primary"
						 to="/chat">
				<ion-icon :icon="chatbubble" class="w-6" />
			</router-link>
		</div>

		<!-- medium screens -->
		<div class="hidden lg:hidden md:flex bg-white py-3 px-3 w-full bottom-0 flex-row items-center z-50">
			<div class="w-2/5 flex flex-row items-center gap-20">
				<router-link class="px-3 py-2 bg-light_gray text-icon_inactive rounded-lg"
							 exact-active-class="text-primary"
							 to="/dashboard/">
					<div class="flex flex-col py-1 items-center justify-center">
						<ion-icon :icon="home" class="w-12" />
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

			<div class="w-1/5 flex flex-row items-center justify-center">
				<router-link class="px-3 py-2 bg-primary text-white rounded-lg" to="/questions">
					<div class="flex flex-col py-1 items-center justify-center">
						<ion-icon :icon="add" class="w-12" />
					</div>
				</router-link>
			</div>

			<div class="w-2/5 flex flex-row-reverse items-center gap-20">

				<router-link class="px-3 py-2  bg-light_gray text-icon_inactive rounded-lg"
							 exact-active-class="text-primary"
							 to="/chat">
					<div class="flex flex-col py-1 items-center justify-center">
						<ion-icon :icon="chatbubble" class="w-12" />
					</div>
				</router-link>

				<router-link class="px-3 py-2 bg-light_gray text-icon_inactive rounded-lg"
							 exact-active-class="text-primary"
							 to="/dashboard/tutors">
					<div class="flex py-1 flex-col items-center justify-center">
						<ion-icon :icon="people" class="w-12" />
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { IonIcon } from '@ionic/vue'
import { add, calendarClear, chatbubble, helpCircle, home, people, wallet } from 'ionicons/icons'

import { useRoute } from 'vue-router'

export default defineComponent({
	components: { IonIcon },
	setup () {
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

	ion-tab-button {
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
