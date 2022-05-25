<template>
	<Justified>
		<div class="lg:w-8/12 w-full mx-auto md:p-4 lg:py-8 max-w-[800px]">
			<form class="border-bottom-line flex flex-col md:rounded-xl bg-white py-4 md:py-6 gap-4"
				@submit.prevent="updateProfile()">
				<div class="px-4 md:px-6">
					<ion-text class="text-secondaryText font-bold">Edit profile</ion-text>
				</div>
				<div class="flex flex-col items-start">
					<span class="modal-padding-x relative top-[-40px] inline-flex items-center justify-center -mb-10">
						<Avatar :editable="true" :name="factory.first" :size="80"
							:src="factory.photo" @photo="(p) => { factory.photo = p; updateProfile(true) }" />
					</span>
				</div>
				<div class="px-4 md:px-6">
					<ion-text class="text-heading text-secondaryText font-bold text-left mb-1">Name</ion-text>
					<div class="flex items-center justify-center gap-2 md:gap-4 w-full">
						<div class="rounded-lg w-1/2">
							<IonInput v-model="factory.first" class="font-medium border border-faded_gray "
								placeholder="First name" />
						</div>
						<div class="rounded-lg w-1/2">
							<IonInput v-model="factory.last" class="border border-faded_gray font-medium"
								placeholder="Last name" />
						</div>
					</div>
				</div>
				<div class="px-4 md:px-6">
					<ion-text class="text-heading text-secondaryText font-bold text-left mb-1">Bio</ion-text>
					<div class="flex md:flex-row items-center justify-center flex-col w-full">
						<div class="rounded-lg w-full">
							<IonTextarea v-model="factory.description"
								class="border border-faded_gray focus:outline-none w-full"
								placeholder="Tell us a little more about yourself"
								rows="6" />
						</div>
					</div>
				</div>
				<div class="px-4 md:px-6 flex">
					<ion-button :disabled="loading" class="btn-primary w-40" type="submit">
						Save Profile
						<SpinLoading v-if="loading" />
					</ion-button>
				</div>
			</form>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { useProfileUpdate } from '@app/composable/auth/profile'
import { IonTextarea } from '@ionic/vue'

export default defineComponent({
	name: 'SettingsProfile',
	displayName: 'Edit Profile',
	components: { Justified, IonTextarea },
	middlewares: ['isAuthenticated'],
	setup () {
		const { factory, error, loading, updateProfile } = useProfileUpdate()
		return { factory, error, loading, updateProfile }
	}
})
</script>

<style lang="scss" scoped>
	ion-button {
		--background: #{$color-primary};
		--box-shadow: none;
		height: 2.75rem;
	}

	ion-input, ion-textarea {
		--border-width: 1px !important;
		--border-style: solid !important;
	}
</style>
