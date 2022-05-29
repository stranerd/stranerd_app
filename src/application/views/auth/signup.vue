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
							<IonLabel class="font-bold text-sm mb-2">First Name</IonLabel>
							<IonInput v-model="factory.firstName"
								:class="{'valid': factory.isValid('firstName'), 'invalid': factory.errors.firstName}"
								:size="24" class="flex-grow-0"
								placeholder="First Name" position="floating" type="text" />
							<DisplayError :error="factory.errors.firstName" />
						</div>
						<div class="flex flex-col w-1/2">
							<IonLabel class="font-bold text-sm mb-2">Last Name</IonLabel>
							<IonInput v-model="factory.lastName"
								:class="{'valid': factory.isValid('lastName'), 'invalid': factory.errors.lastName}"
								:size="24" class="flex-grow-0"
								placeholder="Last Name" position="floating" type="text" />
							<DisplayError :error="factory.errors.lastName" />
						</div>
					</div>
					<div class="flex flex-col">
						<IonLabel class="font-bold text-sm mb-2">Email</IonLabel>
						<IonInput v-model.trim="factory.email"
							:class="{'valid': factory.isValid('email'), 'invalid': factory.errors.email}"
							:size="24"
							inputmode="email" placeholder="Email Address" position="floating" type="email" />
						<DisplayError :error="factory.errors.email" />
					</div>
					<div class="flex flex-col">
						<IonLabel class="font-bold text-sm mb-2">Password</IonLabel>
						<IonInput v-model="factory.password"
							:class="{'valid': factory.isValid('password'), 'invalid': factory.errors.password}"
							:size="24"
							placeholder="Password" position="floating" type="password" />
						<DisplayError :error="factory.errors.password" />
					</div>
					<div class="flex flex-col">
						<IonLabel class="font-bold text-sm mb-2">Confirm Password</IonLabel>
						<IonInput v-model="factory.cPassword"
							:class="{'valid': factory.isValid('cPassword'), 'invalid': factory.errors.cPassword}"
							:size="24"
							placeholder="Confirm Password" position="floating" type="password" />
						<DisplayError :error="factory.errors.cPassword" />
					</div>
					<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary mt-2" type="submit">
						<SpinLoading v-if="loading" />
						<span v-else>Sign up</span>
					</IonButton>
					<div class="flex justify-center items-center">
						<span>Or</span>
					</div>
					<AuthProviders />
					<span class="w-full flex justify-center items-center mt-2 text-secondaryText">
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
import AuthProviders from '@app/components/auth/AuthProviders.vue'
import Auth from '@app/layouts/Auth.vue'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'AuthSignup',
	displayName: 'Create account',
	components: { AuthProviders, Auth },
	beforeRouteEnter: generateMiddlewares(['isNotAuthenticated']),
	setup () {
		const { factory, loading, error, signup } = useEmailSignup()
		return { factory, loading, error, signup }
	}
})
</script>
