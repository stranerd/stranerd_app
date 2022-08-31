<template>
	<AuthLayout>
		<div class="flex items-center justify-center">
			<div class="flex flex-col items-center justify-center  lg:w-6/12 sm:w-8/12 w-full p-4">
				<img alt="hero" class="mr-auto md:hidden mt-6" src="@/assets/images/auth/signup.svg">
				<h1 class="md:block md:text-3xl text-2xl text-start w-full font-extrabold mb-8 md:mt-16 mt-8 md:text-center">
					Verify Email</h1>
				<form class="h-[65%] w-full md:w-[70%] flex flex-col gap-4" @submit.prevent="completeVerification">
					<div class="flex flex-col">
						<IonLabel class="font-bold mb-2">OTP</IonLabel>
						<IonInput v-model="token" :size="24" placeholder="Enter OTP" position="floating" />
					</div>
					<p class="cursor-pointer justify-center flex items-center gap-2" @click="sendVerificationEmail">
						<SpinLoading v-if="loading" />
						<span>Did not receive OTP? Resend?</span>
					</p>
					<IonButton :disabled="completeLoading || !token" class="w-full btn-primary mt-2"
						type="submit">
						<SpinLoading v-if="completeLoading" />
						<span v-else>Resend Mail</span>
					</IonButton>
					<div class="w-full flex justify-center items-center">
						<router-link class="text-primaryBg" to="/auth/signin">
							Back to Sign In
						</router-link>
					</div>
				</form>
			</div>
		</div>
	</AuthLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
	getEmailVerificationEmail,
	useCompleteEmailVerification,
	useEmailVerificationRequest
} from '@app/composable/auth/signin'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AuthVerify',
	beforeRouteEnter: generateMiddlewares([async () => {
		if (!getEmailVerificationEmail()) return '/auth/signin'
	}]),
	setup () {
		useRouteMeta('Verify Email', { back: true })
		const { email, loading, error, message, sendVerificationEmail } = useEmailVerificationRequest()
		const {
			token, loading: completeLoading, error: completeError, completeVerification
		} = useCompleteEmailVerification()
		return {
			email, loading, error, message, sendVerificationEmail,
			token, completeLoading, completeError, completeVerification
		}
	}
})
</script>
