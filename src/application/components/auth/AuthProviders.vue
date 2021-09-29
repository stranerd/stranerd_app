<template>
	<div class="d-flex flex-column gap-1 gap-md-2">
		<!-- <GoogleLogin
		
			class="btn btn-auth"
		>
			<img alt="" src="../../assets/images/icons/google.svg">
			<span>Google</span>
		</GoogleLogin> -->
		<!-- <DisplayError :error="googleError" />
		<PageLoading v-if="googleLoading" /> -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { useGoogleSignin } from '@app/hooks/auth/signin'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import GoogleLogin from 'vue-google-login'
// import { googleClientId } from '@utils/environment'

export default defineComponent({
	components: {
		GoogleLogin
	},
	// setup () {
	// 	const { loading: googleLoading, signin: googleSignin, error: googleError, setError } = useGoogleSignin()
	// 	const googleParams = { client_id: googleClientId }
	// 	const onFailure = async (_: any) => await setError('Error signing in with google')
	// 	const onSuccess = async (data: any) => await googleSignin(data.getAuthResponse().id_token)
	// 	return { googleError, googleLoading, googleSignin, onSuccess, onFailure, googleParams }
	// }
})
</script>

<style lang="scss" scoped>
	.btn-auth {
		color: $color-dark;
		background: $color-white;
		width: 100%;
		font-size: 18px;
		border: 1px solid $color-dark;
		display: flex;
		border-radius: 5px;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		padding: 0.75rem 0;
		transition: all 0.4s;

		img {
			height: 30px;
			margin-right: 0.5rem;
		}
	}

</style>
