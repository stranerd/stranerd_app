<template>
	<ClassWrapper>
		<ion-segment v-model="tab" class="w-full mb-8 md:mb-12" mode="ios">
			<ion-segment-button value="info">
				<ion-label>Info</ion-label>
			</ion-segment-button>
			<ion-segment-button value="announcement">
				<ion-label>Announcement</ion-label>
			</ion-segment-button>
		</ion-segment>

		<div v-for="n in 3" :key="n" class="bg-white p-6 rounded-xl mt-4">
			<div class="flex items-center mb-4">
				<Avatar :size="48" src="#" />
				<div class="flex flex-col font-bold ml-4">
					<ion-text class="text-base text-main_dark">
						Timmy Neutron
					</ion-text>
					<ion-text class="text-xs text-gray flex items-center">
						Tutor <span class="dot"></span> 1 day ago
					</ion-text>
				</div>
			</div>

			<ion-text class="text-xl">
				Hi, I am your maths tutor and I have posted all necessary notes for this semester. I am available for
				discussions everyday by 5pm.
			</ion-text>

		</div>
	</ClassWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/vue'
import ClassWrapper from '@app/components/classes/ClassWrapper.vue'

export default defineComponent({
	name: 'ClassInfo',
	displayName: 'Classes',
	components: { ClassWrapper, IonSegment, IonSegmentButton, IonLabel },
	setup () {
		const tab = ref('info')
		return { tab }
	}
})
</script>

<style lang="scss" scoped>
	.segment-button-checked {
		color: $color-gray !important;
		background: $color-white;
	}

	ion-segment-button {
		color: $color-gray !important;
		--background: transparent !important;
		--background-checked: $color-white;
		border: 2px solid $color-white !important;
		--background-focused: $color-white;
		--indicator-color: $color-white;
	}
</style>
