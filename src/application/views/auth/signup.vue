<template>
	<Auth>
		<div class="w-full h-full flex">
			<div class="w-7/12 lg:flex flex-col items-center justify-center h-full hidden">
				<h1 class="text-5xl font-extrabold mb-12">Studying has never been easier</h1>
				<img alt="" class="object-contain h-[65%]" src="@app/assets/images/auth/auth.png">
			</div>
			<div class="flex flex-col items-center mt-6 md:justify-center lg:w-5/12 w-full p-4">
				<h1 class="md:block text-5xl hidden font-extrabold mb-8 text-center">Sign up today</h1>
				<form class="flex flex-col gap-4" @submit.prevent="signup">
					<div class="flex w-full gap-4">
						<div class="flex flex-col w-1/2">
							<ion-label class="font-bold text-sm mb-2">First Name</ion-label>
							<ion-input v-model="factory.firstName"
								:class="{'valid': factory.isValid('firstName'), 'invalid': factory.errors.firstName}"
								:size="24"
								placeholder="First Name" position="floating" type="text" />
							<DisplayError :error="factory.errors.firstName" />
						</div>
						<div class="flex flex-col w-1/2">
							<ion-label class="font-bold text-sm mb-2">Last Name</ion-label>
							<ion-input v-model="factory.lastName"
								:class="{'valid': factory.isValid('lastName'), 'invalid': factory.errors.lastName}"
								:size="24"
								placeholder="Last Name" position="floating" type="text" />
							<DisplayError :error="factory.errors.lastName" />
						</div>
					</div>
					<div class="flex flex-col">
						<ion-label class="font-bold text-sm mb-2">Email</ion-label>
						<ion-input v-model.trim="factory.email"
							:class="{'valid': factory.isValid('email'), 'invalid': factory.errors.email}"
							:size="24"
							inputmode="email" placeholder="Email Address" position="floating" type="email" />
						<DisplayError :error="factory.errors.email" />
					</div>
					<div class="flex flex-col">
						<ion-label class="font-bold text-sm mb-2">Password</ion-label>
						<ion-input v-model="factory.password"
							:class="{'valid': factory.isValid('password'), 'invalid': factory.errors.password}"
							:size="24"
							placeholder="Password" position="floating" type="password" />
						<DisplayError :error="factory.errors.password" />
					</div>
					<div class="flex flex-col">
						<ion-label class="font-bold text-sm mb-2">Confirm Password</ion-label>
						<ion-input v-model="factory.cPassword"
							:class="{'valid': factory.isValid('cPassword'), 'invalid': factory.errors.cPassword}"
							:size="24"
							placeholder="Confirm Password" position="floating" type="password" />
						<DisplayError :error="factory.errors.cPassword" />
					</div>
					<ion-button :disabled="loading" class="w-full btn-primary" type="submit">
						<SpinLoading v-if="loading" />
						<span v-else>Sign up</span>
					</ion-button>
					<div class="flex justify-center items-center my-2">
						<span>Or</span>
					</div>
					<AuthProviders />
					<span class="w-full flex justify-center items-center my-2 text-secondaryText">
						Have an account?
						<router-link class="text-primaryBg font-bold ml-2" to="/auth/signin">
							Sign In
						</router-link>
					</span>
				</form>
			</div>
		</div>
	</Auth>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEmailSignup } from '@app/composable/auth/signin'
import { IonButton, IonInput, IonLabel } from '@ionic/vue'
import AuthProviders from '@app/components/auth/AuthProviders.vue'
import Auth from '@app/layouts/Auth.vue'

export default defineComponent({
	name: 'AuthSignup',
	displayName: 'Create account',
	components: { IonInput, IonButton, AuthProviders, Auth, IonLabel },
	middlewares: ['isNotAuthenticated'],
	setup () {
		const { factory, loading, error, signup } = useEmailSignup()
		return { factory, loading, error, signup }
	}
})
</script>
