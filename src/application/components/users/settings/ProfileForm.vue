<template>
	<form class="flex flex-col gap-4 justify-center" @submit.prevent="submit">
		<div class="flex flex-col items-start">
			<span class="modal-padding-x relative inline-flex items-center justify-center mt-4">
				<Avatar :editable="true" :name="factory.first" :size="64"
					:src="factory.photo" @photo="(p) => { factory.photo = p; updateProfile(true) }" />
			</span>
		</div>
		<div class="flex flex-col gap-4 modal-padding-x">
			<div class="flex flex-col items-start">
				<div class="flex w-full gap-4">
					<div class="flex flex-col w-1/2">
						<ion-label class="font-bold text-sm mb-2">First Name</ion-label>
						<ion-input v-model="factory.first"
							:class="{'valid': factory.isValid('first'), 'invalid': factory.errors.first}"
							:size="24"
							placeholder="First Name"
							position="floating" type="text" />
						<DisplayError :error="factory.errors.first" />
					</div>
					<div class="flex flex-col w-1/2">
						<ion-label class="font-bold text-sm mb-2">Last Name</ion-label>
						<ion-input v-model="factory.last"
							:class="{'valid': factory.isValid('last'), 'invalid': factory.errors.last}"
							:size="24" placeholder="Last Name"
							position="floating"
							type="text" />
						<DisplayError :error="factory.errors.last" />
					</div>
				</div>
			</div>

			<div class="flex flex-col items-start">
				<ion-label class="font-bold text-sm mb-2">Bio</ion-label>
				<ion-textarea v-model="factory.description"
					:class="{'valid': factory.isValid('description'), 'invalid': factory.errors.description}"
					placeholder="Short description on your profile"
					rows="3" show-cancel-button="never" />
			</div>

			<div class="flex w-full justify-end gap-2 items-center">
				<ion-button :disabled="loading || !factory.valid" class="btn-primary w-24 btn-sm" type="submit">
					<SpinLoading v-if="loading" />
					<span v-else>Next</span>
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
