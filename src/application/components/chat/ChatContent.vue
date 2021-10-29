<template>
<div class="flex flex-col px-3 py-7 gap-5 text-icon_inactive normalText  flex-grow overflow-y-auto">
   <div class="w-full flex flex-row justify-end">
     <div class="py-4 w-[80%] lg:w-[50%] md:w-[60%] bg-light_gray px-3 flex flex-col gap-1 rounded-xl">
	 <p>
	   Take care
	 </p>
	 <div class="flex flex-row justify-end items-center text-[14px] gap-2">
	   <span>11:12</span>
	    <ion-icon :icon="checkmarkDoneOutline" class="text-[19px] text-primary" ></ion-icon>
	 </div>
	 </div>
   </div>

    <div class="w-full flex flex-row justify-start">
     <div class="py-4 w-[80%] lg:w-[50%] md:w-[60%] bg-light_blue px-3 flex flex-col gap-1 rounded-xl">
	 <p>
	   I’ll request same time tommorrow
	 </p>
	 <div class="flex flex-row justify-end items-center text-[14px] gap-2">
	   <span>11:12</span>
	 </div>
	 </div>
   </div>

    <div class="w-full flex flex-row justify-center bg">
	  <span class="px-4 py-2 bg-light_gray rounded-xl">Today</span>
   </div>

    <div class="w-full flex flex-row justify-end">
     <div class="py-4 w-[80%] lg:w-[50%] md:w-[60%] bg-light_gray px-3 flex flex-col gap-1 rounded-xl">
	 <p>
	   Hey guyss... This is the longest a message can get, ya dig?
	 </p>
	 <div class="flex flex-row justify-end items-center text-[14px] gap-2">
	   <span>11:12</span>
	    <ion-icon :icon="checkmarkDoneOutline" class="text-[19px] text-primary" ></ion-icon>
	 </div>
	 </div>
   </div>

    <div class="w-full flex flex-row justify-start">
     <div class="py-4 w-[70%] lg:w-[30%] md:w-[40%] bg-light_blue px-3 flex flex-col gap-1 rounded-xl">
	  <div class="h-40 w-full border-faded_gray border-2 rounded-xl ">
	  </div>
	 <p>
	   I’ll request same time tommorrow
	 </p>
	 <div class="flex flex-row justify-end items-center text-[14px] gap-2">
	   <span>11:12</span>
	 </div>
	 </div>
   </div>


</div>

</template>
<script lang="ts">
import {  defineComponent } from 'vue'
import {  IonIcon } from '@ionic/vue'
import { checkmarkDoneOutline} from 'ionicons/icons'

export default defineComponent({
	setup() {
		return { 
			checkmarkDoneOutline
		}
	},
	components: { 
		IonIcon
	}
})
</script>
