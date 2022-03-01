<template>
	<form class="flex flex-col gap-4 text-center justify-center items-center" @submit.prevent="submit">
		<div class="bg-light_gray w-full rounded-md flex items-center px-4">
			<ion-text class="text-primary font-bold w-12">
				TITLE
			</ion-text>
			<ion-input v-model="factory.name"
				class="max-w-[1054px] !h-14 text-left"
				placeholder="Name the class"
				show-cancel-button="never"
			></ion-input>
		</div>
		<div class="bg-light_gray w-full rounded-md flex items-center px-4">
			<ion-text class="text-primary font-bold w-12">
				DESC
			</ion-text>
			<ion-input v-model="factory.name"
				class="max-w-[1054px] !h-14 text-left"
				placeholder="Add a short description"
				show-cancel-button="never"
			></ion-input>
		</div>

		<hr class="text-faded_gray w-full" />
		<div class="flex flex-col w-full">
			<ion-item class="w-full ion-item-transparent">
				<ion-checkbox :value="true" class="ion-white" name="admin"></ion-checkbox>
				<ion-label class="text-icon_inactive font-bold text-base ml-3 ion-white">Only admin and tutors can add
					study materials
				</ion-label>
			</ion-item>

			<ion-item class="w-full ion-item-transparent ">
				<ion-checkbox :value="false" class="ion-white" name="admin"></ion-checkbox>
				<ion-label class="text-icon_inactive font-bold text-base ml-3 ion-white">All participants can add study
					materials
				</ion-label>
			</ion-item>
		</div>

		<hr class="text-faded_gray w-full" />

		<ion-button :disabled="loading || !factory.valid" class="btn-primary w-full" type="submit">
			<slot name="buttonText">Submit</slot>
			<ion-ripple-effect class="rounded-lg" />
		</ion-button>
		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SetFactory } from '@modules/study'
import { IonCheckbox, IonItem, IonLabel, IonRippleEffect } from '@ionic/vue'

export default defineComponent({
	name: 'ClassForm',
	components: { IonRippleEffect, IonItem, IonLabel, IonCheckbox },
	props: {
		factory: {
			type: SetFactory,
			required: true
		},
		submit: {
			type: Function,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		error: {
			type: String,
			required: true
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-label {
		--color: #8B9EB1 !important;
	}

	ion-label {
		@media (max-width: 640px) {
			font-size: 12px !important;
		}
	}
</style>

