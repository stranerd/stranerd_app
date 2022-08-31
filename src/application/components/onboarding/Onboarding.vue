<template>
	<div class="w-full h-full flex flex-col justify-center">
		<div class="flex flex-col justify-center items-center gap-4">
			<component :is="['SlideOne', 'SlideTwo', 'SlideThree', 'SlideFour'][tab-1]" />
		</div>
		<div class="flex justify-center gap-2 mt-12">
			<span v-for="n in tabs" :key="n"
				:class="[n===tab ? 'bg-primaryBg':'bg-disabled', 'rounded-full w-2 h-2']"
				@click="tab = n" />
		</div>
		<div class="flex flex-col justify-between gap-4 px-4 mt-12">
			<IonButton v-if="tab > 1" class=" w-full mx-auto max-w-[300px]" @click="tab--">
				Back
			</IonButton>
			<IonButton v-if="tab < tabs" class=" w-full mx-auto max-w-[300px]" @click="tab++">
				Next
			</IonButton>
			<router-link class="mx-auto w-full max-w-[300px]" to="/auth/signin">
				<IonButton v-if="tab !== tabs" class="btn-outline no-border w-full font-normal">
					Skip
				</IonButton>
				<IonButton v-else class="btn-outline no-border w-full font-normal">
					Get Started
				</IonButton>
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
		const tab = ref(1)
		const tabs = 4
		return {
			tabs, tab
		}
	}
})
</script>

<style scoped>
.no-border {
	--border-color: transparent !important
}
</style>
