<template>
	<div class="w-full bg-white md:px-8 px-4">
		<div class="text-center container px-3 mx-auto  lg:mt-48 mt-20 ">
			<div class="flex flex-col justify-center items-center gap-3">
				<img alt="testprep image" src="@app/assets/images/auth/join.svg" />
				<ion-text class="font-extrabold  mx-auto  text-center lg:text-5xl text-base text-main_dark ">
					Journey through school with Stranerd
				</ion-text>
				<ion-text class="lg:text-[32px] text-xs">
					In class, at home or on the go, never be stranded
				</ion-text>
			
				<router-link to="/auth/signup" class="w-full h-auto mx-auto">
					<ion-button class="btn-primary  text-white lg:w-[20rem] w-32 lg:h-20 h-12 lg:text-2xl text-sm md:text-lg block mx-auto">
						Sign Up
					</ion-button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: ''
}
</script>



