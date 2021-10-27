<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="layout-page-chat">
				<div class="layout-body-chat normalText pb-16">
					<div class="col-span-12 flex flex-col">
					<div class="flex flex-row items-center justify-between px-3 py-4 border-b-[1px] border-faded_gray sticky top-0 bg-white z-50">
					   <h2 class="text-dark_gray text-base font-bold ">Sessions</h2>
					   <ion-icon :icon="ellipsisVertical" class="text-dark_gray text-[20px]" ></ion-icon>
					</div>

					<div class="flex flex-row items-center px-3 py-3 border-b-[1px] border-faded_gray">
					   <div class="py-3 px-4 bg-light_gray rounded-xl flex flex-row item-center w-full">
				        <input class="w-full  focus:outline-none font-medium flex-grow bg-light_gray placeholder-icon_inactive" placeholder="Search tutors..." />
				        <div class="flex ml-2 flex-row text-center justify-center">
						   <ion-icon :icon="search" class="text-icon_inactive text-[22px] inline" ></ion-icon>
						</div>
			         </div>
					</div>

					  <each-chat v-for="(chat, index) in 10" :key="index"></each-chat>
					</div>
				</div>
			</div>	
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonIcon } from '@ionic/vue'
import { defineAsyncComponent } from 'vue'
//import { defineAsyncComponent } from 'vue'
const EachChat = defineAsyncComponent(() => import('@/application/components/chat/eachChat.vue'))
import { ellipsisVertical, search  } from 'ionicons/icons'

export default  {
	name: 'chat',
	layout: 'Chat',
	components: { IonPage, IonContent, IonIcon, EachChat },
	setup(){
		return { ellipsisVertical, search }
	}
}
</script>
<style scoped>
ion-toolbar {
	--background: #F7F7FC;
}

ion-input {
 
  /* Set a different placeholder color */
  --placeholder-color: #8B9EB1;

  /* Set full opacity on the placeholder */
  --placeholder-opacity: 1;
}

</style>