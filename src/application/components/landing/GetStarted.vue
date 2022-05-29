<template>
	<div class="w-full bg-white md:px-8 px-4">
		<div class="text-center container px-3 mx-auto lg:mt-48 mt-20 ">
			<div class="flex flex-col justify-center items-center lg:gap-6 gap-3">
				<img alt="testprep image" src="@app/assets/images/auth/join.svg" />
				<IonText class="font-extrabold mx-auto text-center lg:text-5xl text-base text-secondaryText ">
					Journey through school with Stranerd
				</IonText>
				<IonText class="lg:text-[32px] text-xs">
					In class, at home or on the go, never be stranded
				</IonText>

				<router-link class="w-full h-auto mx-auto" to="/auth/signup">
					<IonButton
						class="btn-primary text-white lg:w-[20rem] w-32 lg:h-20 h-12 lg:text-2xl text-sm md:text-lg block mx-auto">
						Sign Up
					</IonButton>
				</router-link>
			</div>
		</div>
	</div>
</template>
