<template>
	<div class="flex-col gap-4">
		<IonButton class="btn-outline w-full font-bold" @click="signinWithGoogle">
			<img alt="" class="h-[1.25rem] mr-5" src="@app/assets/images/auth/google.svg">
			<span>Continue with Google</span>
		</IonButton>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useGoogleSignin } from '@app/composable/auth/signin'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
import { googleClientId } from '@utils/environment'

export default defineComponent({
	name: 'AuthProviders',
	setup () {
		const { loading, error, setError, signin } = useGoogleSignin()

		const signinWithGoogle = async () => {
			try {
				const googleUser = await GoogleAuth.signIn()
				const accessToken = googleUser.authentication.accessToken
				const idToken = googleUser.authentication.idToken
				await GoogleAuth.signOut()
				await signin({ idToken, accessToken })
			} catch (error) {
				await setError('Error signing in with google')
			}
		}

		onMounted(async () => {
			try {
				GoogleAuth.initialize({
					clientId: googleClientId,
					scopes: ['profile', 'email']
				})
			} catch (err) {
				await setError(err)
			}
		})

		return { loading, error, signinWithGoogle }
	}
})
</script>
