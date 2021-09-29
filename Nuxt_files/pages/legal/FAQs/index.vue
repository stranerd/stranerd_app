<template>
	<div class="px-md-2 p-1">
		<h1 class="text-dark mb-1 text-center">
			FAQs
		</h1>
		<div class="flex mw-100 justify-content-center ">
			<div id="accordionFlushExample" class="border-tags border rounded mw-lg ">
				<div v-for="(item, index) in faqs" :key="index" class="accordion-item">
					<h2 id="flush-headingOne" class="accordion-header">
						<button
							class="accordion-button "
							type="button"
							@click="toggle(item)"
						>
							{{ item.question }}
						</button>
					</h2>
					<div v-if="!item.show" :class="[item.show?'d-none':'']">
						<div class="accordion-body">
							{{ item.answer }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent,  } from 'vue'

export default defineComponent({
	name: 'FAQsPage',
	layout: 'home',
	setup () {
		// useMeta(() => ({
		// 	title: 'FAQs | Stranerd'
		// }))
		const toggle = (item: { show: boolean }) => {
			item.show = !item.show
		}
		const faqs = [
			{
				question: 'How does Stranerd work?.',
				answer: 'Stranerd is a student platform where you can ask questions about homework, get help for your study problems as well as assignments. You can ask questions on subjects you’re not sure about and meet Nerds (smart students) in various subjects to get more clarity on difficult subjects! ',
				show: false
			},
			{
				question: 'Do I have to pay before I use the services on Stranerd?.',
				answer: 'Learning is affordable here on Stranerd. You can ask questions and get them answered with the use of coins. Coins are used to ask questions on the site (bronze) and to book sessions with Nerds (gold). You can also gain coins by answering questions.',
				show: false
			},
			{
				question: 'How do I get coins? .',
				answer: 'As a new signee, you get free coins assigned to you - 100 bronze coins to ask questions. Once your free coins get exhausted, you’ll have to answer questions to get coins or purchase coins directly',
				show: false
			},
			{
				question: 'What are the coins there for? Will there be a need to purchase things in-site or can we withdraw it?.',
				answer: 'The coins are for interacting, for example, to ask questions. No you’re not purchasing anything in the site, only interacting with the coins',
				show: false
			},
			{
				question: 'How do I ask a question if my specific field of study is not in the subjects list?.',
				answer: 'Asides the subjects in the subjects list, you can add your tags as well. Once you ask a question and add the tag, like political science for example, it’ll get popularized',
				show: false
			},
			{
				question: 'I noticed that the popular tags are science related? I saw mostly science subjects, and I want to know if the site is also open to art subjects.',
				answer: 'Yes. When you want to ask a question, there are subject options that you can pick from. Science subjects are popular because most questions currently being asked are science related. You can ask a question on any subject and use the appropriate tags for that question so they can popularized as well',
				show: false
			},
			{
				question: 'How do I add a tag for two words(e.g fluid dynamics)?.',
				answer: 'Please use a hyphen for two-word tags e.g fluid-mechanics',
				show: false
			},
			{
				question: 'Why does my reward quota start from 20 bronze coins then see 8 bronze coins reflect as reward after I have posted the question? .',
				answer: 'For the coin quota, here is how it works. Say you ask a question and offer 20 bronze coins for it, here is how it is distributed - 8 coins each go to two best answers that you\'ll select while the remaining 4 is our quota. So that\'s 8-8-4 per 20 bronze coins. Say you offer 24 bronze coins for the question, that\'s 9-9-6, for two best answers and the rest for our quota. The idea is to control circulation and ensure that coins are adequately and fairly distributed.',
				show: false
			},
			{
				question: 'Why can’t I choose gold coins as a reward?.',
				answer: 'The coins are designed to serve different functions so there’s a clear distinction between their uses. Bronze coins for asking or answering and gold coins for Nerds purposes. ',
				show: false
			},
			{
				question: 'Why not make categories like Biological Sciences, Mathematical Sciences, Physical Sciences, Business Studies, Arts & Humanities, Computer & Information Technology… etc, instead of listing the subjects?.',
				answer: 'That would be too broad, we did it in such a way that it would be easier for students to find their preferred subjects down to their specifics.',
				show: false
			},
			{
				question: 'How long does it take for my question to get answered?.',
				answer: 'The goal is to have questions get answers as fast as possible. The larger the user base, the faster a question gets answered. As the number of students on the site increase, the response time per question will get shorter which means you’ll get faster responses ',
				show: false
			},
			{
				question: 'Is there any way to debunk a wrong answer or reward only the right answer?.',
				answer: 'Yes, the person who asks the question reserves the right to mark it as the best answer - which is basically the answer that satisfies him the most. The answer that gets marked as the best answer gets the coins allocated to that question ',
				show: false
			},
			{
				question: 'What if he decides to pick no answer as the best answer?.',
				answer: 'If the person who asks the question refuses to pick one best answer, other people can rate the answer and the highest average rating gets the coins',
				show: false
			},
			{
				question: 'If a user asks a question, but doesn’t find any of the answers perfect or even correct, at what point does the coin get allocated based on the rating given to each response by users? .',
				answer: ' If the person who asks the question refuses to pick one best answer, other people can rate the answer and the highest average rating gets the coins The coins get allocated to the answer that has been rated at least 20 times with an average of 3.5 ratings',
				show: false
			},
			{
				question: 'Can there be more than one best answer?.',
				answer: 'Yes, two best answers can be chosen',
				show: false
			},
			{
				question: 'Can I rate answers from a question I asked?.',
				answer: 'You can rate any answer given whether it’s your question or not.',
				show: false
			},
			{
				question: 'Can I add new subjects myself if it’s not in the subject list?',
				answer: 'We considered this and realized it would lead to disorganization. Currently, subjects on the site are root subjects that broader subject revolve around',
				show: false
			},
			{
				question: 'Can I edit a question after posting it?.',
				answer: 'Yes! You can edit a question or an answer; however, this is before any action has been performed on it. For example, a question can only be edited before it has been answered. Once it has been answered, you cannot edit it. You can also edit an answer but only if it hasn\'t gotten any ratings or hasn\'t been chosen as best answer',
				show: false
			},
			{
				question: 'The site\'s logo url doesn\'t lead to home, but the site\'s dashboard (I\'m guessing that\'s how it ought to be, or not? Since there\'s already a link from the hamburger section?.',
				answer: 'Oh yes. It was made to be like that for easy navigation. The site’s dashboard is your home once you’ve signed in.',
				show: false
			},
			{
				question: 'Who are Nerds?.',
				answer: 'Everyone on Stranerd is a Nerd and that includes you. You can answer questions in your field to help other students out with their homework and gain coins for that. ',
				show: false
			},
			{
				question: 'How long do the sessions with Nerds last?.',
				answer: 'The session duration is based on individual Nerds discretion so you’re advised to come to an agreement before entering a session in order to ensure mutual satisfaction.',
				show: false
			},
			{
				question: 'How can I request a session? .',
				answer: 'You can request a session by clicking on the Top Nerds option in the menu section. Search for a Nerd, request and the Nerd will receive a notification to come online.',
				show: false
			},
			{
				question: 'Do you have programming Nerds as well? I have some programming related questions I would like to ask.',
				answer: 'As the user base of the website grows, more nerds in the field of programming will increase but you can post your question, It’ll get answered',
				show: false
			},
			{
				question: 'How are Nerds classified so I can find a Nerd for a specific subject I have?.',
				answer: 'If you\'re booking a Nerd, it is specifically stated what subjects he is strongest in. Asides the Nerd putting such a subject on his bio, this is deduced from the session he has held or the questions he has answered. Asides that, each Nerd is vetted to ensure his skill in a particular field which he claims to be. For example, someone in Arts who has answered a lot of English questions or hosted sessions, will have that added to strong subjects so when you want to book that person you can clearly see his specific strengths',
				show: false
			},
			{
				question: 'Will the info from his answered questions be gathered from the tags (which are more detailed) or from the subject (Maths, Physics, Engineering, and whatnot) that it was on..',
				answer: 'From the tags. Tags are more specific. You can even see the tags on the person\'s bio',
				show: false
			},
			{
				question: 'What happens if I am not satisfied with a Nerd’s work?.',
				answer: 'If you’re unsatisfied or have a disagreement with a Nerd, you have the option to report that Nerd with the option provided and required measures will be taken based on the magnitude of your report. We take all reports against Nerds very seriously and will take immediate action if the report holds water. ',
				show: false
			},
			{
				question: 'Can I end a session before it is over?.',
				answer: 'You have the right to end a session before it is over but you’re advised to come to an agreement with the Nerd you’re in session with first.',
				show: false
			},
			{
				question: 'What are bronze coins used for?.',
				answer: 'Bronze coins can be used to ask questions.Bronze coins will be given for daily logins.Bronze coins will be awarded for completing challenges / milestones.',
				show: false
			},
			{
				question: 'What are gold coins used for?.',
				answer: 'Gold coins are used for booking sessions with Nerds ',
				show: false
			},
			{
				question: 'Can I purchase coins?.',
				answer: 'Yes, you can purchase coins by clicking the “Buy Coins” button and selecting how much coins you want to purchase. Our purchase option is secured by Flutterwave and none of your details will be saved on our server.',
				show: false
			},
			{
				question: 'How do I convert my coins to money?.',
				answer: 'This feature is currently unavailable.',
				show: false
			}

		]
		return {
			faqs, toggle
		}
	},
	head: {}
})
</script>

<style lang="scss" scoped>
	.accordion-header {
		background: #000;
	}

	.accordion-button {
		border-bottom: 1px solid $color-line;
		background: $color-dark;
		color: $color-line;
	}

	button {
		outline: none !important;
		box-shadow: none !important;
	}

	.accordion-button:not(.collapsed)::after {
		background-image: none !important;
	}

	.mw-lg {
		max-width: $lg !important;
	}
</style>
