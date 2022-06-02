<template>
	<Auth>
		<div class="w-full h-full flex">
			<div class="w-7/12 lg:flex flex-col items-center justify-center h-full hidden">
				<h1 class="text-5xl font-extrabold mb-12">Verify Email Address</h1>
				<img alt="" class="object-contain h-[65%]" src="@app/assets/images/auth/auth.png">
			</div>
			<div class="flex flex-col items-center mt-6 md:justify-center lg:w-5/12 w-full p-4">
				<form class="h-[65%] w-full md:w-[70%] flex flex-col gap-4" @submit.prevent="completeVerification">
					<span class="text-heading2 font-bold text-center">Verify Your Email Address</span>
					<div class="flex flex-col">
						<IonLabel class="font-bold mb-2">OTP</IonLabel>
						<IonInput v-model="token" :size="24" placeholder="Enter OTP" position="floating" />
					</div>
					<p class="cursor-pointer justify-center flex items-center gap-2" @click="sendVerificationEmail">
						<SpinLoading v-if="loading" />
						<span>Did not receive OTP? Resend?</span>
					</p>
					<IonButton :disabled="completeLoading || !token" class="w-full text-sm btn-primary mt-2"
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
	</Auth>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
	getEmailVerificationEmail,
	useCompleteEmailVerification,
	useEmailVerificationRequest
} from '@app/composable/auth/signin'
import Auth from '@app/layouts/Auth.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AuthVerify',
	components: { Auth },
	beforeRouteEnter: generateMiddlewares([async () => {
		if (!getEmailVerificationEmail()) return '/auth/signin'
	}]),
	setup () {
		useRouteMeta('Verify Email')
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
