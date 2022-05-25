<template>
	<form class="flex flex-col gap-4 justify-center" @submit.prevent="submit">
		<div class="flex flex-col items-start">
		
			<span class="modal-padding-x relative inline-flex items-center justify-center mt-4">
				<Avatar :editable="true" :name="factory.first" :size="64"
					:src="factory.photo" @photo="(p) => { factory.photo = p; updateProfile(true) }" />
			</span>
		</div>
		<div class="flex flex-col gap-4 modal-padding-x">
			<div class="flex flex-col w-full">
				<ion-label class="font-bold text-sm text-main_dark mb-2">Username</ion-label>
				<ion-input v-model="factory.first" :size="24" placeholder="Username" position="floating"
					type="text"></ion-input>
				<DisplayError :error="factory.errors.last" />
			</div>
			<div class="flex flex-col items-start">
				<div class="flex w-full gap-4">
					<div class="flex flex-col w-1/2">
						<ion-label class="font-bold text-sm text-main_dark mb-2">First Name</ion-label>
						<ion-input v-model="factory.first" :size="24" placeholder="First Name"
							position="floating"
							type="text"></ion-input>
						<DisplayError :error="factory.errors.first" />
					</div>
					<div class="flex flex-col w-1/2">
						<ion-label class="font-bold text-sm text-main_dark mb-2">Last Name</ion-label>
						<ion-input v-model="factory.last" :size="24" placeholder="Last Name" position="floating"
							type="text"></ion-input>
						<DisplayError :error="factory.errors.last" />
					</div>
				</div>
			</div>

			<div class="flex flex-col items-start">
				<ion-label class="font-bold text-sm text-main_dark ">Bio</ion-label>
				<ion-textarea v-model="factory.description"
					placeholder="Short description on your profile"
					rows="3" show-cancel-button="never"
				/>
			</div>

			<div class="flex w-full justify-end gap-2 items-center">
				<ion-button :disabled="loading || !factory.valid" class="btn-primary w-24 btn-sm"
					type="submit">
					<span v-if="!loading">Next</span>
					<SpinLoading v-else />
					<ion-ripple-effect class="rounded-lg" />
				</ion-button>
			</div>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonRippleEffect, IonTextarea } from '@ionic/vue'
import { useProfileUpdate } from '@app/composable/auth/profile'

export default defineComponent({
	name: 'ProfileForm',
	props: {
		next: {
			type: Function,
			required: true
		}
	},
	components: { IonRippleEffect, IonTextarea },
	setup (props) {
		const { factory, loading, error, updateProfile } = useProfileUpdate()
		const submit = async () => {
			await updateProfile()
			props.next()
		}
		return { factory, loading, error, updateProfile, submit }
	}
})
</script>

<style lang="scss" scoped>
	ion-label {
		--color: #{$color-mainDark} !important;
		@media (max-width: 640px) {
			font-size: 12px !important;
		}
	}
</style>
