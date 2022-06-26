<template>
	<DefaultLayout>
		<template v-slot:panel>
			<SettingsPanel />
		</template>
		<form class="flex flex-col !gap-6 justify-center card-padding !py-0" @submit.prevent="updateProfile()">
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

			<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary" type="submit">
				<SpinLoading v-if="loading" />
				<span v-else>Submit</span>
			</IonButton>
		</form>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useProfileUpdate } from '@app/composable/auth/profile'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { UploadedFile } from '@modules/core'
import SettingsPanel from '@app/components/layout/panels/SettingsPanel.vue'

export default defineComponent({
	name: 'SettingsProfile',
	components: { SettingsPanel },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Edit Profile', { back: true })
		const { factory, error, loading, updateProfile } = useProfileUpdate()
		const savePhoto = async (p: UploadedFile) => {
			factory.value.photo = p
			await updateProfile(true)
		}
		return { factory, error, loading, updateProfile, savePhoto }
	}
})
</script>
