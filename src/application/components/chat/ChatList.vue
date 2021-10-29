<template>
<div class=" flex flex-col absolute h-full w-full overflow-y-auto lg:border-r-[1px] border-faded_gray  normalText lg:rounded-tl-xl">
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
		<div class="flex-grow overflow-y-scroll pb-11">
		<each-chat v-for="(chat, index) in 10" :key="index"></each-chat>
		</div>
</div>
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import {  IonIcon } from '@ionic/vue'
import { search, ellipsisVertical } from 'ionicons/icons'
const EachChat = defineAsyncComponent(() => import('@/application/components/chat/eachChat.vue'))

export default defineComponent({
	setup() {
		return { 
			 search, ellipsisVertical
		}
	},
	components: { 
		IonIcon, EachChat
	}
})
</script>
