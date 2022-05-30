<template>
	<Auth>
		<div class="w-full h-full flex">
			<div class="w-7/12 lg:flex flex-col items-center justify-center h-full hidden">
				<h1 class="text-5xl font-extrabold mb-12">Verify Email Address</h1>
				<img alt="" class="object-contain h-[65%]" src="@app/assets/images/auth/auth.png">
			</div>
			<div class="flex flex-col items-center mt-6 md:justify-center lg:w-5/12 w-full p-4">
				<form class="h-[65%] w-full md:w-[70%] flex flex-col gap-4" @submit.prevent="sendVerificationEmail">
					<span class="text-heading2 font-bold text-center">Verify Your Email Address</span>
					<span class="text-secondaryText text-center">
						An email was just sent to <b>{{ email }}</b>. Follow the link to verify your account.
						If an error occurred or you didn't receive the email, click the button below to resend the email.
					</span>
					<IonButton :disabled="loading" class="w-full text-sm btn-primary mt-2" type="submit">
						<SpinLoading v-if="loading" />
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
import { getEmailVerificationEmail, useEmailVerificationRequest } from '@app/composable/auth/signin'
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
		return { email, loading, error, message, sendVerificationEmail }
	}
})
</script>
