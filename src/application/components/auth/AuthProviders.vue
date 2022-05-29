<template>
	<div class="flex-col gap-4">
		<IonButton class="btn-outline w-full font-bold capitalize flex justify-center items-center"
			@click="loginWithGoogle">
			<IonIcon :icon="logoGoogle" class="mr-2" size="100px" />
			<span>Google</span>
		</IonButton>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useGoogleSignin } from '@app/composable/auth/signin'
import { logoGoogle } from 'ionicons/icons'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
import { googleClientId } from '@utils/environment'

export default defineComponent({
	name: 'AuthProviders',
	setup () {
		const { loading, error, setError, signin } = useGoogleSignin()

		const loginWithGoogle = async () => {
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

		return { loading, error, logoGoogle, loginWithGoogle }
	}
})
</script>
