<template>
	<div class="w-full">
		<div class="landing-section w-full">
			<div class="container mx-auto">
				<div class="py-32 px-10">
					<div class="flex items-stretch">
						<div class="text-white flex-1">
							<h1 class="text-5xl font-extrabold max-w-sm">
								Study smarter with Stranerd
							</h1>
							<div class="my-12 font-medium">
								<p class="leading-loose">Improve your results through:</p>
								<ul class="list-disc ml-5">
									<li class="leading-loose">
										Incentivized learning (<a href="/landing" class="underline">see how this works</a>)
									</li>
									<li class="leading-loose">
										Access to 150,000+ flashcards, past questions & study sets
									</li>
									<li class="leading-loose">
										Expert tutors on standby to help out with difficult questions
									</li>
								</ul>
							</div>
							<router-link to="" class="border-2 border-white rounded-md block text-xl text-center font-medium w-60 py-2.5">
								Get Started
							</router-link>
						</div>
						<div class="flex-1">
							<div class="flex items-end justify-center h-full px-10">
								<img src="@app/assets/images/landing-imgs/desktop-group-cards.png" class="w-full" alt="">
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
    no-repeat center right / cover;
}
</style>