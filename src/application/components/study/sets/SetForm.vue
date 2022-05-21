<template>
	<form class="flex flex-col gap-4 text-center justify-center items-center" @submit.prevent="submit">
		<div class="bg-light_gray w-full rounded-md flex items-center px-4">
			<ion-text class="text-primary font-bold w-12">
				TITLE
			</ion-text>
			<ion-input v-model="factory.name"
				class="max-w-[1054px] !h-14 text-left"
				placeholder="Enter folder name”"
				show-cancel-button="never"
			></ion-input>
		</div>

		<div class="flex gap-4 w-full">
			<ion-button class="btn-outline flex-grow w-full" @click="closeModal">
				Cancel
				<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
			</ion-button>
			<ion-button :disabled="loading || !factory.valid" class="btn-primary w-full flex-grow" type="submit">
				<slot name="buttonText">Save Set</slot>
				<ion-ripple-effect class="rounded-lg" />
			</ion-button>
		</div>
		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { closeOutline } from 'ionicons/icons'
import { SetFactory } from '@modules/study'
import { IonRippleEffect } from '@ionic/vue'
import { useStudyModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'SetForm',
	components: { IonRippleEffect },
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
	},
	setup () {
		const closeModal = () => {
			useStudyModal().closeAll()
		}

		return { closeOutline, closeModal }
	}
})
</script>

<style lang="scss" scoped>
	ion-radio {
		--color: #{$color-iconInactive} !important;
		--color-checked: #{$color-primary} !important;
	}

	ion-label {
		--color: #{$color-iconInactive} !important;
	}

	ion-label {
		@media (max-width: 640px) {
			font-size: 12px !important;
		}
	}
</style>

