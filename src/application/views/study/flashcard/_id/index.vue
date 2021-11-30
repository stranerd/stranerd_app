<template>
	<Justified>
		<!-- TODO: Break into sections -->
		<div class="bg-primary w-full min-h-[150px] flex flex-col justify-center items-center pt-0 pb-1">
			<ion-text class="heading lg:text-2xl font-bold text-white text-center my-2">
				{{flashCard?.title}}
			</ion-text>
			<!-- <div class="flex items-center md:flex-row flex-col"> 
				<div class="flex items-center mr-6">
					<ShowRatings :rating="5" class="mr-3" />
					<ion-text class="text-white font-semibold">
						(14 reviews)
					</ion-text>
				</div>
				<ion-text class="text-faded_gray font-semibold">
					leave a rating
				</ion-text>

			</div> -->
		</div>
		<div
			id="screen"
			:class="[isFullscreen ? 'flex items-center justify-center flex-col':'', 'lg:w-8/12 w-full px-4 mx-auto mt-8 mb-16 bg-white']">
		

			<div class="vertical divx w-full">
				<!--  front side  -->
				<section class="front h-96 flex  items-center text-center justify-center  custom-shadow w-full text-3xl p-4 max-w-[60rem] mx-auto">
					<h2 >{{flashCard?.set[page].question}}</h2>
				</section>

				<!--  back side  -->
				<section class="back h-96 flex  items-center text-center justify-center  custom-shadow w-full text-3xl p-4 max-w-[60rem] mx-auto">
					<h2>	{{flashCard?.set[page].answer}}</h2>
				</section>
			</div>

			<div class="w-full flex items-center justify-between my-8 max-w-[30rem] mx-auto">
				<ion-icon
					@click="playCard(true)"
					:icon="play"
					class="text-icon_inactive text-xl cursor-pointer"
				/>
				<div class="flex items-center gap-5">
					<ion-icon
						@click="decrease()"
						:icon="chevronBack"
						class="text-icon_inactive text-xl cursor-pointer"
					/>
					<ion-text class="mx-4 text-icon_inactive">
						<b>{{page + 1}}</b> of <b>{{flashCard?.set.length}}</b>
					</ion-text>
					<ion-icon
						@click="increase()"
						:icon="chevronForward"
						class="text-icon_inactive text-xl cursor-pointer"
					/>
				</div>
				<ion-icon
					v-if="!isFullscreen"
					:icon="scan"
					class="text-icon_inactive text-xl cursor-pointer"
					@click="toggle()"
				/>
				<ion-icon
					v-if="isFullscreen && canExit"
					
					:icon="contract"
					class="text-icon_inactive text-xl cursor-pointer"
					@click="toggle()"
				/>
			</div>
		</div>

		<div class="footer-shadow py-4 fixed bottom-0 inset-x-0 bg-white">
			<div class="lg:w-8/12 max-w-[60rem] w-full px-4 lg:p-0 mx-auto flex items-center justify-between">
				<div class="flex" v-if="flashCard">
					<Avatar :size="28" class="mx-2" :src="flashCard?.userBio?.photo" :id="flashCard?.userId" />
					<ion-text class="text-icon_inactive"> by <b>{{flashCard?.userBio.firstName}}</b></ion-text>
				</div>

				<div class="flex items-center" >

					<!-- <ion-icon
						:icon="pencil"
						class="text-icon_inactive text-xl cursor-pointer mx-2"
					/>
					<ion-icon
						:icon="bookmark"
						class="text-icon_inactive text-xl cursor-pointer mx-2"
					/> -->
					<Share
						cssClass="text-icon_inactive text-xl cursor-pointer mx-2"
					/>
				</div>
			</div>
		</div>


	</Justified>
	<page-loading v-if="loading"/>

</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import { add, bookmark, chevronBack, chevronForward, contract, pencil, play, scan, shareSocial } from 'ionicons/icons'
import Avatar from '@app/components/core/Avatar.vue'
import { useFlashCard } from '@root/application/composable/study/flashCards'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { Alert } from '@app/composable/core/notifications'


export default {
	name: 'View Flashcard',
	displayName: 'Flashcard Set',
	components: {
		Justified,
		Avatar
	},
	setup () {
		const isFullscreen = ref(false)
		const canExit = ref(false)

		const page = ref(0)
		const router = useRouter()
		const { id } = useRoute().params
		const {flashCard, listener, error, loading} = useFlashCard(id as string)
		let interval: any
		const isPlay = ref(false)

		const increase = async ()=>{
			if(page.value+1 === flashCard.value?.set.length){
				
				const accepted = await Alert({
					title: 'You have gotten to the end of the flashCard set',
					text: 'Do you want to try again or return back to Study',
					icon: 'info',
					confirmButtonText: 'Yes, Try again',
					cancelButtonText: 'No, Back to study'
				})
				playCard()
				if(accepted) page.value = 0
				else router.push('/study')
			}
			else page.value++
		}
		const enter = ()=>{
			const screen = document.getElementById('screen')
			screen?.requestFullscreen()
			isFullscreen.value = true

		}
		const exit = ()=>{
			const screen = document.getElementById('screen')
			//@ts-ignore
			if(screen?.exitFullscreen){
				canExit.value = true
				//@ts-ignore
				screen?.exitFullscreen()
				isFullscreen.value = false
			}else canExit.value = false
			
		}
		const toggle = ()=>{
			const screen = document.getElementById('screen')
			if(isFullscreen.value)  exit()
			else enter()
		}

		const playCard = ()=>{
			if(!isPlay.value ){
				interval = setInterval(increase, 3000)
				isPlay.value = true
			}
			else{
				clearInterval(interval)
				isPlay.value = false
			}
			
		}
		const decrease = ()=>{
			if(page.value !== 0) page.value--
			
		}

		return {
			canExit,
			page,increase, decrease, playCard,
			isFullscreen, toggle, exit, enter,
			flashCard, error, loading,
			play, add, scan, chevronBack,
			chevronForward, pencil, contract, bookmark, shareSocial
		}
	}
}
</script>



<style lang="scss" scoped>
	.footer-shadow {
		box-shadow: 0px -5px 5px rgba(139, 158, 177, 0.05);
	}

	.custom-shadow {
		box-shadow: 0px 0px 50px rgba(77, 92, 111, 0.1);
		border-radius: 24px;
	}

	.ion-iten-transparent {
		--background: transparent;
	}

	ion-searchbar {
		--box-shadow: 'none';
		--border-radius: 0.5rem;
	}

	.searchbar-input.sc-ion-searchbar-md {
		padding-top: 12px;
		padding-bottom: 12px;
	}





.divx {
  display: block;
  position: relative;

  & > .front {
    // background-color: #ff9671;
  }

  & > .back {
    // background-color: #ff6f91;
    position: absolute;
    top: 0px;
    left: 0px;
  }

  & > .front,
  & > .back {
    // height: 200px;
    // width: 100%;
    // color: white;
    text-align: center;
    // display: block;
    transition-duration: 1s;
    transition-property: transform, opacity;
  }
}

// horizontal transition
.horizontal {
  & > .front {
    opacity: 1;
    transform: rotateY(0deg);
  }

  & > .back {
    opacity: 0;
    transform: rotateY(180deg);
  }

  &:hover {
    & > .front {
      opacity: 0;
      transform: rotateY(180deg);
    }

    & > .back {
      opacity: 1;
      transform: rotateY(0deg);
    }
  }
}

// vertical transition
.vertical {
  & > .front {
    opacity: 1;
    transform: rotateX(0deg);
  }

  & > .back {
    opacity: 0;
    transform: rotateX(180deg);
  }

  &:hover {
    & > .front {
      opacity: 0;
      transform: rotateX(180deg);
    }

    & > .back {
      opacity: 1;
      transform: rotateX(0deg);
    }
  }
}

</style>
