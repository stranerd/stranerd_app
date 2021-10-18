<template>
	<ion-page>
		<ion-content
			class="flex flex-col bg-dark h-screen w-screen items-start justify-center py-3 px-5 bg-gray-800"
		>
			<div class="flex justify-between  py-6 px-5">
				<i class="las la-arrow-left  text-xl"></i>
				<img src="../../assets/images/icons/logo-xs.svg" alt="ask a question" class="object-fit h-4 ">
			</div>

			<h1 class="text-center text-3xl  font-semibold font-nuni mt-12">Create your Account.</h1>

			<form class=" px-5 flex flex-col justify-center mx-auto mt-20">

				<ion-input placeholder="First name" position="floating"></ion-input>
				<ion-input placeholder="Last name" position="floating"></ion-input>
				<ion-input placeholder="Email Address" position="floating"></ion-input>
				<ion-input placeholder="Password" position="floating"></ion-input>
				<ion-input placeholder="Confirm Password" position="floating"></ion-input>

			</form>

			<div class="py-2 px-4 text-center">
				<button class="bg-primary rounded-md py-3 px-3  text-white">
					Sign Up
				</button>
			</div>

			<div class="flex justify-between items-center  px-5 mt-14">
				<p class="text-xs  font-semibold font-nuni">Already have an Account on Stranerd?</p>
				<span @click="() => router.push('/auth/signin')" class="flex items-center text-yellow-300 font-nuni text-xs font-bold">Sign In <i class="las la-arrow-right text-xl"></i> </span>
			</div>

			<div class="flex justify-between px-5 items-center mt-14">
				<div class="border-white border-b h-1 w-5/12"/>
				<span class="font-nuni ">or</span>
				<div class="border-white border-b h-1 w-5/12"/>
			</div>

			<p class="text-center text-xs font-nuni  font-bold mt-5 ">
				Sign Up with Google
			</p>

			<div class="flex justify-center w-full px-5">
				<ion-button  class="w-full font-bold capitalize text-base flex gap-2 justify-center items-center my-6">
					<img src="../../assets/images/icons/google.svg" alt="ask a question" class="object-fit w-5 mr-2">
					Google</ion-button>
			</div>

		
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
// import { IonContent, IonButton, IonPage } from '@ionic/vue'
import { IonContent, IonPage, IonInput, IonButton } from '@ionic/vue'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'



export default defineComponent({
	components: { IonContent,IonPage, IonInput, IonButton},
		  setup() {
		const router = useRouter()
		return { router }
	}

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