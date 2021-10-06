<template>
	<!-- Small screens -->
	<ion-header mode="ios" class="md:hidden block">
		<ion-toolbar>
			<ion-buttons slot="start" class="px-1">
				<ion-button class="relative ion-activatable rounded-full ">
					<img src="/assets/images/person-circle.svg" class="inline h-7"/>
					<ion-ripple-effect class="rounded-full"></ion-ripple-effect>
				</ion-button>
			</ion-buttons>
			<ion-title>
				<img src="/assets/images/logo.svg" class="inline"/>
			</ion-title>
			<ion-buttons slot="end" class="px-1">
				<ion-button class="px-2">
					<img src="/assets/images/search.svg" class="inline h-5"/>
				</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>

	<!-- medium screens -->
	<div class="hidden lg:hidden md:flex bg-white py-3 px-3 fixed w-full top-0 flex-row items-center z-50">
		<div class="flex flex-row items-center gap-9 w-1/4">
			<div class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center">
				<img src="/assets/images/person-circle.svg" class="inline h-6"/>
			</div>

			<div class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center">
				<img src="/assets/images/cap.svg" class="inline h-6"/>
			</div>

		</div>

		<div class="flex flex-row items-center px-6 w-2/4 justify-center" >
			<div class="py-2 px-4 w-full bg-light_gray flex rounded-lg flex-row items-center">
				<div class="w-1/3 flex flex-row items-center">
					<img src="/assets/images/bronze.svg" class="inline h-7 mr-2"/>
					<span class="font-semibold text-sm text-dark_grey ">10k</span>
				</div>
				<div class="w-1/3 flex flex-row items-center justify-center">
					<img src="/assets/images/add.svg" class="inline h-6"/>
				</div>
				<div class="w-1/3 flex flex-row-reverse items-center">
					<span class="font-semibold text-sm text-dark_grey ">250</span>
					<img src="/assets/images/gold.svg" class="inline h-7 mr-2"/>
				</div>
			</div>
		</div>

		<div class="flex flex-row-reverse items-center gap-9 w-1/4">
			<div class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center">
				<img src="/assets/images/bell.svg" class="inline h-6"/>
			</div>

			<div class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center">
				<img src="/assets/images/search.svg" class="inline h-6"/>
			</div>

		</div>
	</div>

</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IonToolbar, IonTitle, IonHeader, IonButtons, IonButton, IonRippleEffect } from '@ionic/vue'

export default defineComponent({
	setup() {
		return {}
	},
	components: { IonToolbar, IonTitle, IonButtons, IonHeader, IonButton, IonRippleEffect }
})
</script>
