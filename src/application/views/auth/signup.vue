<template>
	<AuthLayout>
		<form class="flex flex-col lg:w-6/12 sm:w-8/12 w-full p-4 mx-auto pt-16 gap-5" @submit.prevent="signup">
			<h1 class="md:text-3xl text-2xl w-full font-bold md:text-center">
				Create an account
			</h1>

			<AuthProviders />

			<div class="flex justify-between items-center gap-2 my-2">
				<div class="border-itemBg border-b h-1 flex-1" />
				<span class="text-primaryBg leading-none">OR</span>
				<div class="border-itemBg border-b h-1 flex-1" />
			</div>

			<div class="flex w-full gap-4">
				<div class="flex flex-col w-1/2">
					<IonLabel class="text-secondaryText mb-2">First Name</IonLabel>
					<IonInput v-model="factory.firstName"
						:class="{'valid': factory.isValid('firstName'), 'invalid': factory.errors.firstName}"
						:size="24" class="flex-grow-0"
						placeholder="Enter your first name" position="floating" type="text" />
					<DisplayError :error="factory.errors.firstName" />
				</div>
				<div class="flex flex-col w-1/2">
					<IonLabel class="text-secondaryText mb-2">Last Name</IonLabel>
					<IonInput v-model="factory.lastName"
						:class="{'valid': factory.isValid('lastName'), 'invalid': factory.errors.lastName}"
						:size="24" class="flex-grow-0"
						placeholder="Enter your last name" position="floating" type="text" />
					<DisplayError :error="factory.errors.lastName" />
				</div>
			</div>

			<div class="flex flex-col w-full">
				<IonLabel class="text-secondaryText mb-2">Email</IonLabel>
				<IonInput v-model.trim="factory.email"
					:class="{'valid': factory.isValid('email'), 'invalid': factory.errors.email}"
					:size="24"
					inputmode="email" placeholder="Enter your email" position="floating" type="email" />
				<DisplayError :error="factory.errors.email" />
			</div>

			<div class="flex flex-col">
				<IonLabel class="text-secondaryText mb-2">Password</IonLabel>
				<IonInput v-model="factory.password"
					:class="{'valid': factory.isValid('password'), 'invalid': factory.errors.password}"
					:size="24"
					placeholder="Enter your password" position="floating" type="password" />
				<DisplayError :error="factory.errors.password" />
			</div>

			<div class="flex flex-col">
				<IonLabel class="text-secondaryText mb-2">Confirm Password</IonLabel>
				<IonInput v-model="factory.cPassword"
					:class="{'valid': factory.isValid('cPassword'), 'invalid': factory.errors.cPassword}"
					:size="24"
					placeholder="Confirm your password" position="floating" type="password" />
				<DisplayError :error="factory.errors.cPassword" />
			</div>

			<span class="mx-auto text-secondaryText text-sm w-3/4 text-center">
				By signing up you accept Stranerd’s<br />
				<router-link class="text-primaryBg font-bold" to="/legal/terms-and-conditions">
					Terms and Conditions
				</router-link>
				and
				<router-link class="text-primaryBg font-bold" to="/legal/privacy-policy">
					Privacy Policy
				</router-link>
			</span>

			<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary" type="submit">
				<SpinLoading v-if="loading" />
				<span v-else>Sign up</span>
			</IonButton>

			<span class="w-full flex justify-center items-center text-secondaryText text-sm">
				Have an account?
				<router-link class="text-primaryBg ml-1" to="/auth/signin">
					Sign in
				</router-link>
			</span>
		</form>
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
