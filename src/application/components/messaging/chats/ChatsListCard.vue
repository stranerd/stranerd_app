<template>
	<div class="flex gap-2.5 items-start w-full">
		<Avatar :id="chat.from.id" :name="chat.from.bio.fullName" :size="36" :src="chat.from.bio.photo" />
		<div class="min-w-[25%] max-w-[100%] lg:max-w-[55%] rounded-t-xl flex flex-col gap-1">
			<span class="flex gap-1 items-center">
				<UserName :class="{ 'text-info': chat.from.id === id }" :isTutor="chat.from.roles.isStranerdTutor"
					:name="chat.from.bio.fullName"
					class="font-bold" />
				<IonIcon :icon="ellipse" class="dot" />
				<span class="text-[0.9em] leading-none text-secondaryText">
					{{ formatTimeAsDigits(new Date(chat.createdAt)) }}
				</span>
			</span>
			<div v-if="chat.media && chat.isMedia" class="flex flex-col"
				@click="openViewFile(chat.media, chat.saveFilePath, $router)">
				<img v-if="chat.isImage" :src="chat.media.link" alt="" class="w-full rounded-t-xl">
				<div :class="{'rounded-t-xl': !chat.isImage}"
					class="bg-itemBg flex truncate gap-2 items-center p-2 rounded-b-xl">
					<span>
						<IonIcon :icon="documentOutline" />
					</span>
					<IonText class="w-full truncate">{{ chat.media.name }}</IonText>
				</div>
			</div>
			<span class="leading-tight" v-html="chat.formattedBody" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ChatEntity } from '@modules/messaging'
import { useAuth } from '@app/composable/auth/auth'
import { formatTimeAsDigits } from '@utils/dates'
import { documentOutline, ellipse } from 'ionicons/icons'
import { useChat } from '@app/composable/messaging/chats'
import { openViewFile } from '@app/composable/meta/media'

const props = defineProps({
	chat: {
		required: true,
		type: ChatEntity
	}
})

const { id } = useAuth()
useChat(props.chat)
</script>
