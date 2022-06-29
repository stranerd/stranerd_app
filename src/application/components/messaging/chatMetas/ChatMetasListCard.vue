<template>
	<router-link :to="chatMeta.getToLink(id)" class="flex items-center leading-none card-padding !py-2 !gap-2"
		exact-active-class="hasBg">
		<span>
			<Avatar :name="chatMeta.getToName(id)" :size="40" :src="chatMeta.getToPhoto(id)" />
		</span>
		<div class="flex flex-col w-full gap-1 leading-none">
			<div class="flex gap-2 items-center">
				<IonText class="font-bold w-full truncate capitalize">
					{{ chatMeta.getToName(id) }}
				</IonText>
				<IonText v-if="chatMeta.last" class="text-sm whitespace-nowrap">
					{{ formatTime(chatMeta.last.createdAt) }}
				</IonText>
			</div>
			<div v-if="chatMeta.last" :class="{'font-bold': chatMeta.hasUnRead(id)}"
				class="flex gap-4 items-center text-sm">
				<IonText class="w-full truncate">
					<span v-if="chatMeta.isClasses(chatMeta)">
						{{ chatMeta.last.from.id === id ? 'You' : chatMeta.last.from.bio.firstName }} :&nbsp;
					</span>
					{{ chatMeta.last.media ? 'Shared a file' : chatMeta.last.body }}
				</IonText>
				<span v-if="unReadCount.length" :style="`width: ${unReadCount.length + 1}ch;`"
					class="bg-primaryBg text-primaryText aspect-square rounded-full flex items-center justify-center leading-none">
					<span>{{ unReadCount }}</span>
				</span>
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { formatTime } from '@utils/dates'
import { useAuth } from '@app/composable/auth/auth'
import { ChatMetaEntity } from '@modules/messaging'
import { useChatMeta } from '@app/composable/messaging/chatMetas'

export default defineComponent({
	name: 'ChatMetasListCard',
	props: {
		chatMeta: {
			type: ChatMetaEntity,
			required: true
		}
	},
	setup (props) {
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
		return { formatTime, id, unReadCount }
	}
})
</script>
