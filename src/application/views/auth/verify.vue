<template>
	<AuthLayout>
		<form class="flex flex-col lg:w-6/12 sm:w-8/12 w-full p-4 mx-auto pt-8 gap-5"
			@submit.prevent="completeVerification">
			<h1 class="md:text-3xl text-2xl w-full font-bold md:text-center">
				Verify Your Account
			</h1>

			<div class="flex flex-col">
				<IonLabel class="text-secondaryText mb-2">OTP</IonLabel>
				<div class="flex gap-2 items-center">
					<IonInput v-model="token" :size="24" class="w-full" placeholder="Enter OTP sent to your email"
						position="floating" />
				</div>
			</div>

			<a class="justify-center flex items-center text-primaryBg text-sm gap-2"
				@click="sendVerificationEmail">
				<SpinLoading v-if="loading" />
				<span>Did not receive OTP? Resend?</span>
			</a>

			<IonButton :disabled="loading || !token" class="w-full btn-primary" type="submit">
				<SpinLoading v-if="loading" />
				<span v-else>Complete Verification</span>
			</IonButton>

			<router-link class="mx-auto text-primaryBg text-sm" to="/auth/signin">
				Back to Sign in
			</router-link>
		</form>
	</AuthLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getEmailVerificationEmail, useEmailVerification } from '@app/composable/auth/signin'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AuthVerify',
	beforeRouteEnter: generateMiddlewares([async () => {
		if (!getEmailVerificationEmail()) return '/auth/signin'
	}]),
	setup () {
		useRouteMeta('Verify Email', { back: true })
		const {
			email, token, loading, error, message,
			completeVerification, sendVerificationEmail
		} = useEmailVerification()
		return {
			email, loading, error, message, token,
			sendVerificationEmail, completeVerification
		}
	}
})
</script>
