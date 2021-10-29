<template>
<div class="flex flex-row items-center px-3 py-4 bg-light_gray border-b-[1px] border-faded_gray text-icon_inactive gap-3 normalText sticky w-full bottom-0 justify-between">
  <ion-icon :icon="addCircle" class=" text-[23px]" ></ion-icon>
	<input class="bg-light_gray focus:outline-none flex-grow placeholder-icon_inactive" placeholder="Type your response here" />
	<div class="flex flex-row items-center gap-3"> 
	  <ion-icon :icon="videocam" class=" text-[23px]" ></ion-icon>
	  <ion-icon :icon="camera" class=" text-[23px]" ></ion-icon>
	  <ion-icon :icon="mic" class=" text-[23px]" ></ion-icon>
	</div>
</div>

</template>
<script lang="ts">
import {  defineComponent } from 'vue'
import {  IonIcon } from '@ionic/vue'
import { mic, videocam, camera, addCircle } from 'ionicons/icons'

export default defineComponent({
	setup() {
		return { 
			 mic, videocam, camera, addCircle 
		}
	},
	components: { 
		IonIcon
	}
})
</script>
