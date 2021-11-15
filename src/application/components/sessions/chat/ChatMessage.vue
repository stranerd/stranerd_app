<template>
	<div :class="`${isMine ? 'justify-end' : 'justify-start'} w-full flex flex-row `">


		<div v-if="chat.isMedia"
			:class="`py-4 w-[70%] lg:w-[30%] md:w-[40%] ${isMine ? 'bg-light_gray' : 'bg-light_blue'} px-3 flex flex-col gap-1 rounded-xl`">
			<div v-if="chat.isImage" :style="`background-image: url(${chat?.media?.link});background-size: cover;`"
				class="h-40 w-full border-faded_gray border-2 rounded-xl ">
			</div>
			<div class="flex flex-row justify-end items-center text-[14px] gap-2">
				<span>{{ formatTimeAsDigits(new Date(chat.createdAt)) }}</span>
			</div>
		</div>


		<div v-else
			:class="`py-4 w-[80%] lg:w-[50%] md:w-[60%] ${isMine ? 'bg-light_gray' : 'bg-light_blue'} px-3 flex flex-col gap-1 rounded-xl`">
			<p>
				{{ chat.content }}
			</p>
			<div class="flex flex-row justify-end items-center text-[14px] gap-2">
				<span>{{ formatTimeAsDigits(new Date(chat.createdAt)) }}</span>
				<ion-icon :icon="checkmarkDoneOutline" class="text-[19px] text-primary"></ion-icon>
			</div>
		</div>

	</div>


</template>
<script lang="ts">
import { computed, defineComponent, onMounted, PropType } from 'vue'
import { IonIcon } from '@ionic/vue'
import { checkmarkDoneOutline } from 'ionicons/icons'
import { ChatEntity } from '@modules/sessions'
import { formatTimeAsDigits } from '@utils/dates'
import { useAuth } from '@app/composable/auth/auth'
import { useChat } from '@app/composable/sessions/chats'
import { copyToClipboard } from '@utils/commons'

export default defineComponent({
	props: {
		chat: {
			type: Object as PropType<ChatEntity>,
			required: true
		},
		userId: {
			type: String,
			required: true
		}
	},
	setup (props: any) {

		const { id } = useAuth()
		const isMine = computed({
			get: () => props.chat.from === id.value,
			set: () => {
			}
		})
		const { markChatRead } = useChat(props.chat, props.userId)
		const copy = async () => {
			await copyToClipboard(props.chat.isMedia ? props.chat.media!.link : props.chat.content!)
		}
		onMounted(async () => {
			if (!isMine.value && !props.chat.isRead) await markChatRead()
		})

		return {
			checkmarkDoneOutline, isMine, formatTimeAsDigits, copy
		}
	},
	components: {
		IonIcon
	}
})
</script>
