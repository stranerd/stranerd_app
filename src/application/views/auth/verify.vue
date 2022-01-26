<template>
	<ion-page>
		<ion-content class="auth">
			<div class="w-full mt-10 h-full flex flex-col items-center justify-start">
				<div class="flex flex-col items-center justify-center p-10 lg:bg-light_gray mt-20">
					<h1 class="lg:text-2xl text-xl text-main_dark font-bold mb-2 text-center">Verify Your Email
						Address</h1>
					<span class="text-body text-main_dark mb-4 text-center max-w-lg">
						An email was just sent to <b>{{ email }}</b>. Follow the link to verify your account.
						If an error occurred or you didn't receive the email, click the button below to resend the email.
					</span>
					<div class="h-[65%]">
						<form @submit.prevent="sendVerificationEmail">
							<ion-button class="w-full mb-4 uppercase" type="submit">Resend Mail
								<ion-spinner v-if="loading" name="lines-small"></ion-spinner>
							</ion-button>
						</form>
					</div>
				</div>

				<router-link class="text-primary font-bold text-body mt-8" to="/auth/signin">
					Back to Sign In
				</router-link>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getEmailVerificationEmail, useEmailVerificationRequest } from '@app/composable/auth/signin'
import { IonButton, IonContent, IonPage, IonSpinner } from '@ionic/vue'

export default defineComponent({
	name: 'AuthVerify',
	components: { IonContent, IonPage, IonButton, IonSpinner },
	middlewares: [async () => {
		if (!getEmailVerificationEmail()) return '/auth/signin'
	}],
	setup () {
		const { email, loading, error, message, sendVerificationEmail } = useEmailVerificationRequest()
		return { email, loading, error, message, sendVerificationEmail }
	}
})
</script>
