<template>
	<Auth>

		<div class="w-full md:min-h-[102vh] min-h-[120vh]  h-full flex bg-white">
			<div
				class="bg-primary w-7/12 lg:flex flex-col  items-center justify-center h-full hidden  absolute bottom-0">
				<h1 class="text-5xl  text-white font-extrabold mb-12">Studying has never been easier</h1>
				<img alt="" class="object-contain h-[65%]" src="@app/assets/images/auth/auth.png ">
			</div>


			<div class="flex flex-col items-center justify-center lg:w-5/12 w-full ml-auto">
				<h1 class="md:text-5xl text-2xl  text-main_dark font-extrabold mb-12 text-center">Sign up today</h1>
				<div class="h-[65%]">
					<form
						@submit.prevent="signup"
					>
						<div class="mb-4">
							<ion-input v-model="factory.first" :size="24" placeholder="First Name"
								position="floating"
								type="text"></ion-input>
							<span class="text-body text-red-500 font-semibold">{{ factory.errors.first }}</span>
						</div>
						<div class="mb-4">
							<ion-input v-model="factory.last" :size="24" placeholder="Last Name" position="floating"
								type="text"></ion-input>
							<span class="text-body text-red-500 font-semibold">{{ factory.errors.last }}</span>
						</div>
						<div class="mb-4">
							<ion-input v-model="factory.email" :size="24" placeholder="Email Address"
								position="floating"
								type="email"></ion-input>
							<span class="text-body text-red-500 font-semibold">{{ factory.errors.email }}</span>
						</div>
						<div class="mb-4">
							<ion-input v-model="factory.password" :size="24" placeholder="Password"
								position="floating"
								type="password"></ion-input>
							<span class="text-body text-red-500 font-semibold">{{ factory.errors.password }}</span>
						</div>
						<div class="mb-4">
							<ion-input v-model="factory.cPassword" :size="24" placeholder="Confirm Password"
								position="floating"
								type="password"></ion-input>
							<span
								class="text-body text-red-500 font-semibold">{{ factory.errors.cPassword }}</span>
						</div>

						<ion-button class="w-full mb-4 !capitalize" type="submit">Sign up
							<ion-spinner v-if="loading" name="lines-small"></ion-spinner>
						</ion-button>
					</form>

					<div class="flex justify-between px-5 items-center mt-8">
						<div class="border-faded_gray border-b h-1 w-4/12" />
						<span class="font-nuni text-faded_gray">or use</span>
						<div class="border-faded_gray border-b h-1 w-4/12" />
					</div>

					<AuthProviders />
					<!-- <span
							class="text-xs flex flex-wrap justify-center items-center text-icon_inactive mt-8 max-w-full text-center">
							By signing up, you accept the Stranerd 	<router-link
								class="text-primary font-bold text-body mx-1"
								to="/auth/signup"> Terms and Conditions
							</router-link> & <router-link class="text-primary font-bold text-body mx-1"
								to="/auth/signup">
								Privacy Policy.
							</router-link>
						</span> -->

					<span class="text- w-full flex justify-center items-center text-icon_inactive mt-8 mb-5">
						Have an account?



						<router-link class="text-primary font-bold text-body" to="/auth/signin">
							Sign In
						</router-link>

					</span>
				</div>
			</div>
		</div>

	</Auth>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEmailSignup } from '@app/composable/auth/signin'
import { IonButton, IonInput, IonSpinner } from '@ionic/vue'
import AuthProviders from '@app/components/auth/AuthProviders.vue'
import Auth from '@app/layouts/Auth.vue'

export default defineComponent({
	name: 'Signup',
	components: { IonInput, IonButton, AuthProviders, IonSpinner, Auth },
	middlewares: ['isNotAuthenticated'],
	setup () {

		const { factory, loading, error, signup } = useEmailSignup()

		return { factory, loading, error, signup }
	}

})
</script>

<style lang="scss" scoped>
	ion-checkbox {
		--size: 20px;
	}

	ion-input {
		--background: #F2F3F5 !important;
		--padding-start: 1.8rem !important;
		--padding-end: 1.5rem !important;
		--padding-top: 1.2rem !important;
		--padding-bottom: 1.2rem !important;
		--color: $color-dark !important;
		--placeholder-color: $color-dark !important;
		border-radius: 10px;
		margin-bottom: 1.25rem;
		width: 420px;
		max-width: 90vw !important;
	}


	ion-button {
		--background: #546DD3;
		--border-radius: .75rem;
		--color: white;
		--background-hover: white;
		--padding-top: 1.4rem !important;
		--padding-bottom: 1.4rem !important;
		height: 3.5rem;
		font-size: 24px;
		font-weight: 700;
		transition: all .5s ease-in-out;
		max-width: 90vw !important;

	}

</style>
