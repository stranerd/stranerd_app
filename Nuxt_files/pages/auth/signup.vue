<template>
	<div class="gap-1 gap-md-2 flex flex-col">
		<form class="flex gap-1 gap-md-2 flex-col" @submit.prevent="signup">
			<Heading class="text-center" variant="1">
				Sign Up
			</Heading>
			<div class="flex flex-col gap-1 gap-md-2 flex-md-row">
				<div class="flew-grow-1 w-100">
					<input
						id="first"
						v-model="factory.first"
						autocomplete="first-name"
						class="form-control"
						name="first"
						placeholder="First name"
						required
						type="text"
					>
					<DynamicText v-if="factory.errors.first" class="small text-danger d-block">
						{{ factory.errors.first }}
					</DynamicText>
				</div>
				<div class="flew-grow-1 w-100">
					<input
						id="last"
						v-model="factory.last"
						autocomplete="last-name"
						class="form-control"
						name="last"
						placeholder="Last name"
						required
						type="text"
					>
					<DynamicText v-if="factory.errors.last" class="small text-danger d-block">
						{{ factory.errors.last }}
					</DynamicText>
				</div>
			</div>
			<div>
				<input
					id="email"
					v-model="factory.email"
					autocomplete="email"
					class="form-control"
					name="email"
					placeholder="Email"
					required
					type="email"
				>
				<DynamicText v-if="factory.errors.email" class="small text-danger d-block">
					{{ factory.errors.email }}
				</DynamicText>
			</div>
			<div>
				<input
					id="password"
					v-model="factory.password"
					autocomplete="password"
					class="form-control"
					name="password"
					placeholder="Password"
					required
					type="password"
				>
				<DynamicText v-if="factory.errors.password" class="small text-danger d-block">
					{{ factory.errors.password }}
				</DynamicText>
			</div>
			<div>
				<input
					id="cPassword"
					v-model="factory.cPassword"
					autocomplete="password"
					class="form-control"
					name="cPassword"
					placeholder="Confirm Password"
					required
					type="password"
				>
				<DynamicText v-if="factory.errors.cPassword" class="small text-danger d-block">
					{{ factory.errors.cPassword }}
				</DynamicText>
			</div>
			<button :disabled="loading || !factory.valid" class="btn btn-lg btn-custom py-1 " type="submit">
				Sign Up
			</button>
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
		</form>
		<div class="flex gap-1 items-center">
			<div class="flex-grow-1 border-bottom border-line" style="height: 2px;" />
			<span>or sign up with</span>
			<div class="flex-grow-1 border-bottom border-line" style="height: 2px;" />
		</div>
		<AuthProviders />
		<div class="flex items-center justify-center gap-0-25">
			<span>Already have an account?</span>
			<NuxtLink class="linkText" to="/auth/signin">
				Sign in
			</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuthProviders from '@/application/components/auth/AuthProviders.vue'
import { usePassword } from '@/application/hooks/core/forms'
import { useEmailSignup } from '@/application/hooks/auth/signin'

export default defineComponent({
	name: 'AuthSignupPage',
	components: { AuthProviders },
	layout: 'auth',
	middleware: ['isNotAuthenticated'],
	setup () {
		const { show, toggle } = usePassword()
		const { factory, loading, error, signup } = useEmailSignup()
		// useMeta(() => ({
		// 	title: 'Sign up for Stranerd'
		// }))
		return { show, toggle, factory, loading, error, signup }
	},
	head: {}
})
</script>
<style lang="scss" scoped>
	input {
		border: 1px solid $color-sub;
		border-radius: 6px;
		color: $color-sub;
		padding: 1rem;
	}

	.btn-custom {
		background-color: $color-primary;
		color: $color-white;
		border: 2px solid;
		border-radius: 6px;
		font-size: 16px;
		font-weight: bold;
	}

	.linkText {
		color: $color-primary;
		text-decoration: underline;
		font-weight: bold;
	}
</style>
