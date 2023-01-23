<template>
	<DefaultLayout>
		<form class="flex flex-col page-padding gap-6 justify-center">
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

				<IonButton :disabled="loading || !token" class="w-full btn-primary" @click.prevent="complete">
					<SpinLoading v-if="loading" />
					<span v-else>Verify Phone</span>
				</IonButton>
			</template>

			<template v-else>
				<IonButton :disabled="loading || !factory.phone" class="w-full btn-primary"
					@click.prevent="sendVerificationText">
					<SpinLoading v-if="loading" />
					<span v-else>Send OTP</span>
				</IonButton>
			</template>
		</form>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePhoneUpdate } from '@app/composable/auth/profile'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { useRouter } from 'vue-router'
import { checkmarkOutline, refreshOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'SettingsPhone',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Edit Phone', { back: true })
		const router = useRouter()
		const { factory, error, loading, token, sendVerificationText, sent, completeVerification } = usePhoneUpdate()
		const complete = async () => {
			await completeVerification()
			await router.push('/account')
		}
		return {
			factory, error, loading, complete, sendVerificationText, token, sent,
			checkmarkOutline, refreshOutline
		}
	}
})
</script>
