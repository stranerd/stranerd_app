<template>
	<div class="w-full lg:min-h-[696px] h-auto flex bg-bodyBg py-12 md:py-28">
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">Class Collaboration</span>
				<h2 class="lg:text-5xl text-3xl font-bold  text-primaryBg lg:leading-[62px]">An online classroom</h2>
				<p class="lg:text-lg text-sm">
					The coming together of classmates in one place hosted by the class representative. <br> <br>
					Classmates can now communicate, interact, and, share files and important information in an organised
					manner, without fear of data and information loss.
				</p>
				<router-link class="btn landing_btn-outline" to="/auth/signin">
					Find your class
				</router-link>
			</div>
			<img alt="hero" class="w-auto" src="@/assets/images/landing/forStudents.png">
		</div>
	</div>

	<div class="w-full lg:min-h-[696px] h-auto flex flex-col bg-primaryBg py-12 md:py-28 px-6">
		<h1 class="lg:text-6xl text-2xl font-bold text-bodyBg text-center mb-16">Classroom features</h1>
		<div class=" mx-auto justify-center grid lg:grid-cols-3 grid-cols-2 md:gap-8 gap-4  h-full">
			<div v-for="n in classroomFeatures" :key="n.title" class="card">
				<IonIcon :icon="n.icon" :style="`color:${n.color}`" />
				<h2 class="font-bold">{{ n.title }}</h2>
				<p>{{ n.desc }}</p>
			</div>
		</div>
	</div>

	<div class="w-full lg:min-h-[696px] h-auto flex bg-bodyBg py-12 md:py-28">
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<img alt="hero" class="w-auto" src="@/assets/images/landing/forStudents2.png">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">Study Tools</span>
				<h2 class="lg:text-5xl text-3xl font-bold  text-primaryBg lg:leading-[62px]">Create and access study
					resources</h2>
				<p class="lg:text-lg text-sm">
					Make your own study materials or find study materials created by others, and seek study or homework
					help from other students.
					Stranerd also provides practice tests and solution manuals.
				</p>
				<router-link class="btn landing_btn-outline" to="/auth/signin">
					Get started
				</router-link>
			</div>

		</div>
	</div>

	<div class="w-full lg:min-h-[696px] h-auto flex flex-col bg-primaryBg py-12 md:py-28 px-6">
		<h1 class="lg:text-6xl text-4xl font-bold text-bodyBg text-center mb-16">The study tools are</h1>
		<div class=" mx-auto justify-center grid lg:grid-cols-3 grid-cols-2 md:gap-8 gap-4  h-full">
			<div v-for="n in studyTools" :key="n.title" class="card">
				<IonIcon :icon="n.icon" :style="`color:${n.color}`" />
				<h2 class="font-bold">{{ n.title }}</h2>
				<p>{{ n.desc }}</p>
			</div>
		</div>
	</div>

	<div class="w-full lg:min-h-[696px] h-auto flex bg-highlight py-12 md:py-28">
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col-reverse lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">Our App</span>
				<h2 class="lg:text-5xl text-3xl font-bold  lg:leading-[62px]">Full access from anywhere at anytime</h2>
				<p class="lg:text-lg text-sm">
					Wherever you may be, you can carry Stranerd in your pocket. With your mobile device, you have
					unlimited access to any activity.
				</p>
				<div class="flex gap-4 items-center mt-6">
					<a :href="PLAYSTORE_LINK" rel="noopener noreferrer" target="_blank">
						<img alt="playstore button" class="h-12 md:h-16"
							src="@/assets/images/newLanding/play_store.svg" />
					</a>
					<a :href="APPSTORE_LINK" rel="noopener noreferrer" target="_blank">
						<img alt="appstore button" class="h-12 md:h-16"
							src="@/assets/images/newLanding/apple_store.svg" />
					</a>
				</div>
			</div>
			<img alt="hero" class="w-auto" src="@/assets/images/landing/phone.png">
		</div>
	</div>
</template>

<script lang="ts" setup>
import {
	book,
	calendar,
	calendarClear,
	chatbubble,
	documentText,
	flash,
	helpCircle,
	journal,
	library,
	list,
	megaphone
} from 'ionicons/icons'
import { APPSTORE_LINK, PLAYSTORE_LINK } from '@utils/constants'

const studyTools = [
	{
		icon: book,
		title: 'Test prep',
		desc: 'Practice tests for past questions of courses students study.',
		color: '#AC92EB'
	},
	{
		icon: helpCircle,
		title: 'Ask a question',
		desc: 'Get expert solutions to questions you need help with.',
		color: '#FF8787'
	},
	{
		icon: journal,
		title: 'Solution manuals',
		desc: 'Explanations of textbooks exercises. Coming soon',
		color: '#00C6B5'
	},
	{
		icon: flash,
		title: 'Flashcards',
		desc: 'Create flashcards to study with, improving your memorization.',
		color: '#FF8800'
	},
	{
		icon: documentText,
		title: 'Notes',
		desc: 'Write notes down when studying and to study with.',
		color: '#218FDF'
	},
	{
		icon: library,
		title: 'Private Library',
		desc: 'A personal space in your profile to upload study files to.',
		color: '#FF6496'
	}
]
const classroomFeatures = [
	{
		icon: megaphone,
		title: 'Announcement',
		desc: 'Latest information keeping all classmates up to date.',
		color: '#218FDF'
	},
	{
		icon: calendar,
		title: 'Events',
		desc: 'Important information that convey a deadline date and time.',
		color: '#FF8800'
	},
	{
		icon: calendarClear,
		title: 'Timetable',
		desc: 'Permanently displayed class timetable to check anytime.',
		color: '#AC92EB'
	},
	{
		icon: list,
		title: 'Course outline',
		desc: 'The plan that outilnes the weekly topics to be learnt under all courses.',
		color: '#FF6496'
	},
	{
		icon: chatbubble,
		title: 'Discussions',
		desc: 'A medium of messaging that can be created for multilple topics. ',
		color: '#00C6B5'
	},
	{
		icon: library,
		title: 'Library',
		desc: 'Organised files shared in a class, sorted by diiscussions.',
		color: '#FF8787'
	}
]</script>

<style scoped>
@media (min-width: 1000px) {
	.lg\:grid-cols-3 {
		grid-template-columns: repeat(3, minmax(0, 378px)) !important;
	}
}

.card {
	@apply flex flex-col items-center justify-center gap-2 md:p-6 p-4  text-center bg-bodyBg md:rounded-3xl rounded-2xl md:h-[276px] h-36 md:text-lg text-xs
}
</style>
