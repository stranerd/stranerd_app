<template>
	<ion-page>
		<ion-content>
			<div class="w-full mt-1 min-h-full flex ">
				<div class="gap-3 bg-light_orange w-1/2 lg:flex flex-col  items-center justify-center min-h-full hidden ">
					<h1 class="text-xl  text-dark_gray font-bold ">Join the community!</h1>
					<span class="text-dark_gray">Get study help, learn from tutors, learn with <br>
						your friends and enjoy new study tools.</span>
					<img src="@/application/assets/images/auth/signin.png" alt="" class="h-[55%]">
				</div>

				<div class="flex flex-col items-center justify-center lg:w-1/2 w-full max-w-[18rem] mx-auto">
					<h1 class="text-xl text-dark_gray font-bold mb-1 lg:hidden ">Join the community!</h1>
					<span class="lg:text-main_darktext-dark_gray lg:hidden text-icon_inactive mb-8 text-center text-xs">Get study help, learn from tutors, learn with <br>
						your friends and enjoy new study tools.</span>
					<h1 class=" lg:text-xl  text-dark_gray font-bold mb-5 text-center">Sign Up </h1>
					<span class="normalText text-red-500 font-semibold"> {{error}} </span>
					<div class="h-[65%]">
						<form >
							<div class="mb-4">
								<ion-input placeholder="First Name" position="floating" type="text" :size="24" v-model="factory.first"></ion-input>
								<span class="normalText text-red-500 font-semibold">{{ factory.errors.first }}</span>
							</div>
							<div class="mb-4">
								<ion-input placeholder="Last Name" position="floating" type="text" :size="24" v-model="factory.last"></ion-input>
								<span class="normalText text-red-500 font-semibold">{{ factory.errors.last }}</span>
							</div>
							<div class="mb-4">
								<ion-input placeholder="Email Address" type="email" position="floating" :size="24" v-model="factory.email"></ion-input>
								<span class="normalText text-red-500 font-semibold">{{ factory.errors.email }}</span>
							</div>
							<div class="mb-4">
								<ion-input placeholder="Password" position="floating" type="password" :size="24" v-model="factory.password"></ion-input>
								<span class="normalText text-red-500 font-semibold">{{ factory.errors.password }}</span>
							</div>
							<div class="mb-4">
								<ion-input placeholder="Confirm Password" position="floating" type="password" :size="24" v-model="factory.cPassword"></ion-input>
								<span class="normalText text-red-500 font-semibold">{{ factory.errors.cPassword }}</span>
							</div>

							<ion-button  class="w-full mb-4" @click="signup()">SIGN UP <ion-spinner name="lines-small" v-if="loading"></ion-spinner></ion-button>
						</form>

						<div class="flex justify-between px-5 items-center mt-8">
							<div class="border-faded_gray border-b h-1 w-4/12"/>
							<span class="font-nuni text-faded_gray">or use</span>
							<div class="border-faded_gray border-b h-1 w-4/12"/>
						</div>

						<AuthProviders/>
						<span class="text-xs flex flex-wrap justify-center items-center text-icon_inactive mt-8 max-w-full text-center">
							By signing up, you accept the Stranerd 	<router-link  to="/auth/signup" class="text-primary font-bold normalText mx-1"> Terms and Conditions 
							</router-link> & <router-link  to="/auth/signup" class="text-primary font-bold normalText mx-1">
								Privacy Policy.
							</router-link>


						</span>

						<span class="text- w-full flex justify-center items-center text-icon_inactive mt-8 mb-5">
							Have an account? 

						
						
							<router-link  to="/auth/signin" class="text-primary font-bold normalText">
								Sign In
							</router-link>
							
						</span>
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
	
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEmailSignup } from '@/application/composable/auth/signin'
import { IonContent, IonPage, IonInput,IonButton,  IonSpinner } from '@ionic/vue'
import AuthProviders from '@/application/components/auth/AuthProviders.vue'
import isNotAuthenticated from '@/application/middlewares/isNotAuthenticated'



export default defineComponent({
	components: { IonContent,IonPage,IonInput,IonButton,  AuthProviders, IonSpinner,  },
	layout:'Auth',
	middlewares: [isNotAuthenticated],
	  setup() {
	

		const { factory, loading, error, signup } = useEmailSignup()

	
		return {   factory, loading, error, signup,  }
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