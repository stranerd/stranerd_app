<template>
<div class="flex flex-row items-center px-2 py-[9.5px] z-50 border-b-[1px] border-faded_gray normalText text-icon_inactive justify-between normalText bg-white sticky w-full top-0">
	<div class="flex flex-row items-center gap-2">
	 <ion-icon :icon="arrowBack" class="text-dark_gray mr-2 text-[25px] cursor-pointer" @click="handleCloseChat" ></ion-icon>
	 <avatar :size="'32'"/>
	 <div class="flex flex-col ">
	    <h2 class="font-bold">
	       Timmy Neutron
	     </h2>
	     <span>Online</span>
	 </div>
	</div>

	<div class="flex flex-row items-center gap-3">
	  <ion-icon :icon="search" class=" text-[23px]" ></ion-icon>
	  <ion-icon :icon="ellipsisVertical" class="text-[23px]" ></ion-icon>
	</div>
	
</div>

</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import {  IonIcon } from '@ionic/vue'
import { arrowBack, search, ellipsisVertical } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { handleCloseChat } from '@/application/composable/sessions/ChatHandler'
const Avatar = defineAsyncComponent(() => import('@/application/components/core/AvatarUser.vue'))

export default defineComponent({
	setup() {
		const router = useRouter()
		return { 
			arrowBack, search, ellipsisVertical, router, handleCloseChat
		}
	},
	components: { 
		Avatar,
		IonIcon
	}
})
</script>
