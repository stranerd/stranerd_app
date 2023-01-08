<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div class="h-full page-padding">
			<form class="flex flex-col gap-4 h-full" @submit.prevent="submit">
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

				<div class="flex gap-4 items-center mt-auto">
					<IonButton class="btn-outline w-full" type="button" @click.prevent="skip">
						Skip Setup
					</IonButton>
					<IonButton :disabled="loading || !factory.valid" class="btn-primary w-full" type="submit">
						<SpinLoading v-if="loading" />
						<span v-else>Next</span>
					</IonButton>
				</div>
			</form>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { saveSchoolState } from '@app/composable/auth/session'
import { useProfileUpdate } from '@app/composable/auth/profile'
import { UploadedFile } from '@modules/core'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'AccountSetup',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		const router = useRouter()
		useRouteMeta('Account setup', {})

		const { factory, loading, error, updateProfile } = useProfileUpdate()
		const savePhoto = async (p: UploadedFile) => {
			factory.value.photo = p
			await updateProfile(true)
		}

		const skip = async () => {
			await saveSchoolState()
			await router.push('/dashboard')
		}
		const submit = async () => {
			await updateProfile(true)
			await router.push('/account/setup/phone')

		}
		return { factory, loading, error, updateProfile, submit, savePhoto, skip }
	}
})
</script>
