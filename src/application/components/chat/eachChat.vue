<template>
<div class="flex flex-row items-center px-3 py-4 border-b-[1px] border-light_gray cursor-pointer text-icon_inactive" @click="handleOpenChat" >
	 <avatar :size="'41'" :has-dot="true"/>
	 <div class="flex flex-col justify-center  px-3  flex-grow">
		<h3 class="text-dark_gray heading font-bold">Timmy Neutron</h3>
		<span>I’m sure I will! Thank you...</span>
		</div>
		<div class="flex flex-row-reverse justify-start h-full">
		<span>00:12pm</span>
	</div>
</div>

</template>
<script lang="ts">
import { handleOpenChat } from '@/application/composable/sessions/ChatHandler'
import { defineAsyncComponent, defineComponent } from 'vue'
const Avatar = defineAsyncComponent(() => import('@/application/components/core/AvatarUser.vue'))

export default defineComponent({
	setup() {

		
		return {
			handleOpenChat
		 }
	},
	components: { Avatar }
})
</script>
