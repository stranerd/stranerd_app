<template>
	<div class="gap-1 gap-md-2 flex flex-col">
		<form class="gap-1 gap-md-2 flex flex-col" @submit.prevent="resetPassword">
			<Heading class="text-center" variant="1">
				Reset Password
			</Heading>
			<span class="textStyle text-center">
				To reset your password, type your new password below and reset
			</span>
			<div>
				<input
					id="password"
					v-model="factory.password"
					autocomplete="password"
					class="form-control"
					name="password"
					placeholder="New Password"
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
					placeholder="Confirm New Password"
					required
					type="password"
				>
				<DynamicText v-if="factory.errors.cPassword" class="small text-danger d-block">
					{{ factory.errors.cPassword }}
				</DynamicText>
			</div>
			<button :disabled="loading || !factory.valid" class="btn btn-lg btn-custom py-1" type="submit">
				Reset Password
			</button>
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
		</form>
		<div class="flex align-items-center justify-content-center gap-0-25">
			<span>Return to</span>
			<NuxtLink class="linkText" to="/auth/signin">
				Sign In
			</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePasswordReset } from '@/application/hooks/auth/passwords'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'AuthResetPage',
	layout: 'auth',
	// middleware: [({ query, redirect }) => {
	// 	if (!query.token) redirect('/auth/signin')
	// }],
	setup () {
		const { token } = useRoute().query
		const { factory, loading, resetPassword, error, message } = usePasswordReset(token as string)
		// useMeta(() => ({
		// 	title: 'Reset Password | Stranerd'
		// }))
		return { factory, loading, resetPassword, error, message }
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
