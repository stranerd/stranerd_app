<template>
	<ion-page>
		<ion-content>
			<div class="w-full mt-10 h-full flex ">
				<div class="gap-3 bg-light_orange w-1/2 lg:flex flex-col  items-center justify-center h-full hidden ">
					<h1 class="text-xl  text-dark_gray font-bold ">Join the community!</h1>
					<span class="text-dark_gray">Get study help, learn from tutors, learn with <br>
						your friends and enjoy new study tools.</span>
					<img src="@/application/assets/images/auth/signin.png" alt="" class="h-[65%]">
				</div>

				<div class="flex flex-col items-center justify-center lg:w-1/2 w-full">
					<h1 class="text-xl text-dark_gray font-bold mb-5 lg:hidden ">Join the community!</h1>
						<span class="text-dark_gray lg:hidden">Get study help, learn from tutors, learn with <br>
						your friends and enjoy new study tools.</span>
					<h1 class="headings lg:text-xl  text-dark_gray font-bold mb-5 text-center">Sign Up </h1>
					<div class="h-[65%]">
						<form >
							<ion-input placeholder="Email Address" type="email" position="floating" :size="24" v-model="factory.email"></ion-input>
							<ion-input placeholder="Password" position="floating" type="password" :size="24" v-model="factory.password"></ion-input>
							<ion-button  class="w-full mb-4" @click="signin">SIGN IN <ion-spinner name="lines-small" v-if="loading"></ion-spinner></ion-button>
						</form>
						<div class="w-full flex justify-between items-center  text-dark_gray">
							<div class="flex justify-between items-center gap-2">
								<ion-checkbox checked="true" color="primary" mode="ios"></ion-checkbox>
								<span class="normalText">Stay signed in</span>
							</div>
							
							<router-link  to="/auth/Forgot" class="underline normalText">
								Forgot Password
							</router-link>
						</div>

						<div class="flex justify-between px-5 items-center mt-8">
							<div class="border-faded_gray border-b h-1 w-5/12"/>
							<span class="font-nuni text-faded_gray">or</span>
							<div class="border-faded_gray border-b h-1 w-5/12"/>
						</div>

						<AuthProviders/>

						<span class="text- w-full flex justify-center items-center text-icon_inactive mt-8">
							Don’t have an account?

							<router-link  to="/auth/signup" class="text-primary font-bold normalText">
								Sign Up
							</router-link>
							
						</span>
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
	
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEmailSignin } from '@/application/composable/auth/signin'
import { useAuth } from '@/application/composable/auth/auth'
import { IonContent, IonPage, IonInput,IonButton, IonCheckbox, IonSpinner } from '@ionic/vue'
import AuthProviders from '@/application/components/auth/AuthProviders.vue'



export default defineComponent({
	components: { IonContent,IonPage,IonInput,IonButton, IonCheckbox, AuthProviders, IonSpinner,  },
	layout:'Auth',
	  setup() {
		const router = useRouter()
		const check = ()=>{
			console.log(useAuth())
		}

		const { factory, loading, error, signin } = useEmailSignin()

	
		return { router,  factory, loading, error, signin, check }
	},



})
</script>

<style lang="scss" scoped>
ion-checkbox{
	--size:20px;
}
ion-input{
	--background: #F7F7FC !important;
	--padding-start: 1.8rem !important;
	--padding-end: 1.5rem !important;
	--padding-top: .69rem !important;
	--padding-bottom: .69rem !important;
	--color: $color-dark !important;
	--placeholder-color: $color-dark !important;
	border-radius: 10px;
	margin-bottom: 1.25rem;
}



	ion-button{
    --background: #546DD3;
    --border-radius: .4rem;
    --color: white;
    --background-hover: white;
	--padding-top: 1rem;
	--padding-bottom: 1rem;
	height: 2.75rem;
	transition: all .5s ease-in-out;

}

</style>