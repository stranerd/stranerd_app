<template>
	<ion-page>
		<ion-content>
			<div class="w-full mt-10 h-full flex flex-col items-center justify-start ">

				<div class="flex flex-col items-center justify-center p-10 lg:bg-light_gray mt-20">
					<h1 class="lg:text-2xl text-xl text-main_dark font-bold mb-2 text-center">Verify Your Email
						Address</h1>
					<span class="text-body text-main_dark mb-4 text-center max-w-lg">
						An email was just sent to <b>{{ email }}</b>. Follow the link to verify your account.
						If an error occurred or you didn't receive the email, click the button below to resend the email.
					</span>
					<div class="h-[65%]">
						<form
							@submit.prevent="sendVerificationEmail"
						>
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
import { defineComponent, onMounted } from 'vue'
import { useEmailVerificationRequest } from '@app/composable/auth/signin'
import { IonButton, IonContent, IonPage, IonSpinner } from '@ionic/vue'

export default defineComponent({
	name: 'EmailVerificationRequest',
	components: { IonContent, IonPage, IonButton, IonSpinner },
	middlewares: ['isAuthenticated'],
	setup () {
		const { email, loading, error, message, sendVerificationEmail } = useEmailVerificationRequest()
		onMounted(sendVerificationEmail)

		return { email, loading, error, message, sendVerificationEmail }
	}

})
</script>

<style lang="scss" scoped>
	ion-checkbox {
		--size: 20px;
	}

	ion-input {
		--background: #fff !important;
		--padding-start: 1.8rem !important;
		--padding-end: 1.5rem !important;
		--padding-top: .69rem !important;
		--padding-bottom: .69rem !important;
		--color: $color-dark !important;
		--placeholder-color: $color-dark !important;
		border-radius: 10px;

		@media screen and (max-width: 1024px) {
			--background: #F7F7FC !important;
		}
	}


	ion-button {
		--background: #546DD3;
		--border-radius: .4rem;
		--color: white;
		--background-hover: white;
		--padding-top: 1rem;
		--padding-bottom: 1rem;
		height: 2.75rem;
		transition: all .5s ease-in-out;

	}

</style>
