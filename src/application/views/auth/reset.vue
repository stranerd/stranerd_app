<template>
	<ion-page>
		<ion-content>
			<div class="w-full mt-10 h-full flex flex-col items-center justify-start ">

				<div class="flex flex-col items-center justify-center p-10 lg:bg-light_gray mt-20">
					<h1 class="text-xl text-dark_gray font-bold mb-2 ">Reset Password</h1>
					<span class="normalText text-dark_gray mb-4">To reset your password, type your new password below and reset</span>
					<div class="h-[65%]">
						<form
							@submit.prevent="resetPassword"
						>
							<div class="mb-4">
								<ion-input v-model="factory.password" :size="24" placeholder="New Password"
										   position="floating"
										   required type="password"></ion-input>
								<span class="normalText text-red-500 font-semibold">{{ factory.errors.password }}</span>
							</div>
							<div class="mb-4">
								<ion-input v-model="factory.cPassword" :size="24" placeholder="Confirm New Password"
										   position="floating" required type="password" />
								<span class="normalText text-red-500 font-semibold">{{
										factory.errors.cPassword
									}}</span>
							</div>

							<ion-button class="w-full mb-4" type="submit">RESET PASSWORD
								<ion-spinner v-if="loading" name="lines-small"></ion-spinner>
							</ion-button>
						</form>
					</div>
				</div>

				<router-link class="text-primary font-bold normalText mt-8" to="/auth/signin">
					Back to Sign In
				</router-link>
			</div>

			<page-loading v-if="loading" />
		</ion-content>
	</ion-page>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePasswordReset } from '@app/composable/auth/passwords'
import { IonButton, IonContent, IonInput, IonPage, IonSpinner } from '@ionic/vue'
import PageLoading from '@app/components/core/PageLoading.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
	components: { IonContent, IonPage, IonInput, IonButton, IonSpinner, PageLoading },
	layout: 'Auth',
	middlewares: ['hasQueryToken'],
	setup () {
		const { token } = useRoute().query
		const { factory, loading, resetPassword, error, message } = usePasswordReset(token as string)

		return { factory, loading, resetPassword, error, message }
	}

})
</script>

<style lang="scss" scoped>
	ion-checkbox {
		--size: 20px;
	}

	ion-input {
		--background: #fff !important;
		--padding-start: 1.8rem !important;
		--padding-end: 1.5rem !important;
		--padding-top: .69rem !important;
		--padding-bottom: .69rem !important;
		--color: $color-dark !important;
		--placeholder-color: $color-dark !important;
		border-radius: 10px;

		@media screen and (max-width: 1024px) {
			--background: #F7F7FC !important;
		}
	}


	ion-button {
		--background: #546DD3;
		--border-radius: .4rem;
		--color: white;
		--background-hover: white;
		--padding-top: 1rem;
		--padding-bottom: 1rem;
		height: 2.75rem;
		transition: all .5s ease-in-out;

	}

</style>
