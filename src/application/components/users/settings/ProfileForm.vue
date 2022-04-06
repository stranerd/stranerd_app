<template>
	<form class="flex flex-col gap-4 justify-center" @submit.prevent="submit">
		<div class="flex flex-col items-start">
			<CoverAvatar :editable="true" :src="factory.coverPhoto" class="h-20"
				@photo="(p) => { factory.coverPhoto = p; updateProfile() }" />
			<span class="modal-padding-x relative top-[-40px] inline-flex items-center justify-center -mb-10">
				<Avatar :editable="true" :name="factory.first" :size="80"
					:src="factory.photo" @photo="(p) => { factory.photo = p; updateProfile() }" />
			</span>
		</div>
		<div class="flex flex-col gap-4 modal-padding-x">
			<div class="flex flex-col items-start">
				<ion-label class="font-bold mb-1">Name</ion-label>
				<div class="flex gap-4 w-full justify-between">
					<ion-input v-model="factory.first"
						class="w-full bg-transparent border border-faded_gray rounded-md"
						placeholder="First name"
					/>
					<ion-input v-model="factory.last"
						class="w-full bg-transparent border border-faded_gray rounded-md"
						placeholder="Last name"
					/>
				</div>
			</div>

			<div class="flex flex-col items-start">
				<ion-label class="font-bold mb-1">Bio</ion-label>
				<ion-textarea v-model="factory.description"
					class="w-full bg-transparent border border-faded_gray rounded-md"
					placeholder="Short description on your profile"
					rows="3" show-cancel-button="never"
				/>
			</div>

			<div class="flex w-full justify-end gap-2 items-center">
				<ion-button :disabled="loading || !factory.valid" class="btn-primary w-24" size="small"
					type="submit">
					Next
					<SpinLoading v-if="loading" />
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
