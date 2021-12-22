<template>
	<div class="w-full bg-light_gray md:px-8 px-4">
		<div class="text-center container px-3 mx-auto py-10">
			<div class="text-main_dark">
		
				<ion-text class="font-extrabold  mx-auto  lg:mt-48 lg:mb-24 mt-20 mb-12 text-center lg:text-5xl text-base text-main_dark ">
					Journey through school with Stranerd
				</ion-text>
				<div class="flex items-stretch flex-wrap lg:flex-nowrap gap-4 lg:gap-10 my-10">
					<div class="w-full lg:w-1/2 flex items-stretch lg:flex-auto flex-none gap-4 lg:gap-10">
						<div class="w-1/2 flex-auto">
							<div class="">
								<div class="mb-10">
									<img alt="" class="w-full rounded-md"
										src="@app/assets/images/get-started/figure1.png">
								</div>
							</div>
						</div>
						<div class="w-1/2 flex-auto">
							<div class="">
								<div class="mt-10">
									<img alt="" class="w-full rounded-md"
										src="@app/assets/images/get-started/figure2.png">
								</div>
							</div>
						</div>
					</div>
					<div class="w-full lg:w-1/2 flex items-stretch lg:flex-auto flex-none gap-4 lg:gap-10">
						<div class="w-1/2 flex-auto">
							<div class="">
								<div class="mb-10">
									<img alt="" class="w-full rounded-md"
										src="@app/assets/images/get-started/figure3.png">
								</div>
							</div>
						</div>
						<div class="w-1/2 flex-auto">
							<div class="">
								<div class="mt-10">
									<img alt="" class="w-full rounded-md"
										src="@app/assets/images/get-started/figure4.png">
								</div>
							</div>
						</div>
					</div>
				</div>
				<router-link
					class="bg-primary rounded-md block text-white text-sm text-center font-bold w-44 lg:w-80 py-4 my-10 mx-auto"
					to="">
					Get Started
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

<style scoped>
</style>
