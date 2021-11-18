<template>
	<div class="w-full md:px-8 px-4 bg-light_gray">
		<div class="container mx-auto px-3 py-10">
			<div class="text-black">
				<div class="text-center max-w-xl mx-auto my-10">
					<h2 class="font-bold mx-auto max-w-xs md:max-w-lg text-3xl text-primary">
						Imagine a place where you can;
					</h2>
					<img src="@app/assets/images/landing-lines/about-heading-boder.png" class="mx-auto w-44" alt="">
				</div>
				<div class="flex items-center flex-wrap justify-between md:flex-nowrap md:flex-row-reverse gap-4 md:gap-10 my-10">
					<div class="w-full md:w-1/2 flex items-stretch flex-none">
						<VideoCard></VideoCard>
					</div>
					<div class="w-full md:max-w-xs lg:max-w-md xl:max-w-lg flex-none">
						<div class="">
							<h3 class="text-orange font-bold text-xl md:text-3xl my-5 md:mb-8">Save time doing homework</h3>
							<ul class="list-disc font-medium text-xs lg:text-base ml-5 my-3.5">
								<li class="leading-8">
									Get correct answers to help you finish homework faster.
								</li>
								<li class="leading-8"> 
									Ask questions and get quick solutions from a community of students and tutors..
								</li>
							</ul>
							<router-link to="" class="rounded-md block bg-icon_inactive text-white text-xs md:text-lg font-bold text-center w-44 lg:w-80 py-4">
								Ask a Question
							</router-link>                                
						</div>
					</div>
				</div>
				<div class="flex items-center flex-wrap justify-between md:flex-nowrap md:flex-row gap-4 md:gap-10 my-10">
					<div class="w-full md:w-1/2 flex items-stretch flex-none">
						<VideoCard></VideoCard>
					</div>
					<div class="w-full md:max-w-xs lg:max-w-md xl:max-w-lg flex-none">
						<div class="">
							<h3 class="text-orange font-bold text-xl md:text-3xl my-5 md:mb-8">Create your own learning environment</h3>
							<ul class="list-disc font-medium text-xs lg:text-base ml-5 my-3.5">
								<li class="leading-8">
									Curate your personal study set from over 150,000 study resources
								</li>
								<li class="leading-8">
									Flash cards
								</li>
								<li class="leading-8">
									JAMB, WAEC, TOEFL, SAT I & II, GRE past questions & more
								</li>
								<li class="leading-8">
									Course notes
								</li>
							</ul>
							<router-link to="" class="rounded-md block bg-icon_inactive text-white text-xs md:text-lg font-bold text-center w-44 lg:w-80 py-4">
								Create Study Sets
							</router-link>                                
						</div>
					</div>
				</div>
				<div class="flex items-center flex-wrap justify-between md:flex-nowrap md:flex-row-reverse gap-4 md:gap-10 my-10">
					<div class="w-full md:w-1/2 flex items-stretch flex-none">
						<VideoCard></VideoCard>
					</div>
					<div class="w-full md:max-w-xs lg:max-w-md xl:max-w-lg flex-none">
						<div class="">
							<h3 class="text-orange font-bold text-xl md:text-3xl my-5 md:mb-8">Redefine how you prepare for tests & exams</h3>
							<ul class="list-disc font-medium text-xs lg:text-base ml-5 my-3.5">
								<li class="leading-8">
									Take SATs, JAMB, GRE, IJMB test practices
								</li>
								<li class="leading-8">
									Get access to summary notes & revision guides
								</li>
								<li class="leading-8">
									Learn on the go with video materials
								</li>
								<li class="leading-8">
									Flexible classes that fit your study schedule
								</li>
								<li class="leading-8">
									A dedicated tutor for all your prep needs
								</li>
							</ul>
							<router-link to="" class="rounded-md block bg-icon_inactive text-white text-xs md:text-lg font-bold text-center w-44 lg:w-80 py-4">
								Take Test Preps
							</router-link>                                
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import VideoCard from './VideoCard.vue'
export default {
	components: { VideoCard },
	name: '',
}
</script>

<style scoped>
.text-orange {
    color: #F5A454;
}
</style>