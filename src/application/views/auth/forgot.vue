<template>
	<AuthLayout>
		<form class="flex flex-col lg:w-6/12 sm:w-8/12 w-full p-4 mx-auto pt-16 gap-5" @submit.prevent="resetPassword">
			<h1 class="md:text-3xl text-2xl w-full font-bold md:text-center">
				Forgot your password?
			</h1>

			<div class="flex flex-col">
				<IonLabel class="text-secondaryText mb-2">Email</IonLabel>
				<div class="flex gap-2 items-center">
					<IonInput v-model.trim="factory.email"
						:class="{'valid': factory.isValid('email'), 'invalid': factory.errors.email}"
						:size="24" class="w-full" inputmode="email"
						placeholder="Enter your email" position="floating" type="email"
						@keyup.enter="null" />
					<IonButton v-if="sent" :disabled="!factory.isValid('email')" class="btn-primary"
						@click="sendResetEmail">
						<IonIcon slot="icon-only" :icon="sent ? refreshOutline : checkmarkOutline" />
					</IonButton>
				</div>
				<DisplayError :error="factory.errors.email" />
			</div>

			<template v-if="sent">
				<div class="flex flex-col">
					<IonLabel class="text-secondaryText mb-2">Password</IonLabel>
					<IonInput v-model="factory.password"
						:class="{'valid': factory.isValid('password'), 'invalid': factory.errors.password}"
						:size="24"
						placeholder="Enter new password" position="floating" type="password" />
					<DisplayError :error="factory.errors.password" />
				</div>

				<div class="flex flex-col">
					<IonLabel class="text-secondaryText mb-2">Confirm Password</IonLabel>
					<IonInput v-model="factory.cPassword"
						:class="{'valid': factory.isValid('cPassword'), 'invalid': factory.errors.cPassword}"
						:size="24"
						placeholder="Confirm new password" position="floating" type="password" />
					<DisplayError :error="factory.errors.cPassword" />
				</div>

				<div class="flex flex-col">
					<IonLabel class="text-secondaryText mb-2">OTP</IonLabel>
					<IonInput v-model="factory.token" :size="24" placeholder="Enter OTP sent to your email"
						position="floating" />
				</div>

				<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary" type="submit">
					<SpinLoading v-if="loading" />
					<span v-else>Reset Password</span>
				</IonButton>
			</template>

			<template v-else>
				<IonButton :disabled="loading || !factory.isValid('email')" class="w-full btn-primary"
					@click="sendResetEmail">
					<SpinLoading v-if="loading" />
					<span v-else>Send OTP to email</span>
				</IonButton>
			</template>

			<router-link class="mx-auto text-primaryBg text-sm" to="/auth/signin">
				Back to Sign in
			</router-link>
		</form>
	</AuthLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePasswordReset } from '@app/composable/auth/passwords'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { checkmarkOutline, refreshOutline } from 'ionicons/icons'

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
			checkmarkOutline, refreshOutline
		}
	}
})
</script>
