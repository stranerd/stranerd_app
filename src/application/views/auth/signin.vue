<template>

	<div class="flex justify-between  py-6 px-5">
		<i class="las la-arrow-left text-white text-xl"></i>
		<img src="../../assets/images/icons/logo-xs.svg" alt="ask a question" class="object-fit h-4 ">
	</div>

	<h1 class="text-center text-3xl text-white font-semibold font-nuni mt-12">Welcome back.</h1>

	<form class=" px-5 flex flex-col justify-center mx-auto mt-20">

		<ion-input placeholder="Email Address" position="floating" v-model="factory.email"></ion-input>
		<ion-input placeholder="Password" position="floating" v-model="factory.password"></ion-input>

	</form>

	<div class="flex justify-between items-center  px-5 mt-10">
		<p class="text-xs text-white font-semibold font-nuni">Not a member on Stranerd?</p>
		<span @click="() => router.push('/auth/signup')" class="flex items-center text-yellow-300 font-nuni text-xs font-bold">Sign Up <i class="las la-arrow-right text-xl"></i> </span>
	</div>

	<div class="flex justify-between px-5 items-center mt-14">
		<div class="border-white border-b h-1 w-5/12"/>
		<span class="font-nuni text-white">or</span>
		<div class="border-white border-b h-1 w-5/12"/>
	</div>

	<p class="text-center text-xs font-nuni text-white font-bold mt-5 ">
		Sign in with Google
	</p>

	<div class="flex justify-center w-full px-5">
		<ion-button  class="w-full font-bold capitalize text-base flex gap-2 justify-center items-center my-6" @click="signin">
			<img src="../../assets/images/icons/google.svg" alt="ask a question" class="object-fit w-5 mr-2">
			Google</ion-button>
		<ion-button  class="w-full font-bold capitalize text-base flex gap-2 justify-center items-center my-6" @click="check()">
			<img src="../../assets/images/icons/google.svg" alt="ask a question" class="object-fit w-5 mr-2">
			user</ion-button>
	</div>

		
	
</template>

<script lang="ts">
import { IonInput, IonButton } from '@ionic/vue'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEmailSignin } from '@/application/composable/auth/signin'
import { useAuth } from '@/application/composable/auth/auth'




export default defineComponent({
	components: { IonInput, IonButton},
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
ion-input{
	--background: #EFF0F6 !important;
	--padding-start: 1.5rem !important;
	--padding-end: 1.5rem !important;
	--padding-top: .69rem !important;
	--padding-bottom: .69rem !important;
	--color: $color-dark !important;
	--placeholder-color: $color-dark !important;
	border-radius: 10px;
	margin-bottom: 1.25rem;
}

	ion-button{
    --background: white;
    --border-radius: 3.125rem;
    --color: #4D5C6F;
    --background-hover: white;
	--padding-top: 1rem;
	--padding-bottom: 1rem;
	height: 2.75rem;
	transition: all .5s ease-in-out;

}

</style>