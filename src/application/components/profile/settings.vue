<template>
	<div class="col-span-12 flex flex-col gap-6 px-3 mb-7 normalText text-icon_inactive">
		<div class="flex flex-col gap-2">
			<h2 class="headings font-bold text-dark_gray">Profile picture</h2>
			<div class=" rounded-lg py-5 px-3 text-icon_inactive relative bg-light_gray flex flex-col justify-center items-center">
				<ion-icon :icon="image" class="text-[32px]"></ion-icon>
				<input
					type="file" id="images"
					name="images"
					class="cursor-pointer w-full h-full absolute"
					style="opacity:0; overflow:hidden; position:absolute;"
					accept="image/x-png,image/jpeg,image/jpg"/>
				<p class="mt-3">
					Upload a new profile picture
				</p>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="headings font-bold text-dark_gray">Username</h2>
			<p>
				*Use your real names, they can only be changed once
			</p>
			<div class="flex flex-row items-center flex-wrap ">
				<div class="pr-1 w-full md:w-1/2">
					<div class="py-2 px-2  pl-6 bg-light_gray rounded-xl flex flex-row">
						<ion-input value="" class="w-full font-medium" placeholder="First name">
						</ion-input>
					</div>
				</div>
				<div class="pl-1 w-full md:w-1/2">
					<div class="py-2 px-2 w-full   pl-6 bg-light_gray rounded-xl flex flex-row">
						<ion-input value="" class="w-full font-medium" placeholder="Last name">
						</ion-input>
					</div>
				</div>
				
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="headings font-bold text-dark_gray">About</h2>
			<div class="border border-faded_gray rounded-xl py-4 px-3">
				<ion-textarea rows="6" 
					class="bg-white border-0 focus:outline-none  w-full"  
					placeholder="Write your question here and make sure it is explained in full detail."></ion-textarea>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="headings font-bold text-dark_gray">Level</h2>
			<div class="py-1 px-2 bg-light_gray rounded-xl flex flex-row">
				<ion-select value="notifications" class="w-full  font-medium" placeholder="Select your present level of education" interface="action-sheet">
					<ion-select-option value="maths" >Mathematics</ion-select-option>
					<ion-select-option value="physics" >Physics</ion-select-option>
					<ion-select-option value="bio" >Biology</ion-select-option>
					<ion-select-option value="geo"  >Geography</ion-select-option>
					<ion-select-option value="business" >Business</ion-select-option>
					<ion-select-option value="civil" >Civil Right</ion-select-option>
				</ion-select>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="headings font-bold text-dark_gray">Course</h2>
			<div class="py-2 px-2 w-full pl-6 bg-light_gray rounded-xl flex flex-row">
				<ion-input value="" class="w-full font-medium" placeholder="What course are you presently studying?">
				</ion-input>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="headings font-bold text-dark_gray">Best Subject</h2>
			<div class="py-2 px-2 w-full pl-6 bg-light_gray rounded-xl flex flex-row">
				<ion-input value="" class="w-full font-medium" placeholder="What subject do you excel at the most?">
				</ion-input>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="headings font-bold text-dark_gray">Password</h2>
			<p>
				*Login without Google
			</p>
			<div class="flex flex-row items-center flex-wrap ">
				<div class="pr-1 w-full md:w-1/2">
					<div class="py-2 px-2 w-full pl-6 bg-light_gray rounded-xl flex flex-row">
						<ion-input value="" type="password" class="w-full font-medium" placeholder="New Password">
						</ion-input>
					</div>
				</div>
				<div class="pl-1 w-full md:w-1/2">
					<div class="py-2 px-2 w-full pl-6 bg-light_gray rounded-xl flex flex-row">
						<ion-input value="" type="password" class="w-full font-medium" placeholder="Confirm Password">
						</ion-input>
					</div>
				</div>
			</div>

		</div>


		<div class="flex flex-col gap-2">
			<h2 class="headings font-bold text-dark_gray">Email</h2>
			<p>
				*Present email is “timmyneutron@gmail.com”
			</p>
			<div class="flex flex-row items-center flex-wrap">
				<div class="pr-1 w-full md:w-1/2">
					<div class="py-2 px-2 w-full pl-6 bg-light_gray rounded-xl flex flex-row">
						<ion-input value="" class="w-full font-medium" placeholder="New Email">
						</ion-input>
					</div>
				</div>
				<div class="pl-1 w-full md:w-1/2">
					<div class="py-2 px-2 w-full pl-6 bg-light_gray rounded-xl flex flex-row">
						<ion-input value="" class="w-full font-medium" placeholder="Stranerd Password">
						</ion-input>
					</div>

				</div>
			</div>
		</div>

		<div class="flex flex-row gap-3 mt-7  text-white">
			<div class="w-1/2 flex flex-row justify-center items-center">
				<button class="cancleBtn w-full">
					Cancle
					<ion-ripple-effect class="rounded-lg  ion-activatable"></ion-ripple-effect>
				</button>
			</div>
			<div class="w-1/2 flex flex-row justify-center items-center">
				<button class=" actionBtn  ion-activatable w-full">
					Save
					<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				</button>
			</div>
		</div>


	</div>
</template>

<script lang="ts">

import { IonIcon, IonInput, IonTextarea, IonSelect, IonSelectOption, IonRippleEffect } from '@ionic/vue'
import { image } from 'ionicons/icons'


export default  {
	name: 'profileSettings',
	components: {  IonIcon, IonInput, IonTextarea, IonSelect, IonSelectOption, IonRippleEffect },
	setup() {

		return {
			image
		}
	}
}
</script>
<style scoped>
ion-toolbar {
	--background: #F7F7FC;
}

ion-input {
	--placeholder-color: #8B9EB1;
}

ion-select {
 
  /* Set a different placeholder color */
  --placeholder-color: #8B9EB1;

  /* Set full opacity on the placeholder */
  --placeholder-opacity: 1;
}

ion-textarea {
 
  /* Set a different placeholder color */
  --placeholder-color: #8B9EB1;

  /* Set full opacity on the placeholder */
  --placeholder-opacity: 1;
}

ion-input {
 
  /* Set a different placeholder color */
  --placeholder-color: #8B9EB1;

  /* Set full opacity on the placeholder */
  --placeholder-opacity: 1;
}

</style>