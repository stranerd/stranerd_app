<template>
	<ion-page>
		<ion-content
			class="flex flex-col bg-dark h-screen w-screen items-start justify-center py-3 px-5 "
		>
			<div class="flex justify-between  py-6 px-5">
				<i class="las la-arrow-left text-white text-xl"></i>
				<img src="../../assets/images/icons/logo-xs.svg" alt="ask a question" class="object-fit h-4 ">
			</div>

			<h1 class="text-center text-3xl text-white font-semibold font-nuni mt-12">Set up your Account.</h1>

			<div class="flex flex-col mt-16 justify-center mx-auto items-center w-full">
				<div class="bg-white h-16 w-16 rounded-full flex justify-center items-center">
					<i class="las la-camera text-sub text-lg"></i>
				</div>
				<p class="text-xs font-semibold font-nuni text-white mt-2">Add a Picture</p>
			</div>

			<form class=" px-5 flex flex-col justify-center mx-auto mt-11">

				<ion-select placeholder="Select your Country" >
					<ion-select-option value="f">dummy 1</ion-select-option>
					<ion-select-option value="m">dummy 2</ion-select-option>
				</ion-select>
				<ion-select placeholder="Current Student Degree" >
					<ion-select-option value="f">dummy 1</ion-select-option>
					<ion-select-option value="m">dummy 2</ion-select-option>
				</ion-select>
				<ion-select placeholder="Level" >
					<ion-select-option value="f">dummy 1</ion-select-option>
					<ion-select-option value="m">dummy 2</ion-select-option>
				</ion-select>
				<ion-input placeholder="Name of your School?" position="floating"></ion-input>

			</form>

			<ion-button  class="px-5 font-bold capitalize text-base flex gap-2 justify-center items-center mt-20">
				Done
			</ion-button>

			<div class="flex justify-between items-center  px-5 mt-16 mb-8">
				<p class="text-xs text-white font-semibold font-nuni">Not a member on Stranerd?</p>
				<span @click="() => router.push('/auth/signup')" class="flex items-center text-yellow-300 font-nuni text-xs font-bold">Sign Up <i class="las la-arrow-right text-xl"></i> </span>
			</div>

		</ion-content>
	</ion-page>
</template>

<script>
// import { IonContent, IonButton, IonPage } from '@ionic/vue'
import { IonContent, IonPage, IonInput, IonButton,IonSelect,  IonSelectOption } from '@ionic/vue'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'



export default defineComponent({
	components: { IonContent,IonPage, IonInput, IonButton, IonSelect,  IonSelectOption},
	  setup() {
		const router = useRouter()
		return { router }
	}

})
</script>

<style lang="scss" scoped>

ion-input, ion-select{
	background: #EFF0F6 !important;
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