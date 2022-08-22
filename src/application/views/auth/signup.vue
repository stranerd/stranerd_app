<template>
	<AuthLayout>
		<div class="flex items-center justify-center">
		
			<div class="flex flex-col items-center justify-center  lg:w-6/12 sm:w-8/12 w-full p-4">
				<img src="@/assets/images/auth/signup.svg" alt="hero" class="mr-auto md:hidden mt-6">
				<h1 class="md:block md:text-3xl text-2xl text-start w-full font-extrabold mb-8 md:mt-16 mt-8 md:text-center">Create account</h1>
				<form class="flex flex-col gap-4" @submit.prevent="signup">
					<AuthProviders />
					<div class="flex justify-between  items-center my-4">
						<div class="border-faded_gray border-b h-1 w-4/12" />
						<span class="text-gray">Or sign up with </span>
						<div class="border-faded_gray border-b h-1 w-4/12" />
					</div>
					<div class="flex w-full gap-4">
						<div class="flex flex-col w-1/2">
							<IonLabel class="font-bold mb-2">First Name</IonLabel>
							<IonInput v-model="factory.firstName"
								:class="{'valid': factory.isValid('firstName'), 'invalid': factory.errors.firstName}"
								:size="24" class="flex-grow-0"
								placeholder="First Name" position="floating" type="text" />
							<DisplayError :error="factory.errors.firstName" />
						</div>
						<div class="flex flex-col w-1/2">
							<IonLabel class="font-bold mb-2">Last Name</IonLabel>
							<IonInput v-model="factory.lastName"
								:class="{'valid': factory.isValid('lastName'), 'invalid': factory.errors.lastName}"
								:size="24" class="flex-grow-0"
								placeholder="Last Name" position="floating" type="text" />
							<DisplayError :error="factory.errors.lastName" />
						</div>
					</div>
					<div class="flex flex-col">
						<IonLabel class="font-bold mb-2">Email</IonLabel>
						<IonInput v-model.trim="factory.email"
							:class="{'valid': factory.isValid('email'), 'invalid': factory.errors.email}"
							:size="24"
							inputmode="email" placeholder="Email Address" position="floating" type="email" />
						<DisplayError :error="factory.errors.email" />
					</div>
					<div class="flex flex-col">
						<IonLabel class="font-bold mb-2">Password</IonLabel>
						<IonInput v-model="factory.password"
							:class="{'valid': factory.isValid('password'), 'invalid': factory.errors.password}"
							:size="24"
							placeholder="Password" position="floating" type="password" />
						<DisplayError :error="factory.errors.password" />
					</div>
					<div class="flex flex-col">
						<IonLabel class="font-bold mb-2">Confirm Password</IonLabel>
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

					<span class="w-full flex justify-center items-center mt-2 text-secondaryText">
						Have an account?
						<router-link class="text-primaryBg font-bold ml-2" to="/auth/signin">
							Sign In
						</router-link>
					</span>
				</form>
			</div>
		</div>
	</AuthLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEmailSignup } from '@app/composable/auth/signin'
import AuthProviders from '@app/components/auth/AuthProviders.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AuthSignup',
	components: { AuthProviders },
	beforeRouteEnter: generateMiddlewares(['isNotAuthenticated']),
	setup () {
		useRouteMeta('Create account', { back: true })
		const { factory, loading, error, signup } = useEmailSignup()
		return { factory, loading, error, signup }
	}
})
</script>
