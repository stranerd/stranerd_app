<template>
	<ion-page >
		<ion-content
			slot="fixed"
			class="flex flex-col bg-dark h-screen w-screen items-center py-3"
		>

			<swiper
				:slides-per-view="1"
				:pagination="true"
				class="py-24"
			
			>
				<swiper-slide>
					<slideOne/>
				</swiper-slide>
				<swiper-slide>
					<slideTwo/>
				</swiper-slide>
				<swiper-slide>
					<slideThree/>
				</swiper-slide>
				<swiper-slide>
					<slideFour/>
				</swiper-slide>
			</swiper>

			<div  class="flex flex-col bg-dark  w-screen items-center py-3" >
				<div class="mt-12 w-10/12">
					<ion-button  class="w-full font-bold mb-3 capitalize text-base">Get Started</ion-button>
					<ion-button  class="w-full font-bold capitalize text-base">Log In</ion-button>
				</div>
	

				<img src="../../assets/images/icons/logo-xs.svg" alt="ask a question" class="object-fit fixed bottom-5">

			</div>
		<!-- <div  class="flex flex-col bg-dark h-screen w-screen items-center py-3" v-touch:swipe="onTapItem">
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
		</div> -->
		</ion-content>
	</ion-page>
</template>

<script>
import { IonContent, IonButton, IonPage } from '@ionic/vue'
import { defineComponent, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, {Pagination} from 'swiper'
SwiperCore.use([Pagination])
import slideOne from './slideOne.vue'
import slideTwo from './slideTwo.vue'
import slideThree from './slideThree.vue'
import slideFour from './slideFour.vue'
import 'swiper/swiper-bundle.min.css'


export default defineComponent({
	components: { IonContent,IonButton ,IonPage,Swiper, SwiperSlide, slideOne,slideTwo, slideThree,slideFour},

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

.swiper-container{
	height: 34rem;
}
	.swiper-pagination-bullet {
		background-color: $color-white;
		height: .625rem;
		width: .625rem;
		border-radius: 3.125rem;
		transition: all .5s ease-in-out;
		margin-right: 10px;
		opacity: 1;
	}

	.swiper-pagination-bullet-active {
		background-color: $color-gold;
		height: .625rem;
		width: 1.75rem;
		border-radius: .625rem;
		transition: all .5s ease-in-out;
		margin-right: 10px;

	}


</style>