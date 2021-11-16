<template>
	<div class="w-full bg-light_gray">
		<div class="container mx-auto px-3 py-10">
			<div class="text-dark_gray">
				<div class="text-center max-w-xl mx-auto my-10">
					<h2 class="font-bold text-3xl text-primary">
						Imagine a place where you can;
					</h2>
					<img src="@app/assets/images/landing-lines/about-heading-boder.png" class="mx-auto" alt="">
				</div>
				<div class="flex items-center flex-wrap md:flex-nowrap md:flex-row-reverse gap-4 md:gap-10 my-10">
					<div class="w-full md:w-1/2 flex items-stretch md:flex-auto flex-none gap-4 md:gap-10">
						<VideoCard></VideoCard>
					</div>
					<div class="w-full md:w-1/2 lg:flex-auto flex-none">
						<div class="md:mr-10">
							<h3 class="text-orange font-medium text-3xl mb-10">Save time doing homework</h3>
							<ul class="list-disc ml-5 my-3.5">
								<li class="leading-10">
									Get correct answers to help you finish homework faster.
								</li>
								<li class="leading-10"> 
									Ask questions and get quick solutions from a community of students and tutors..
								</li>
							</ul>
							<router-link to="" class="rounded-md block bg-dark_gray text-white text-xl text-center w-60 py-2.5">
								Ask a Question
							</router-link>                                
						</div>
					</div>
				</div>
				<div class="flex items-center flex-wrap md:flex-nowrap gap-4 md:gap-10 my-10">
					<div class="w-full md:w-1/2 flex items-stretch md:flex-auto flex-none gap-4 md:gap-10">
						<VideoCard></VideoCard>
					</div>
					<div class="w-full md:w-1/2 lg:flex-auto flex-none">
						<div class="md:ml-10">
							<h3 class="text-orange font-medium text-3xl mb-10">Create your own learning environment</h3>
							<ul class="list-disc ml-5 my-3.5">
								<li class="leading-10">
									Curate your personal study set from over 150,000 study resources
								</li>
								<li class="leading-10">
									Flash cards
								</li>
								<li class="leading-10">
									JAMB, WAEC, TOEFL, SAT I & II, GRE past questions & more
								</li>
								<li class="leading-10">
									Course notes
								</li>
							</ul>
							<router-link to="" class="rounded-md block bg-dark_gray text-white text-xl text-center w-60 py-2.5">
								Create Study Sets
							</router-link>                                
						</div>
					</div>
				</div>
				<div class="flex items-center flex-wrap md:flex-nowrap md:flex-row-reverse gap-4 md:gap-10 my-10">
					<div class="w-full md:w-1/2 flex items-stretch md:flex-auto flex-none gap-4 md:gap-10">
						<VideoCard></VideoCard>
					</div>
					<div class="w-full md:w-1/2 lg:flex-auto flex-none">
						<div class="md:mr-10">
							<h3 class="text-orange font-medium text-3xl mb-10">Redefine how you prepare for tests & exams</h3>
							<ul class="list-disc ml-5 my-3.5">
								<li class="leading-10">
									Take SATs, JAMB, GRE, IJMB test practices
								</li>
								<li class="leading-10">
									Get access to summary notes & revision guides
								</li>
								<li class="leading-10">
									Learn on the go with video materials
								</li>
								<li class="leading-10">
									Flexible classes that fit your study schedule
								</li>
								<li class="leading-10">
									A dedicated tutor for all your prep needs
								</li>
							</ul>
							<router-link to="" class="rounded-md block bg-dark_gray text-white text-xl text-center w-60 py-2.5">
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