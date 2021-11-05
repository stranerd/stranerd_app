<template>
	<router-link
		:class="`py-4 px-4 rounded-lg ${props.colorClass} flex flex-col w-full text-xs md:text-sm relative cursor-pointer`"
		:to="`/questions/${question?.id}`">
		<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
		<div class="flex flex-row items-center">
			<span class="mr-2"><avatar :photo-url="question?.avatar?.link" :size="'28'" /></span>
			<span class="font-bold text-dark_gray">{{ question?.userBio.fullName}}</span>
			<div class="flex flex-row-reverse flex-grow">

				<template v-if="fromHome">
					<span class="font-bold text-icon_inactive lg:mr-2">30m ago</span>
				</template>
				<template v-else>
					<template v-if="!props.fromViewQuestion">
						<button
							class="py-1 px-3 rounded-lg text-white bg-dark_gray font-bold flex flex-row items-center">
							<span class="mr-2">Answer</span>
							<span class="h-1 w-1 rounded-full bg-white mr-2"></span>
							<span class="mr-1 text-sm">+{{ question?.coins }}</span>
							<img class=" h-4" src="/assets/images/bronze.svg" />
						</button>
					</template>
					<template v-if="props.fromViewQuestion">
						<ion-icon :icon="flag" class="text-[22px]  text-icon_inactive"></ion-icon>
						<ion-icon :icon="arrowRedo" class="text-[22px] mr-2 text-icon_inactive"></ion-icon>
					</template>
				</template>

			</div>
		</div>

		<div v-if="props.isFeatured" class="mt-3">
			<button class="py-1 px-3 rounded-lg text-white bg-star_yellow font-bold flex flex-row items-center">
				Featured
			</button>
		</div>
		<div v-if="!fromHome" class="mt-3 flex flex-row items-center">
			<span class="h-[5px] w-[5px] rounded-full bg-icon_inactive mr-3"></span>
			<span class="font-semibold text-dark_gray">{{ subject?.name }}</span>
		</div>

		<p v-if="!fromViewQuestion" class="py-2 text-dark_gray leading-normal mb-3 lg:mb-5"
			v-html="question?.trimmedBody">
		</p>
		<p v-if="fromViewQuestion" class="py-2 text-dark_gray leading-normal mb-3 lg:mb-5" v-html="question?.body">
		</p>

		<div
			:class="`w-full flex flex-col lg:flex-row lg:justify-between ${!fromViewQuestion ? 'absolute bottom-3 left-0 px-4' : ''} w-full `">
			<div v-if="!fromHome" class="mt-2 mb-2 flex flex-row items-center gap-y-2 gap-x-2 flex-wrap">
				<span v-for="(tag, index) in question?.tags" :key="index">
					<span v-if="tag" class="py-1 px-2 font-bold text-white bg-faded_gray rounded-lg inline-block">
						{{ tag }}
					</span>
				</span>
			</div>

			<div class="mt-2 flex flex-row items-center ">
				<span v-if="!fromHome" class="font-bold text-icon_inactive lg:mr-2">{{ moment(question?.createdAt).fromNow() }}</span>
				<div :class="`flex ${fromHome ? 'flex-row' : 'flex-row-reverse'}  items-center flex-grow`">
					<span class="font-bold text-icon_inactive">{{ question?.answers.length }} answers</span>
					<span v-if="!fromHome" class="h-[5px] w-[5px] rounded-full bg-icon_inactive mr-3 "></span>
				</div>
			</div>
		</div>

	</router-link>
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import { IonIcon, IonRippleEffect } from '@ionic/vue'
import { arrowRedo, flag } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { useStore } from '@app/store'
import { QuestionEntity } from '@modules/questions'
import { useSubject } from '@app/composable/questions/subjects'

const Avatar = defineAsyncComponent(() => import('@app/components/core/AvatarUser.vue'))
import moment from 'moment'

export default defineComponent({
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		isFeatured: {
			type: Boolean,
			default: false
		},
		fromViewQuestion: {
			type: Boolean,
			default: false
		},
		fromHome: {
			type: Boolean,
			default: false
		},
		question: {
			type: QuestionEntity
		}
	},
	components: {
		IonIcon, IonRippleEffect, Avatar
	},
	setup (props) {

		const router = useRouter()

		const store = useStore()

		const { subject } = useSubject(props.question?.subjectId ? props.question?.subjectId : '')

		const showAnswers = () => {

			store.commit('showIonPage')
			router.push({
				name: 'answers'
			})
		}

		return {
			props,
			arrowRedo,
			flag,
			router,
			showAnswers,
			subject,
			moment
		}
	},
})
</script>
