<template>
	<Auth>
		<div class="w-full h-full flex">
			<div class="w-7/12 lg:flex flex-col items-center justify-center h-full hidden">
				<h1 class="text-5xl font-extrabold mb-12">Reset Password</h1>
				<img alt="" class="object-contain h-[65%]" src="@app/assets/images/auth/auth.png">
			</div>
			<div class="flex flex-col items-center mt-6 md:justify-center lg:w-5/12 w-full p-4">
				<form class="h-[65%] w-full md:w-[70%] flex flex-col gap-4" @submit.prevent="resetPassword">
					<div class="flex flex-col">
						<ion-label class="font-bold text-sm mb-2">Password</ion-label>
						<ion-input v-model="factory.password"
							:class="{'valid': factory.isValid('password'), 'invalid': factory.errors.password}"
							:size="24"
							placeholder="Enter new password" position="floating" type="password" />
						<DisplayError :error="factory.errors.password" />
					</div>
					<div class="flex flex-col">
						<ion-label class="font-bold text-sm mb-2">Confirm Password</ion-label>
						<ion-input v-model="factory.cPassword"
							:class="{'valid': factory.isValid('cPassword'), 'invalid': factory.errors.cPassword}"
							:size="24"
							placeholder="Confirm new password" position="floating" type="password" />
						<DisplayError :error="factory.errors.cPassword" />
					</div>
					<ion-button :disabled="loading || !factory.valid" class="w-full text-sm btn-primary mt-2"
						type="submit">
						<SpinLoading v-if="loading" />
						<span v-else>Reset</span>
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
import { usePasswordReset } from '@app/composable/auth/passwords'
import Auth from '@app/layouts/Auth.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'AuthReset',
	displayName: 'Reset Password',
	components: { Auth },
	middlewares: ['hasQueryToken'],
	setup () {
		const { token } = useRoute().query
		const { factory, loading, resetPassword, error, message } = usePasswordReset(token as string)
		return { factory, loading, resetPassword, error, message }
	}
})
</script>
