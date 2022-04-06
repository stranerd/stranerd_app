<template>
	<ion-page>
		<ion-content class="auth">
			<div class="w-full mt-10 h-full flex flex-col items-center justify-start py-20">
				<div class="flex flex-col items-center justify-center p-10 lg:bg-light_gray">
					<h1 class="text-xl text-main_dark font-bold mb-2 ">Reset Password</h1>
					<span
						class="text-main_dark mb-4">To reset your password, type your new password below and reset</span>
					<div class="h-[65%]">
						<form
							@submit.prevent="resetPassword"
						>
							<div class="mb-4">
								<ion-input v-model="factory.password" :size="24" placeholder="New Password"
									position="floating"
									required type="password"></ion-input>
								<DisplayError :error="factory.errors.password" />
							</div>
							<div class="mb-4">
								<ion-input v-model="factory.cPassword" :size="24" placeholder="Confirm New Password"
									position="floating" required type="password" />
								<DisplayError :error="factory.errors.cPassword" />
							</div>
							<ion-button class="w-full mb-4" type="submit">Reset Password
								<BlockLoading v-if="loading" />
							</ion-button>
						</form>
					</div>
					<router-link class="text-primary font-bold mt-8" to="/auth/signin">
						Back to Sign In
					</router-link>
				</div>
			</div>
			<page-loading v-if="loading" />
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePasswordReset } from '@app/composable/auth/passwords'
import { IonButton, IonContent, IonInput, IonPage } from '@ionic/vue'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'AuthReset',
	displayName: 'Reset Password',
	components: { IonContent, IonPage, IonInput, IonButton },
	middlewares: ['hasQueryToken'],
	setup () {
		const { token } = useRoute().query
		const { factory, loading, resetPassword, error, message } = usePasswordReset(token as string)
		return { factory, loading, resetPassword, error, message }
	}
})
</script>
