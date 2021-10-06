<template>
	<div class="flex justify-center items-center gap-1">
		<ion-icon :icon="chevronBackOutline" class="text-2xl text-faded_gray"/>
			
		<ion-icon
			v-for="(comment,index) in 3"
			:key="'comment'+ index"
			:class="[0 === index ? 'text-primary' : 'text-faded_gray', 'w-2 h-2 text-2xl  text-[8px]']"
			:icon="ellipse" 
		/>
		<ion-icon :icon="chevronForwardOutline" class="text-2xl text-faded_gray "/>
	</div>
</template>

<script>
import {  IonIcon } from '@ionic/vue'
import { chevronForwardOutline, chevronBackOutline, ellipse } from 'ionicons/icons'
export default {
	components: {  IonIcon },
	setup(){
		return{
			chevronForwardOutline, chevronBackOutline, ellipse
		}
	}
}
</script>

<style>

</style>