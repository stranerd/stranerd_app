<template>
	<div class="w-full h-full flex flex-col justify-center mt-12">
		<div class="flex flex-col justify-center items-center gap-4">
			<SlideOne v-if="tab === 0" />
			<SlideTwo v-if="tab === 1" />
			<SlideThree v-if="tab === 2" />
			<SlideFour v-if="tab === 3" />
		</div>
		<div class="flex justify-center gap-2 mt-12">
			<span :class="[n===tab ? 'bg-primaryBg':'bg-disabled', 'rounded-full w-2 h-2 ']" v-for="n in [0,1,2,3]" :key="n"></span>
		</div>
		<div class="flex flex-col justify-between gap-4 px-4 mt-12">
			<IonButton v-if="tab > 0" class=" w-full mx-auto max-w-[300px]" @click="tab--">
				Back
			</IonButton>
			<IonButton v-if="tab < 3" class=" w-full mx-auto max-w-[300px]" @click="tab++">
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
		const tab = ref(0)
		const tabs = 3
		return {
			tabs, tab
		}
	}
})
</script>

<style scoped>
.no-border{
--border-color: transparent !important
}
</style>