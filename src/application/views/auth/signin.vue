<template>
	<div class="gap-4 gap-md-8 flex flex-col">
		<form class="gap-4 gap-md-8 flex flex-col" @submit.prevent="signin">
			<Heading class="text-center" variant="1">
				Sign In
			</Heading>
			<div>
				<ion-input
					id="email"
					autocomplete="email"
					class="form-control text-sub p-4 rounded-md border border-sub"
					name="email"
					mode="ios"
					placeholder="Email"
					required="true"
					size="email"
					type="email"
				></ion-input>
			
				<!-- <DynamicText v-if="factory.errors.email" class="small text-danger d-block">
					{{ factory.errors.email }}
				</DynamicText> -->
			</div>
			<div>
				<ion-input
					id="password"
					autocomplete="password"
					class="form-control text-sub p-4 rounded-md border border-sub outline-none"
					name="password"
					placeholder="Password"
					required
					size="password"
					type="password"
				></ion-input>
				<!-- <DynamicText v-if="factory.errors.password" class="small text-danger d-block">
					{{ factory.errors.password }}
				</DynamicText> -->
				<div class="text-end mt-1">
					<RouterLink class="text-primary font-bold underline text-decoration-none" to="/auth/forgot">
						Forgot Password
					</RouterLink>
				</div>
			</div>
			<button  class="btn text-base text-white bg-primary border-2 rounded-md font-bold py-4" type="submit">
				Sign In
			</button>
		
		</form>
		<div class="flex gap-1 items-center justify-between">
			<div class="flex-grow-1 border border-bottom border-line w-5/12" style="height: 2px;" />
			<span >or sign in with</span>
			<div class="flex-grow-1 border border-bottom border-line w-5/12" style="height: 2px;" />
		</div>
		<AuthProviders />
		<div class="flex items-center justify-center gap-0-25">
			<span>Not a member yet?</span>
			<RouterLink class="text-primary font-bold underline" to="/auth/signup">
				Sign Up
			</RouterLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonInput } from '@ionic/vue'
// import AuthProviders from '@/application/components/auth/AuthProviders.vue'
import Heading from '@/application/components/core/text/Heading.vue'
// import { usePassword } from '@/application/hooks/core/forms'
// import { useEmailSignin } from '@/application/hooks/auth/signin'

export default defineComponent({
	name: 'AuthSigninPage',
	components: {  Heading, IonInput },
	layout: 'auth',
	// middleware: ['isNotAuthenticated'],
	// setup () {
	// 	const { show, toggle } = usePassword()
	// 	const { loading, signin, factory, error } = useEmailSignin()
	// 	// useMeta(() => ({
	// 	// 	title: 'Sign in for Stranerd'
	// 	// }))
	// 	return { show, toggle, factory, loading, error, signin }
	// },
	head: {}
})
</script>

<style lang="scss" scoped>

ion-input {
    border: 1px solid ;
    --color:  $color-sub;
    --padding-top:1rem;
    --padding-bottom:1rem;
    --padding-left:1rem;
    --padding-right:1rem;
    --placeholder-color: black

}
	input {
		border: 1px solid ;
		border-radius: 6px;
		padding: 1rem;
	}

	.btn-custom {

		border: 2px solid;
		border-radius: 6px;
		font-size: 16px;
		font-weight: bold;
	}


</style>