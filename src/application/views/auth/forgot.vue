<template>
	<AuthLayout>
		<div class="flex items-center justify-center">
		
			<div class="flex flex-col items-center justify-center  lg:w-6/12 sm:w-8/12 w-full p-4">
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
	</AuthLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePasswordReset } from '@app/composable/auth/passwords'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { checkmarkOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'AuthForgot',
	beforeRouteEnter: generateMiddlewares(['isNotAuthenticated']),
	setup () {
		useRouteMeta('Reset Password', { back: true })
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
