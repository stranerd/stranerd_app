<template>
	<div>
		<Accordion v-for="faq in faqs" :key="faq.answer" :faq="faq" />
	</div>
</template>

<script setup lang="ts">
import Accordion from './accordion.vue'
const faqs = [
	{
		question: 'What is stranerd?',
		answer: 'Stranerd is an online learning service that provides students with tools and resources that help with homework, test prep, exam prep, and projects. ',
	},
	{
		question: 'How many questions can I ask?',
		answer: 'You have the option of asking ten(10) questions which are covered by your subscription plan. If you have more questions, you’d have to buy a new subscription plan.',
	},
	{
		question: 'Can I rate an answer?',
		answer: 'Yes, you can, every answer or comment made on a question can either be UPVOTED or DOWNVOTED.',
	},
	{
		question: 'What does it mean to get the “best answer” tag? ',
		answer: 'An answer is tagged “BEST ANSWER” if the information provided in that answer is satisfactory to the person that asked a question. This answer is then marked as the best answer and the person who gave the answer is rewarded.',
	},
	{
		question: 'Can I comment on an answer?',
		answer: 'Yes, you can, comments can be made under each question and also can be made under each answer.',
	},
	{
		question: 'How much is the stranerd subscription?',
		answer: 'The STRANERD SOLO subscription package is N1500 per month. This subscription gives you access to ask/post your questions for an expert tutor to answer them.',
	},
]
</script>

<style scoped></style>
