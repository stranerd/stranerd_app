<template>
	<form class="flex flex-col gap-4 text-center justify-center" @submit.prevent="submit">
		<div class="flex flex-col items-start">
			<CoverAvatar :editable="true" :src="factory.coverPhoto" class="h-20"
				@photo="(p) => factory.coverPhoto = p" />
			<span class="modal-padding-x relative top-[-40px] inline-flex items-center justify-center -mb-10">
				<Avatar :editable="true" :name="factory.name" :size="80"
					:src="factory.photo" @photo="(p) => factory.photo = p" />
			</span>
		</div>
		<div class="flex flex-col gap-4 modal-padding-x">
			<ion-input v-model="factory.name"
				class="w-full text-left bg-new_gray rounded-md"
				placeholder="Add a title"
				show-cancel-button="never"
			/>
			<ion-input v-model="factory.description"
				class="w-full text-left bg-new_gray rounded-md"
				placeholder="Add a short description"
				show-cancel-button="never"
			/>

			<ion-button :disabled="loading || !factory.valid" class="btn-primary w-full" type="submit">
				<slot name="buttonText">Submit</slot>
				<ion-ripple-effect class="rounded-lg" />
			</ion-button>
			<PageLoading v-if="loading" />
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClassFactory } from '@modules/classes'
import { IonRippleEffect } from '@ionic/vue'

export default defineComponent({
	name: 'ClassForm',
	components: { IonRippleEffect },
	props: {
		factory: {
			type: ClassFactory,
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
		--color: #{$color-iconInactive} !important;
	}

	ion-label {
		@media (max-width: 640px) {
			font-size: 12px !important;
		}
	}
</style>
