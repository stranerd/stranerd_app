<template>
	<DashboardLayout>
		<div class="px-4 lg:pl-2 pt-2">
			<div
				class="bg-primary h-24 rounded-b-3xl md:rounded-3xl flex items-center justify-between sm:mt-4 -mt-4 -mx-4 sm:mx-0 !z-40 py-6 lg:px-9 px-5">
				<ion-text class="text-white leading-tight lg:text-3xl text-xl font-bold">
					My classes
				</ion-text>
				<router-link to="/classes/create">
					<ion-button class="btn-white font-bold">
						Create a class
					</ion-button>
				</router-link>
			</div>

			<div class="flex w-full justify-between bg-white mt-5 rounded-xl p-6 items-center" v-for="n in 5" :key="n">
				<div class="flex items-center">
					<ion-icon :icon="people" class="text-5xl text-gray mr-4" />
					<div class="flex flex-col font-bold">
						<ion-text class="text-main_dark text-base">
							CAZDEO - Mathematics
						</ion-text>
						<ion-text class="text-xs text-gray">
							14 participants
						</ion-text>
					</div>
				</div>

				<ion-icon :icon="ellipsisVertical" class="text-2xl text-gray mr-4" />
				
			</div>
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import { people, ellipsisVertical } from 'ionicons/icons'

export default defineComponent({
	name: 'Classes',
	displayName: 'Classes',
	components: {  DashboardLayout },
    	setup () {
		return {
			ellipsisVertical, people,
		}
	},
})
</script>
