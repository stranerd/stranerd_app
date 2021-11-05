<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="fixed h-full w-full flex flex-row lg:bg-dark_gray gap-3 lg:py-4 lg:px-3">

				<div class="lg:flex flex-col gap-4 h-full hidden relative">
					<div class="text-dark_gray bg-white rounded-xl justify-center items-center py-3 px-4">
						<ion-icon :icon="chatbubbles" class="text-[23px] text-dark_gray"></ion-icon>
					</div>
					<router-link class="text-dark_gray bg-icon_inactive rounded-xl justify-center items-center py-3 px-4 absolute bottom-1"
						to="/dashboard/home">
						<ion-icon :icon="home" class="text-[23px] text-white"></ion-icon>
					</router-link>
				</div>

				<div class="flex-grow bg-white rounded-xl h-full flex flex-row items-center">
					<div :class="`w-[100%] lg:w-[24%] ${openChat ? 'hidden' : ''} h-full relative lg:inline-block`">
						<chat-list></chat-list>
					</div>
					<div
						:class="`lg:w-[56%] w-full  h-full ${openChat ? '' : 'hidden'} lg:inline-block relative overflow-y-hidden`">
						<full-chat :user-id="userId"></full-chat>
					</div>
					<div class="lg:w-[20%] w-full h-full hidden lg:inline-block relative overflow-y-hidden">
						<chat-info :user-id="userId"></chat-info>
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonIcon } from '@ionic/vue'
import { defineAsyncComponent, onMounted } from 'vue'

const ChatList = defineAsyncComponent(() => import('@app/components/chat/ChatList.vue'))
const FullChat = defineAsyncComponent(() => import('@app/components/chat/Chat.vue'))
const ChatInfo = defineAsyncComponent(() => import('@app/components/chat/ChatInfo.vue'))
import { ellipsisVertical, chatbubbles, home } from 'ionicons/icons'
import { openChat } from '@app/composable/sessions/ChatHandler'
import { useRoute } from 'vue-router'

export default {
	name: 'chatView',
	components: { IonPage, IonContent, ChatList, FullChat, ChatInfo, IonIcon },
	setup () {
		onMounted(() => {
			openChat.value = true
		})
		const route = useRoute()
		const userId = Array.isArray(route.params.id) ? '' : route.params.id

		return { ellipsisVertical, chatbubbles, home, openChat, userId }
	}
}
</script>
