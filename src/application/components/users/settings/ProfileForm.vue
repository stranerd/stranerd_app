<template>
	<form class="flex flex-col gap-4 justify-center" @submit.prevent="submit">
		<Avatar :editable="true" :name="factory.first" :size="64" :src="factory.photo" @photo="savePhoto" />
		<div class="flex flex-col items-start">
			<div class="flex w-full gap-4">
				<div class="flex flex-col w-1/2">
					<IonLabel class="font-bold text-sm mb-2">First Name</IonLabel>
					<IonInput v-model="factory.first"
						:class="{'valid': factory.isValid('first'), 'invalid': factory.errors.first}"
						:size="24"
						placeholder="First Name"
						position="floating" type="text" />
					<DisplayError :error="factory.errors.first" />
				</div>
				<div class="flex flex-col w-1/2">
					<IonLabel class="font-bold text-sm mb-2">Last Name</IonLabel>
					<IonInput v-model="factory.last"
						:class="{'valid': factory.isValid('last'), 'invalid': factory.errors.last}"
						:size="24" placeholder="Last Name"
						position="floating"
						type="text" />
					<DisplayError :error="factory.errors.last" />
				</div>
			</div>
		</div>

		<div class="flex flex-col items-start">
			<IonLabel class="font-bold text-sm mb-2">Bio</IonLabel>
			<IonTextarea v-model="factory.description"
				:class="{'valid': factory.isValid('description'), 'invalid': factory.errors.description}"
				placeholder="Short description on your profile"
				rows="3" show-cancel-button="never" />
		</div>

		<div class="flex w-full justify-end gap-2 items-center">
			<IonButton :disabled="loading || !factory.valid" class="btn-primary w-24" type="submit">
				<SpinLoading v-if="loading" />
				<span v-else>Next</span>
				<IonRippleEffect class="rounded-lg" />
			</IonButton>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useProfileUpdate } from '@app/composable/auth/profile'
import { UploadedFile } from '@modules/core'

export default defineComponent({
	name: 'ProfileForm',
	props: {
		next: {
			type: Function as PropType<() => any>,
			required: true
		}
	},
	setup (props) {
		const { factory, loading, error, updateProfile } = useProfileUpdate()
		const savePhoto = async (p: UploadedFile) => {
			factory.value.photo = p
			await updateProfile(true)
		}
		const submit = async () => {
			await updateProfile()
			props.next()
		}
		return { factory, loading, error, updateProfile, submit, savePhoto }
	}
})
</script>
