<template>
	<ion-content
		
		:scroll-events="true"
		@ionScrollStart="logScrollStart()"
		@ionScroll="logScrolling($event)"
		@ionScrollEnd="logScrollEnd()">

		<div  class="flex flex-col bg-dark h-screen w-screen items-center py-3" v-touch:swipe="onTapItem">
			<img :src="screens[currentIndex].img" alt="ask a question" class="object-fit">

			<h1 class="text-xl text-white font-extrabold  mt-6 text-center font-nuni">	{{ screens[currentIndex].title }}</h1>
			<p class="text-center text-white w-64 text-xs mt-2 font-nuni">
				{{ screens[currentIndex].text }}
				
			</p>

			<div class="flex justify-center items-center  mt-12">
			
				<div
					v-for="(comment,index) in screens"
					:key="'comment'+ index"
					:class="currentIndex === index ? 'commentIconsDotActive' : 'commentIconsDot'"
					@click.prevent="goToComment(index)"
				>
				</div>
			
			
			</div>
			<div class="mt-12 w-10/12">
				<ion-button  class="w-full font-bold mb-3 capitalize text-base">Get Started</ion-button>
				<ion-button  class="w-full font-bold capitalize text-base">Log In</ion-button>
			</div>
	

			<img src="../../assets/images/icons/logo-xs.svg" alt="ask a question" class="object-fit fixed bottom-5">
		</div>
	</ion-content>
</template>

<script>
import { IonContent, IonButton } from '@ionic/vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
	components: { IonContent,IonButton },

	setup () {
		const screens = [
			{
				img: require('../../assets/images/onboarding/ask_a_question.png'),
				title: 'Ask a Question',
				text:'Ask questions on various subjects to clear your doubts, go through all available answers from smart students and choose your best answers and ask another question'
			},
			{
				img: require('../../assets/images/onboarding/answer_a_question.png'),
				title: 'Answer a Question',
				text:'Answer questions in subjects you are very good at and get rewarded if your answer is chosen as one of the best answers'
			},
			{
				img: require('../../assets/images/onboarding/meet_tutor.png'),
				title: 'Meet Top Nerds & Tutors',
				text:'Get in-depth answers to homework questions, request sessions to get help for your homework and collaborate to solve problems and earn rewards'
			},
			{
				img: require('../../assets/images/onboarding/coin_system.png'),
				title: 'Have fun with our Coin System',
				text:'Buy or gain affordable coins to interact on the site. Bronze Coins are used to Ask Questions while Gold Coins are used for Booking Sessions with Nerds'
			},
	
		]

		const currentIndex = ref(0)
		const goToComment = (index) => {
			if (index < 0) return currentIndex.value = screens.length - 1
			if (index >= screens.length) return currentIndex.value = 0
			return currentIndex.value = index
		}
		const goToNext = () => goToComment(currentIndex.value + 1)
		const goToPrev = () => goToComment(currentIndex.value - 1)

		const onTapItem = (direction)=>{
			if(direction === 'left'){
				goToNext()
			}
			if(direction === 'right'){
				goToPrev()
			}

		
		}
		return { screens, currentIndex, goToComment, goToPrev, goToNext, onTapItem }
	}
})
</script>

<style lang="scss">
img {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
}
	ion-content{
		--background: $color-dark;
		transition: all .5s ease-in-out;
	}

	ion-button{
    --background: white;
    --border-radius: 3.125rem;
    --color: #4D5C6F;
    --background-hover: white;
	--padding-top: 1rem;
	--padding-bottom: 1rem;
	height: 2.75rem;
	transition: all .5s ease-in-out;

}


	.commentIconsDot {
		background-color: $color-white;
		height: .625rem;
		width: .625rem;
		border-radius: 3.125rem;
		transition: all .5s ease-in-out;
		margin-right: 10px;
	}

	.commentIconsDotActive {
		background-color: $color-gold;
		height: .625rem;
		width: 1.75rem;
		border-radius: .625rem;
		transition: all .5s ease-in-out;
		margin-right: 10px;

	}


</style>