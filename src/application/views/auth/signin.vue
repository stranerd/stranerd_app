<template>
	<ion-page>
		<ion-content>
			<div class="w-full mt-10 h-full flex ">
				<div class="bg-butter_yellow w-1/2 lg:flex flex-col  items-center justify-center h-full hidden ">
					<h1 class="text-xl  text-dark_gray font-bold mb-5">Welcome back!</h1>
					<img alt="" class="h-[65%]" src="@app/assets/images/auth/signin.png">
				</div>

				<div class="flex flex-col items-center justify-center lg:w-1/2 w-full">
					<h1 class="text-xl text-dark_gray font-bold mb-5 lg:hidden ">Welcome back!</h1>
					<h1 class="headings lg:text-xl  text-dark_gray font-bold mb-5 text-center">sign In <span
						class="lg:hidden"> to continue </span></h1>
					<div class="h-[65%]">
						<form
							@submit.prevent="signin"
						>
							<div class="mb-4">
								<ion-input v-model="factory.email" :size="24" placeholder="Email Address"
									position="floating"
									type="email"></ion-input>
								<span class="normalText text-red-500 font-semibold">{{ factory.errors.email }}</span>
							</div>
							<div class="mb-4">
								<ion-input v-model="factory.password" :size="24" placeholder="Password"
									position="floating"
									type="password"></ion-input>
								<span class="normalText text-red-500 font-semibold">{{ factory.errors.password }}</span>
							</div>
							<ion-button :disabled="loading" class="w-full mb-4" type="submit">SIGN IN
								<ion-spinner v-if="loading" name="lines-small"></ion-spinner>
							</ion-button>
						</form>
						<div class="w-full flex justify-between items-center  text-dark_gray">
							<div class="flex justify-between items-center gap-2">
								<ion-checkbox checked="true" color="primary" mode="ios"></ion-checkbox>
								<span class="normalText">Stay signed in</span>
							</div>

							<router-link class="underline normalText" to="/auth/Forgot">
								Forgot Password
							</router-link>
						</div>

						<div class="flex justify-between px-5 items-center mt-8">
							<div class="border-faded_gray border-b h-1 w-4/12" />
							<span class="text-faded_gray">or use</span>
							<div class="border-faded_gray border-b h-1 w-4/12" />
						</div>

						<AuthProviders />

						<span class="text- w-full flex justify-center items-center text-icon_inactive mt-8">
							Don’t have an account?

							<router-link class="text-primary font-bold normalText" to="/auth/signup">
								Sign Up
							</router-link>

						</span>
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEmailSignin } from '@app/composable/auth/signin'
import { IonButton, IonCheckbox, IonContent, IonInput, IonPage, IonSpinner } from '@ionic/vue'
import AuthProviders from '@app/components/auth/AuthProviders.vue'

export default defineComponent({
	components: { IonContent, IonPage, IonInput, IonButton, IonCheckbox, AuthProviders, IonSpinner },
	layout: 'auth',
	middlewares: ['isNotAuthenticated'],
	setup () {
		const { factory, loading, error, signin } = useEmailSignin()

		return { factory, loading, error, signin }
	}

})
</script>

<style lang="scss" scoped>
	ion-checkbox {
		--size: 20px;
	}

	ion-input {
		--background: #F7F7FC !important;
		--padding-start: 1.8rem !important;
		--padding-end: 1.5rem !important;
		--padding-top: .69rem !important;
		--padding-bottom: .69rem !important;
		--color: $color-dark !important;
		--placeholder-color: $color-dark !important;
		border-radius: 10px;
		margin-bottom: 1.25rem;
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
