<template>
	<Auth>
		<div class="w-full h-full flex">
			<div class="w-7/12 lg:flex flex-col items-center justify-center h-full hidden">
				<h1 class="text-5xl font-extrabold mb-12">Welcome back</h1>
				<img alt="" class="object-contain h-[65%]" src="@app/assets/images/auth/auth.png">
			</div>
			<div class="flex flex-col items-center mt-6 md:justify-center lg:w-5/12 w-full p-4">
				<h1 class="md:block text-5xl hidden font-extrabold mb-8 text-center">Forgot Password?</h1>
				<form class="h-[65%] w-full md:w-[70%] flex flex-col gap-4" @submit.prevent="sendResetEmail">
					<div class="flex flex-col w-full">
						<ion-label class="font-bold text-sm mb-2">Email</ion-label>
						<ion-input v-model.trim="factory.email"
							:class="{'valid': factory.isValid('email'), 'invalid': factory.errors.email}"
							:size="24"
							inputmode="email" placeholder="Enter your email address" position="floating"
							type="email" />
						<DisplayError :error="factory.errors.email" />
					</div>
					<ion-button :disabled="loading || !factory.valid" class="w-full text-sm btn-primary mt-2"
						type="submit">
						<SpinLoading v-if="loading" />
						<span v-else>Retrieve Password</span>
					</ion-button>
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
import { usePasswordResetRequest } from '@app/composable/auth/passwords'
import Auth from '@app/layouts/Auth.vue'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'AuthForgot',
	displayName: 'Forgot Password?',
	components: { Auth },
	beforeRouteEnter: generateMiddlewares(['isNotAuthenticated']),
	setup () {
		const { factory, loading, error, sendResetEmail, message } = usePasswordResetRequest()
		return { factory, loading, error, sendResetEmail, message }
	}
})
</script>
