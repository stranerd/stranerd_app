<template>
	<Auth>
		<div class="w-full h-full flex">
			<div class="w-7/12 lg:flex flex-col items-center justify-center h-full hidden">
				<h1 class="text-5xl font-extrabold mb-12">Welcome back</h1>
				<img alt="" class="object-contain h-[65%]" src="@app/assets/images/auth/auth.png">
			</div>
			<div class="flex flex-col items-center mt-6 md:justify-center lg:w-5/12 w-full p-4">
				<h1 class="md:block text-5xl hidden font-extrabold mb-8 text-center">Forgot Password?</h1>
				<form class="h-[65%] w-full md:w-[70%] flex flex-col gap-4" @submit.prevent="resetPassword">
					<div class="flex flex-col">
						<IonLabel class="font-bold mb-2">Email</IonLabel>
						<div class="flex gap-2 items-center">
							<IonInput v-model.trim="factory.email"
								:class="{'valid': factory.isValid('email'), 'invalid': factory.errors.email}"
								:size="24" class="w-full" inputmode="email"
								placeholder="Enter your email address" position="floating" type="email"
								@keyup.enter="null" />
							<IonButton :disabled="!factory.isValid('email')" class="btn-primary"
								@click="sendResetEmail">
								<IonIcon slot="icon-only" :icon="checkmarkOutline" />
							</IonButton>
						</div>
						<DisplayError :error="factory.errors.email" />
					</div>
					<template v-if="sent">
						<div class="flex flex-col">
							<IonLabel class="font-bold mb-2">Password</IonLabel>
							<IonInput v-model="factory.password"
								:class="{'valid': factory.isValid('password'), 'invalid': factory.errors.password}"
								:size="24"
								placeholder="Enter new password" position="floating" type="password" />
							<DisplayError :error="factory.errors.password" />
						</div>
						<div class="flex flex-col">
							<IonLabel class="font-bold mb-2">Confirm Password</IonLabel>
							<IonInput v-model="factory.cPassword"
								:class="{'valid': factory.isValid('cPassword'), 'invalid': factory.errors.cPassword}"
								:size="24"
								placeholder="Confirm new password" position="floating" type="password" />
							<DisplayError :error="factory.errors.cPassword" />
						</div>
						<div class="flex flex-col">
							<IonLabel class="font-bold mb-2">OTP</IonLabel>
							<IonInput v-model="factory.token" :size="24" placeholder="Enter OTP sent to mail"
								position="floating" />
						</div>
						<IonButton :disabled="loading || !factory.valid"
							class="w-full btn-primary mt-2" type="submit">
							<SpinLoading v-if="loading" />
							<span v-else>Reset</span>
						</IonButton>
					</template>
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
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { checkmarkOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'AuthForgot',
	components: { Auth },
	beforeRouteEnter: generateMiddlewares(['isNotAuthenticated']),
	setup () {
		useRouteMeta('Reset Password')
		const {
			factory, loading, error, message, sent, sendResetEmail, resetPassword
		} = usePasswordReset()
		return {
			factory, sent, loading, error, sendResetEmail, message, resetPassword,
			checkmarkOutline
		}
	}
})
</script>
