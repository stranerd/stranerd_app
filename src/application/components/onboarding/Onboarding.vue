<template>
	<div class="w-full h-full bg-primary flex flex-col justify-between">
		<div class="bg-white h-[40%] rounded-b-[35%] flex flex-col justify-center items-center gap-4">
			<SlideOne v-if="tab === 0" />
			<SlideTwo v-if="tab === 1" />
			<SlideThree v-if="tab === 2" />
			<SlideFour v-if="tab === 3" />
		</div>

		<div class="flex justify-between gap-4 px-4 my-10">
			<ion-button v-if="tab > 0" class="btn-outline w-full mx-auto max-w-[280px]" @click="tab--">
				Back
			</ion-button>
			<ion-button v-if="tab < 3" class="btn-outline w-full mx-auto max-w-[280px]" @click="tab++">
				Next
			</ion-button>
			<router-link class="mx-auto w-full mx-auto max-w-[280px]" to="/auth/signin">
				<ion-button v-if="tab !== tabs" class="btn-outline w-full">
					Skip
				</ion-button>
				<ion-button v-else class="btn-white text-main_dark font-bold w-full">
					Get Started
				</ion-button>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import SlideOne from '@app/components/onboarding/SlideOne.vue'
import SlideTwo from '@app/components/onboarding/SlideTwo.vue'
import SlideThree from '@app/components/onboarding/SlideThree.vue'
import SlideFour from '@app/components/onboarding/SlideFour.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'Onboarding',
	components: {
		SlideOne,
		SlideTwo,
		SlideThree,
		SlideFour
	},
	setup () {
		const tab = ref(0)
		const tabs = 3
		return {
			tabs, tab
		}
	}
})
</script>
