<template>
<div class=" flex flex-col relative h-full w-full  border-r-[1px] border-faded_gray overflow-y-hidden">
	<chat-top></chat-top>
	<chat-content></chat-content>
	<chat-bottom></chat-bottom>
</div>
</template>

<script lang="ts">

import { defineAsyncComponent } from 'vue'
const ChatTop = defineAsyncComponent(() => import('@/application/components/chat/ChatTop.vue'))
const ChatBottom = defineAsyncComponent(() => import('@/application/components/chat/ChatBottom.vue'))
const ChatContent = defineAsyncComponent(() => import('@/application/components/chat/ChatContent.vue'))

import { ellipsisVertical, search  } from 'ionicons/icons'

export default  {
	components: { ChatTop, ChatBottom, ChatContent },
	setup(){
		return { ellipsisVertical, search }
	}
}
</script>