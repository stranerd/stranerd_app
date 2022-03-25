<template>
	<Auth>
		<div class="w-full h-full flex flex-col items-center justify-start bg-white py-20">
			<div class="flex flex-col items-center justify-center p-10 lg:bg-light_gray">
				<h1 class="text-heading text-main_dark font-bold mb-2 ">Forgot Password</h1>
				<span class="text-main_dark mb-4">Enter your email to reset your password</span>
				<div class="h-[65%]">
					<form @submit.prevent="sendResetEmail">
						<div class="mb-4">
							<ion-input v-model.trim="factory.email" :size="24" inputmode="email"
								placeholder="Email Address" position="floating"
								required type="email" />
							<DisplayError :error="factory.errors.email" />
						</div>
						<ion-button class="w-full mb-4" type="submit">Reset Password
							<ion-spinner v-if="loading" name="lines-small"></ion-spinner>
						</ion-button>
					</form>
				</div>
				<router-link class="text-primary font-bold mt-8" to="/auth/signin">
					Back to Sign In
				</router-link>
			</div>
		</div>
	</Auth>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePasswordResetRequest } from '@app/composable/auth/passwords'
import { IonButton, IonInput, IonSpinner } from '@ionic/vue'
import Auth from '@app/layouts/Auth.vue'

export default defineComponent({
	name: 'AuthForgot',
	displayName: 'Forgot Password?',
	components: { IonInput, IonButton, IonSpinner, Auth },
	middlewares: ['isNotAuthenticated'],
	setup () {
		const { factory, loading, error, sendResetEmail, message } = usePasswordResetRequest()
		return { factory, loading, error, sendResetEmail, message }
	}
})
</script>
