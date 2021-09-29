<template>
	<div class="gap-1 gap-md-2 d-flex flex-column">
		<Heading class="text-center" variant="1">
			Verifying Your Email Address
		</Heading>
		<span class="textStyle text-center">
			If an error occurred, click the button below to retry verification.
		</span>
		<button class="btn btn-lg btn-custom py-1" @click="completeVerification">
			Retry Verification
		</button>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
		<div class="d-flex align-items-center justify-content-center gap-0-25">
			<span>Return to</span>
			<NuxtLink class="linkText" to="/auth/signin">
				Sign In
			</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useCompleteEmailVerification } from '@/application/hooks/auth/signin'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'AuthCompleteVerificationPage',
	layout: 'auth',
	// middleware: [({ query, redirect }) => {
	// 	if (!query.token) redirect('/auth/signin')
	// }],
	setup () {
		const { token } = useRoute().query
		const { loading, error, completeVerification } = useCompleteEmailVerification(token as string)
		onMounted(completeVerification)
		// useMeta(() => ({
		// 	title: 'Complete Email Verification | Stranerd'
		// }))
		return { loading, error, completeVerification }
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
