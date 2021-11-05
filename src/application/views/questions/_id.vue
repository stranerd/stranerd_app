<template>
	<ion-page>
		<top-bar :isNotDashboard="true"></top-bar>
		<ion-header class="block lg:hidden" mode="ios">
			<ion-toolbar class="px-2">
				<ion-buttons slot="start" @click="router.go(-1)">
					<ion-icon :icon="arrowBackOutline" class="text-[23px] text-dark_gray"></ion-icon>
				</ion-buttons>
				<ion-title>Answers</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<div class="layout-page-notab">
				<div class="layout-body">
					<div class="w-full flex flex-col px-3 col-span-12">
						<div
							class="col-span-12 pb-3 px-1 flex-row items-center text-dark_gray font-bold hidden lg:flex cursor-pointer"
							@click="router.go(-1)">
							<ion-icon :icon="arrowBackOutline" class="text-[25px]  mr-2"></ion-icon>
							<span>Back</span>
						</div>
						<div class="grid grid-cols-12 md:px-2 w-full mb-4 text-xs md:text-sm">
							<div class="col-span-12">
								<question :colorClass="'bg-light_gray'"
										  :fromViewQuestion="true"
										  :question="question"></question>
							</div>

							<div v-if="question?.attachments" class="col-span-12 py-3">
								<photo-list :photos="question?.attachments"></photo-list>
							</div>

							<template v-if="!showAddAnswer">
								<div class="mt-1 col-span-12">
									<button
										class="py-3 px-4 justify-center rounded-lg text-white bg-dark_gray w-full font-bold flex flex-row items-center"
										@click="showAddAnswer = true">
										<span class="mr-2">Add your answer</span>
										<span class="h-1 w-1 rounded-full bg-white mr-2"></span>
										<span class="mr-1 text-sm">+20</span>
										<img class=" h-4" src="/assets/images/bronze.svg" />
									</button>
								</div>
							</template>
							<template v-else>
								<div class="col-span-12 mt-8">
									<create-answer :question="question"></create-answer>
								</div>
							</template>

							<div class="mt-6 col-span-12 flex flex-col">
								<h2 class="text-dark_gray text-sm font-bold">
									Answers<span class="text-icon_inactive">({{ question?.answers.length }})</span>
								</h2>
								<answer v-for="(answer,index) in answers" :key="index" :answer="answer"></answer>
							</div>

						</div>
					</div>
				</div>
				<div class="layout-side-right">
					<side-profile-nav></side-profile-nav>
				</div>
			</div>
		</ion-content>
		<side-nav-bar></side-nav-bar>
	</ion-page>
</template>

<script lang="ts">

import { IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { defineAsyncComponent } from 'vue'
import { arrowBackOutline, arrowRedo, chevronDown, send, shareSocial, star, thumbsDown, thumbsUp } from 'ionicons/icons'
import { useRoute, useRouter } from 'vue-router'
import { useQuestion } from '@app/composable/questions/questions'
import { showAddAnswer, useAnswerList } from '@app/composable/questions/answers'

const SideProfileNav = defineAsyncComponent(() => import('@app/components/layout/sidebars/SideProfileNav.vue'))
const Question = defineAsyncComponent(() => import('@app/components/questions/question.vue'))
const Answer = defineAsyncComponent(() => import('@app/components/questions/answers/each.vue'))
const CreateAnswer = defineAsyncComponent(() => import('@app/components/questions/answers/create.vue'))
const TopBar = defineAsyncComponent(() => import('@app/components/layout/topNavigations/Topbar.vue'))
const SideNavBar = defineAsyncComponent(() => import('@app/components/layout/sidebars/DefaultSidebar.vue'))
const PhotoList = defineAsyncComponent(() => import('@app/components/core/photoList.vue'))

export default {
	name: 'answers',
	layout: 'SubPages',
	middlewares: ['isAuthenticated'],
	components: {
		IonPage,
		IonContent,
		SideProfileNav,
		IonTitle,
		IonIcon,
		IonButtons,
		IonHeader,
		IonToolbar,
		Question,
		Answer,
		CreateAnswer,
		TopBar,
		SideNavBar,
		PhotoList
	},
	setup () {
		const route = useRoute()
		const router = useRouter()

		const { error, loading, question } = useQuestion(Array.isArray(route.params.id) ? '' : route.params.id)

		const { answers } = useAnswerList(question.value?.id ? question.value?.id : '')

		return {
			arrowBackOutline,
			arrowRedo,
			shareSocial,
			chevronDown,
			thumbsDown,
			thumbsUp,
			star,
			send,
			router,
			showAddAnswer,
			error, loading, question,
			answers
		}
	}
}
</script>
<style scoped>
	ion-toolbar {
		--background: #F7F7FC;
	}
</style>
