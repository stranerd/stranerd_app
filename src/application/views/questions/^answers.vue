<template>
	<ion-page>
		<ion-header mode="ios" class="block lg:hidden">
			<ion-toolbar class="px-2">
				<ion-buttons @click="router.go(-1)" slot="start">
					<ion-icon :icon="arrowBackOutline" class="text-[23px] text-dark_gray"></ion-icon>
				</ion-buttons>
				<ion-title>Answers</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<div class="layout-page-notab">
				<div class="layout-body">
					<div class="w-full flex flex-col px-3 col-span-12">
						<div  @click="router.go(-1)"  class="col-span-12 pb-3 px-1 flex-row items-center text-dark_gray font-bold hidden lg:flex cursor-pointer">
							<ion-icon :icon="arrowBackOutline" class="text-[25px]  mr-2"></ion-icon>
							<span>Back</span>
						</div>
						<div class="grid grid-cols-12 md:px-2 w-full mb-4 text-xs md:text-sm">
							<div class="col-span-12">
								<question :fromViewQuestion="true"></question>
							</div>

							<template v-if="!showAddAnswer">
								<div class="mt-5 col-span-12">
									<button @click="showAddAnswer = true" class="py-3 px-4 justify-center rounded-lg text-white bg-primary lg:bg-dark_gray w-full font-bold flex flex-row items-center">
										<span class="mr-2">Add your answer</span>
										<span class="h-1 w-1 rounded-full bg-white mr-2" ></span>
										<span class="mr-1 text-sm">+20</span>
										<img src="/assets/images/bronze.svg" class=" h-4"/>
									</button>
								</div>
							</template>
							<template v-else>
								<div class="col-span-12 mt-8">
									<create-answer></create-answer>
								</div>
							</template>
							

							<div class="mt-6 col-span-12 flex flex-col">
								<h2 class="text-dark_gray text-sm font-bold">
									Answers<span class="text-icon_inactive">(2)</span>
								</h2>
								<answer></answer>
								<answer></answer>
							</div>


						</div>
					</div>
				</div>
				<div class="layout-side-right">
					<side-profile-nav></side-profile-nav>
				</div>
			</div>		
		</ion-content>
	</ion-page>
</template>

<script lang="ts">

import { IonPage, IonContent, IonTitle, IonIcon, IonButtons, IonHeader, IonToolbar } from '@ionic/vue'
import { defineAsyncComponent, ref } from 'vue'
import { arrowBackOutline, arrowRedo, shareSocial, chevronDown, thumbsDown, thumbsUp, star, send } from 'ionicons/icons'
import { useRouter } from 'vue-router'
const SideProfileNav = defineAsyncComponent(() => import('@/application/components/layout/sidebars/SideProfileNav.vue'))
const Question = defineAsyncComponent(() => import('@/application/components/questions/question.vue'))
const Answer = defineAsyncComponent(() => import('@/application/components/questions/answers/each.vue'))
const CreateAnswer = defineAsyncComponent(() => import('@/application/components/questions/answers/create.vue'))

export default  {
	name: 'answers',
	components: { IonPage, IonContent, SideProfileNav, IonTitle, IonIcon, IonButtons, IonHeader, IonToolbar, Question, Answer, CreateAnswer },
	setup() {
		const router = useRouter()

		const showAddAnswer = ref(false)

		return {
			router,
			arrowBackOutline,
			arrowRedo,
			shareSocial,
			chevronDown,
			thumbsDown,
			thumbsUp,
			star,
			send,
			showAddAnswer
		}
	}
}
</script>
<style scoped>
ion-toolbar {
	--background: #F7F7FC;
}
</style>