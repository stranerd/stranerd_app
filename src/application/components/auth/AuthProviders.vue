<template>
	<div class="flex flex-col gap-4">
		<IonButton :disabled="googleLoading" class="btn-outline w-full font-bold" @click="googleSignin">
			<SpinLoading v-if="googleLoading" class="h-[1.25rem]" />
			<img v-else alt="" class="h-[1.25rem]" src="@app/assets/images/auth/google.svg">
			<span class="ml-5">Continue with Google</span>
		</IonButton>
		<IonButton :disabled="appleLoading" class="btn-outline w-full font-bold" @click="appleSignin">
			<SpinLoading v-if="appleLoading" class="h-[1.25rem]" />
			<img v-else alt="" class="h-[1.25rem]" src="@app/assets/images/auth/apple.svg">
			<span class="ml-5">Continue with Apple</span>
		</IonButton>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAppleSignin, useGoogleSignin } from '@app/composable/auth/signin'

export default defineComponent({
	name: 'AuthProviders',
	setup () {
		const { loading: googleLoading, signin: googleSignin } = useGoogleSignin()
		const { loading: appleLoading, signin: appleSignin } = useAppleSignin()
		return { googleLoading, appleLoading, googleSignin, appleSignin }
	}
})
</script>
