<template>
	<div class="flex gap-2.5 items-start w-full">
		<Avatar :id="chat.from.id" :name="chat.from.bio.fullName" :size="24"
			:src="chat.from.bio.photo" />
		<div class="min-w-[25%] max-w-[100%] lg:max-w-[55%] rounded-t-xl flex flex-col gap-1">
			<span class="flex gap-1 items-center">
				<span :class="{ 'text-info': chat.from.id === id }" class="font-bold">
					{{ chat.from.bio.fullName  }}</span>
				<Verified :verified="chat.from.roles.isVerified" />
				<IonIcon :icon="ellipse" class="dot" />
				<span class="text-[0.9em] leading-none text-secondaryText">
					{{ formatTimeAsDigits(new Date(chat.createdAt)) }}
				</span>
			</span>
			<div v-if="chat.isMedia" class="flex flex-col" @click="openFile">
				<img v-if="chat.isImage" :src="chat.media.link" alt="" class="w-full rounded-t-xl">
				<div :class="{'rounded-t-xl': !chat.isImage}"
					class="bg-itemBg flex gap-2 items-center p-2 rounded-b-xl">
					<span>
						<IonIcon :icon="documentOutline" />
					</span>
					<IonText class="w-full truncate">{{ chat.media.name }}</IonText>
					<span>
						<SpinLoading v-if="loading" />
						<IonIcon v-else-if="!content" :icon="downloadOutline" @click="download" />
					</span>
				</div>
			</div>
			<span class="leading-tight" v-html="chat.formattedBody" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ChatEntity } from '@modules/messaging'
import { useAuth } from '@app/composable/auth/auth'
import { formatTimeAsDigits } from '@utils/dates'
import { documentOutline, downloadOutline, ellipse } from 'ionicons/icons'
import { useDownload } from '@app/composable/meta/media'
import { isWeb } from '@utils/constants'
import { useChat } from '@app/composable/messaging/chats'

export default defineComponent({
	name: 'ChatsListCard',
	props: {
		chat: {
			required: true,
			type: ChatEntity
		}
	},
	setup (props) {
		const { id } = useAuth()
		useChat(props.chat)
		const {
			content, loading, openFile, downloadWeb, download: downloadApp
		} = useDownload(props.chat.media?.name ?? '', props.chat.media?.link ?? '', 'messaging/chats')
		const download = isWeb ? downloadWeb : downloadApp
		return {
			id, formatTimeAsDigits, isWeb,
			documentOutline, downloadOutline, ellipse,
			content, download, openFile, loading
		}
	}
})
</script>
