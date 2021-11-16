<template>
	<div class="w-full pt-14 relative">
		<div class="w-full relative">
			<div class="landing-section w-full h-full relative">
				<div class="container h-full mx-auto">
					<div class="py-12 px-5 md:py-32 md:px-10 h-full">
						<div class="flex items-start justify-end h-full">
							<div class="w-full md:w-1/2 h-full">
								<div class="flex items-end justify-start md:justify-center h-full md:px-12">
									<img src="@app/assets/images/landing-imgs/mobile-group-cards.png" class="w-2/3 md:hidden" alt="">
									<img src="@app/assets/images/landing-imgs/desktop-group-cards.png" class="w-full -mb-10 hidden md:inline-block" alt="">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="bg-transparent relative md:absolute top-0 left-0 w-full h-full">
				<div class="container mx-auto h-full">
					<div class="py-32 px-10 h-full">
						<div class="flex items-center justify-start h-full">
							<div class="text-dark_gray text-center md:text-left md:text-white w-full md:w-1/2">
								<h1 class="text-4xl md:text-5xl text-center md:text-left font-extrabold max-w-xs md:max-w-sm mx-auto md:mx-0">
									Study smarter with Stranerd
								</h1>
								<div class="my-14 font-medium text-sm">
									<p class="leading-loose text-center md:text-left">Improve your results through:</p>
									<ul class="list-disc ml-5">
										<li class="leading-loose max-w-max md:w-full mx-auto md:mx-0">
											Incentivized learning (<a href="/landing" class="underline">see how this works</a>)
										</li>
										<li class="leading-loose max-w-max md:w-full mx-auto md:mx-0">
											Access to 150,000+ flashcards, past questions & study sets
										</li>
										<li class="leading-loose max-w-max md:w-full mx-auto md:mx-0">
											Expert tutors on standby to help out with difficult questions
										</li>
									</ul>
								</div>
								<router-link to="" class="md:border-2 md:border-white rounded-md block bg-primary md:bg-transparent text-white text-xl text-center font-medium mx-auto md:mx-0 w-60 py-2.5">
									Get Started
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="lower-section bg-butter_yellow px-3 py-10">
			<div class="max-w-2xl text-center text-dark_gray mx-auto">
				<p class="font-bold text-3xl">
					87% of students who use Stranerd confirm increased grades and better study habits
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: '',
}
</script>

<style scoped>
.landing-section {
  background: url("~@app/assets/images/backgrounds/home/landing-bg.jpg")
    no-repeat center right 20% / cover;
}
@media (min-width: 540px) {
.landing-section {
	height: 80vh;
}	
}
/* m */
</style>