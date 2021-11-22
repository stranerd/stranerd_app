<template>
	<ion-page>
		<ion-content>
			<div class="w-full mt-10 h-full flex flex-col items-center justify-start ">

				<div class="flex flex-col items-center justify-center p-10 lg:bg-light_gray mt-20">
					<h1 class="text-xl text-main_dark font-bold mb-2 ">Forgot Password</h1>
					<span class="normalText text-main_dark mb-4">Enter your email to reset your password</span>
					<div class="h-[65%]">
						<form
							@submit.prevent="sendResetEmail"
						>
							<div class="mb-4">
								<ion-input v-model="factory.email" :size="24" placeholder="Email Address"
									position="floating"
									required type="email"></ion-input>
								<span class="normalText text-red-500 font-semibold">{{ factory.errors.email }}</span>
							</div>

							<ion-button class="w-full mb-4" type="submit">RESET PASSWORD
								<ion-spinner v-if="loading" name="lines-small"></ion-spinner>
							</ion-button>
						</form>
					</div>
				</div>

				<router-link class="text-primary font-bold normalText mt-8" to="/auth/signin">
					Back to Sign In
				</router-link>
			</div>
		</ion-content>
	</ion-page>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePasswordResetRequest } from '@app/composable/auth/passwords'
import { IonButton, IonContent, IonInput, IonPage, IonSpinner } from '@ionic/vue'

export default defineComponent({
	name: 'ForgotPassword',
	components: { IonContent, IonPage, IonInput, IonButton, IonSpinner },
	setup () {

		const { factory, loading, error, sendResetEmail, message } = usePasswordResetRequest()

		return { factory, loading, error, sendResetEmail, message }
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
