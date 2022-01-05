<template>
	<div class="d-flex flex-column gap-1 gap-md-2">
		<ion-button id="g-auth"
			class="w-full font-bold capitalize text-base flex gap-9 justify-center items-center my-6">
			<ion-icon :icon="logoGoogle" class="mr-4" size="100px" />
			<span>Google</span>
		</ion-button>

		<page-loading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useGoogleSignin } from '@app/composable/auth/signin'
import { IonButton, IonIcon } from '@ionic/vue'
import { logoGoogle } from 'ionicons/icons'
import PageLoading from '../core/PageLoading.vue'
import { googleClientId } from '@utils/environment'

export default defineComponent({
	name: 'AuthProviders',
	components: { IonButton, IonIcon, PageLoading },
	setup () {
		const { loading, error, setError, signin } = useGoogleSignin()

		onMounted(() => {
			const googleSignInAPI = document.createElement('script')
			googleSignInAPI.setAttribute('src', 'https://apis.google.com/js/api:client.js')
			document.head.appendChild(googleSignInAPI)
			const onSuccess = async (googleUser: any) => {
				await signin(googleUser.getAuthResponse().id_token)
				googleUser.disconnect()
			}
			const onFail = async () => {
				await setError('Error signing in with google')
			}

			googleSignInAPI.onload = () => {
				//@ts-ignore
				window.gapi.load('auth2', () => {
					//@ts-ignore
					window.gapi.auth2.init({ client_id: googleClientId, cookiepolicy: 'single_host_origin' })
						.attachClickHandler(document.getElementById('g-auth'), {}, onSuccess, onFail)
				})
			}
		})
		return { loading, error, logoGoogle }
	}
})
</script>

<style lang="scss" scoped>
	ion-button {
		--background: transparent !important;
		--border-radius: .4rem;
		--color: #4D5C6F;
		--background-hover: white;
		--padding-top: 1.4rem !important;
		--padding-bottom: 1.4rem !important;
		height: 3.5rem;
		transition: all .5s ease-in-out;
		--border-color: #8B9EB1;
		--border-style: solid;
		--border-width: 2px;
		--box-shadow: none;

	}

	ion-button {
		--background: #546DD3;
		--border-radius: .75rem;
		height: 3.5rem;
		font-size: 24px;
		font-weight: 700;
		transition: all .5s ease-in-out;
		max-width: 90vw !important;

	}


</style>
