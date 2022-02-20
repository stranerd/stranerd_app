<template>
	<classWrapper>
		<ion-segment  class="w-full mb-8 md:mb-12 bg-white" mode="ios">
			<ion-segment-button value="list" class="isb">
				<ion-label>Info</ion-label>
			</ion-segment-button>
			<ion-segment-button value="single" class="isb">
				<ion-label>Announcement</ion-label>
			</ion-segment-button>
		</ion-segment>
				
		<div class="bg-white p-6 rounded-xl mt-4" v-for="n in 3" :key="n">
			<div class="flex items-center mb-4">
				<Avatar  :size="48" src="#" />
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
				Hi, I am your maths tutor and I have posted all necessary notes for this semester. I am available for discussions everyday by 5pm.
			</ion-text>
		
		</div>
	</classWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue'
import classWrapper from '@app/components/classes/ClassWrapper.vue'

export default defineComponent({
	name: 'classInfo',
	displayName: 'Classes',
	components: { classWrapper, IonSegment, IonSegmentButton, IonLabel }
})
</script>


<style 	scoped>
ion-segement{
	--background: #fff !important;
}

	
.segment-button-checked {
	@apply !text-primary
}
</style>