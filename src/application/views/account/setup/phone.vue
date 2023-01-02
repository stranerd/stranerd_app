<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div class="h-full page-padding">
			<form class="flex flex-col gap-4 h-full">
				<div class="flex flex-col">
					<IonLabel class="text-secondaryText mb-2">Phone</IonLabel>
					<div class="flex gap-2 items-center">
						<PhoneInput v-model:value="factory.phone" class="w-full" />
						<IonButton v-if="sent" :disabled="!factory.phone" class="btn-primary"
							@click="sendVerificationText">
							<IonIcon slot="icon-only" :icon="sent ? refreshOutline : checkmarkOutline" />
						</IonButton>
					</div>
				</div>

				<template v-if="sent">
					<div class="flex flex-col">
						<IonLabel class="text-secondaryText mb-2">OTP</IonLabel>
						<IonInput v-model="token" :size="24" placeholder="Enter OTP sent to your phone"
							position="floating" />
					</div>

					<div class="flex gap-4 items-center mt-auto">
						<IonButton class="btn-outline w-full" type="button" @click.prevent="skip">
							Skip
						</IonButton>
						<IonButton :disabled="loading || !token" class="w-full btn-primary" @click.prevent="submit">
							<SpinLoading v-if="loading" />
							<span v-else>Verify Phone</span>
						</IonButton>
					</div>
				</template>

				<template v-else>
					<IonButton :disabled="loading || !factory.phone" class="w-full btn-primary"
						@click.prevent="sendVerificationText">
						<SpinLoading v-if="loading" />
						<span v-else>Send OTP</span>
					</IonButton>
				</template>
			</form>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { saveSchoolState } from '@app/composable/auth/session'
import { usePhoneUpdate } from '@app/composable/auth/profile'
import { useRouter } from 'vue-router'
import { checkmarkOutline, refreshOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'AccountSetupPhone',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Account setup', { back: true })

		const router = useRouter()
		const { factory, error, loading, token, sendVerificationText, sent, completeVerification } = usePhoneUpdate()
		const skip = async () => {
			await saveSchoolState()
			await router.push('/dashboard')
		}
		const submit = async () => {
			await completeVerification()
			await router.push('/account/setup/school')
		}

		return {
			factory, error, loading, submit, sendVerificationText, token, sent,
			checkmarkOutline, refreshOutline, skip
		}
	}
})
</script>
