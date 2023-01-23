<template>
	<router-link :to="chatMeta.getToLink(id)" class="flex items-center leading-none card-padding !py-2 !gap-4"
		exact-active-class="hasBg">
		<span v-if="hasAvatar">
			<Avatar :name="chatMeta.getToName(id)" :size="48" :src="chatMeta.getToPhoto(id)" />
		</span>
		<span v-else
			class="w-[48px] h-[48px] bg-itemBg border border-itemBg rounded-full flex items-center justify-center text-lg">
			<IonIcon :icon="chatbubblesOutline" />
		</span>
		<div class="flex flex-col flex-grow truncate leading-none text-secondaryText">
			<div class="flex gap-2 items-center">
				<IonText class="text-base w-full truncate capitalize font-bold">
					{{ chatMeta.getToName(id) }}
				</IonText>
				<IonText v-if="chatMeta.last" class="text-sm whitespace-nowrap">
					{{ formatTime(chatMeta.last.createdAt) }}
				</IonText>
			</div>
			<div v-if="chatMeta.last" :class="{'font-bold': chatMeta.hasUnRead(id)}"
				class="flex gap-4 items-center text-sm">
				<IonText class="w-fit flex-grow truncate">
					<span v-if="chatMeta.isClasses(chatMeta)" class="font-bold">
						{{ chatMeta.last.from.id === id ? 'You' : chatMeta.last.from.bio.firstName }}:&nbsp;
					</span>
					{{ chatMeta.last.media ? 'Shared a file' : chatMeta.last.body }}
				</IonText>
				<span>
					<span v-if="unReadCount.length"
						:style="`width: ${unReadCount.length + 0.5}ch; min-width: 2ch;max-width:3.1ch`"
						class="bg-primaryBg text-primaryText text-xs aspect-square rounded-full flex items-center justify-center leading-none">
						<span>{{ unReadCount }}</span>
					</span>
				</span>
			</div>
		</div>
	</router-link>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { formatTime } from '@utils/dates'
import { useAuth } from '@app/composable/auth/auth'
import { ChatMetaEntity } from '@modules/messaging'
import { useChatMeta } from '@app/composable/messaging/chatMetas'
import { chatbubblesOutline } from 'ionicons/icons'

const props = defineProps({
	chatMeta: {
		type: ChatMetaEntity,
		required: true
	},
	hasAvatar: {
		type: Boolean,
		required: false,
		default: false
	}
})

const { id } = useAuth()
const { unRead, fetchUnRead } = useChatMeta(props.chatMeta)
watch([() => props.chatMeta.last, () => props.chatMeta.readAt[id.value]], fetchUnRead, {
	immediate: true,
	deep: true
})
const unReadCount = computed(() => {
	if (unRead.value === 0) return ''
	return unRead.value > 99 ? '99+' : unRead.value.toString()
})
</script>
