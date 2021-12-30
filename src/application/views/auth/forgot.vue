<template>
	<Auth>
		<div class="w-full mt-10 h-full flex flex-col items-center justify-start bg-white">

			<div class="flex flex-col items-center justify-center p-10 lg:bg-light_gray mt-20">
				<h1 class="text-xl text-main_dark font-bold mb-2 ">Forgot Password</h1>
				<span class="text-body text-main_dark mb-4">Enter your email to reset your password</span>
				<div class="h-[65%]">
					<form
						@submit.prevent="sendResetEmail"
					>
						<div class="mb-4">
							<ion-input v-model="factory.email" :size="24" placeholder="Email Address"
								position="floating"
								required type="email"></ion-input>
							<span class="text-body text-red-500 font-semibold">{{ factory.errors.email }}</span>
						</div>

						<ion-button class="w-full mb-4" type="submit">RESET PASSWORD
							<ion-spinner v-if="loading" name="lines-small"></ion-spinner>
						</ion-button>
					</form>
				</div>
			</div>

			<router-link class="text-primary font-bold text-body mt-8" to="/auth/signin">
				Back to Sign In
			</router-link>
		</div>

	</Auth>


</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePasswordResetRequest } from '@app/composable/auth/passwords'
import { IonButton, IonInput, IonSpinner } from '@ionic/vue'
import Auth from '@app/layouts/Auth.vue'

export default defineComponent({
	name: 'ForgotPassword',
	components: { IonInput, IonButton, IonSpinner, Auth },
	middlewares: ['isNotAuthenticated'],
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
		--background: #F2F3F5 !important;
		--padding-start: 1.8rem !important;
		--padding-end: 1.5rem !important;
		--padding-top: 1.2rem !important;
		--padding-bottom: 1.2rem !important;
		--color: $color-dark !important;
		--placeholder-color: $color-dark !important;
		border-radius: 10px;
		margin-bottom: 1.25rem;
		width: 420px;
		max-width: 90vw !important;
	}


	ion-button {
		--background: #546DD3;
		--border-radius: .75rem;
		--color: white;
		--background-hover: white;
		--padding-top: 1.4rem !important;
		--padding-bottom: 1.4rem !important;
		height: 3.5rem;
		font-size: 24px;
		font-weight: 700;
		transition: all .5s ease-in-out;
		max-width: 90vw !important;

	}
</style>
