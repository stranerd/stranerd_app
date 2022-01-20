<template>
	<ion-page>
		<ion-content class="auth">
			<div class="w-full mt-10 h-full flex flex-col items-center justify-start ">
				<div class="flex flex-col items-center justify-center p-10 lg:bg-light_gray mt-20">
					<h1 class="lg:text-2xl text-xl text-main_dark font-bold mb-2 text-center">Verifying Your Email
						Address</h1>
					<span class="text-body text-main_dark mb-4 text-center">
						If an error occurred, click the button below to retry verification.
					</span>
					<div class="h-[65%]">
						<form @submit.prevent="completeVerification">
							<ion-button :disabled="loading" class="w-full mb-4 uppercase" type="submit">
								Retry Verification
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
import { useCompleteEmailVerification } from '@app/composable/auth/signin'
import { IonButton, IonContent, IonPage, IonSpinner } from '@ionic/vue'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'CompleteVerification',
	components: { IonContent, IonPage, IonButton, IonSpinner },
	middlewares: ['hasQueryToken'],
	setup () {
		const { token } = useRoute().query
		const { loading, error, completeVerification } = useCompleteEmailVerification(token as string)
		return { loading, error, completeVerification }
	}
})
</script>
