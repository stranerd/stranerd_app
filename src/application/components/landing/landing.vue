<template>
	<div class="w-full pt-14 relative">
		<div class="w-full relative">
			<div class="landing-section h-72 sm:h-80 w-full relative">
				<div class="container h-full mx-auto">
					<div class="py-5 px-5 md:py-32 md:px-8 h-full">
						<div class="flex items-start justify-end h-full">
							<div class="w-full md:w-1/2 h-full">
								<div class="flex items-end justify-center h-full md:px-12">
									<img alt=""
										class="w-auto h-full md:hidden"
										src="@app/assets/images/landing-imgs/mobile-group-cards.png">
									<img alt=""
										class="w-full -mb-10 hidden md:inline-block"
										src="@app/assets/images/landing-imgs/desktop-group-cards.png">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="bg-transparent relative md:absolute top-0 left-0 w-full h-full">
				<div class="container mx-auto h-full">
					<div class="py-10 px-3.5 md:py-32 md:px-8 h-full">
						<div class="flex items-center justify-start h-full">
							<div class="text-dark text-center md:text-left md:text-white w-full md:w-1/2">
								<h1 class="text-4xl md:text-5xl text-center md:text-left font-black max-w-xs md:max-w-sm mx-auto md:mx-0">
									Study smarter with Stranerd
								</h1>
								<div class="my-8 md:my-14 font-bold text-xs md:text-sm">
									<p class="leading-loose text-center md:text-left">Improve your results through:</p>
									<ul class="list-disc ml-3.5">
										<li class="leading-loose max-w-max md:w-full mx-auto md:mx-0">
											Incentivized learning (<a class="underline" href="/landing">see how this
												works</a>)
										</li>
										<li class="leading-loose max-w-max md:w-full mx-auto md:mx-0">
											Access to 150,000+ flashcards, past questions & study sets
										</li>
										<li class="leading-loose max-w-max md:w-full mx-auto md:mx-0">
											Expert tutors on standby to help out with difficult questions
										</li>
									</ul>
								</div>
								<router-link
									class="md:border-2 md:border-white rounded-md block bg-primary md:bg-transparent text-white text-xs md:text-sm font-bold text-center mx-auto md:mx-0 w-44 lg:w-80 py-4"
									to="">
									Get Started
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="lower-section bg-butter_yellow px-3 py-10">
			<div class="max-w-2xl text-center text-main_dark mx-auto">
				<p class="font-bold text-lg md:text-3xl">
					87% of students who use Stranerd confirm increased grades and better study habits
				</p>
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
	.landing-section {
		background: url("~@app/assets/images/backgrounds/home/landing-bg.jpg") no-repeat center right 20% / auto 100%;
	}

	.text-xs {
		font-size: 10px;
	}

	@media (min-width: 574px) {
		.landing-section {
			background: url("~@app/assets/images/backgrounds/home/landing-bg.jpg") no-repeat center right 20% / cover;
			/* height: 80vh; */
		}

		.text-xs {
			font-size: 14px;
		}
	}

	@media (min-width: 768px) {
		.landing-section {
			background: url("~@app/assets/images/backgrounds/home/landing-bg.jpg") no-repeat center right 20% / cover;
			/* height: 65rem; */
			height: 80vh;
		}
	}

	/* m */
</style>
