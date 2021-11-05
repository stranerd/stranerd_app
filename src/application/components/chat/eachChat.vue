<template>
	<router-link :to="`/chat/${meta.userId}`"
		class="flex flex-row  px-3 py-3 gap-2 border-b-[1px] border-light_gray cursor-pointer text-icon_inactive"
		@click="handleOpenChat">
		<div>
			<avatar :has-dot="true" :photo-url="meta?.avatar?.link" :size="'41'" />
		</div>
		<span class="flex flex-col justify-center flex-grow ">
			<h3 class="text-dark_gray heading font-bold">{{ meta.fullName }}</h3>
			<span>{{ meta.last.isMedia ? meta?.last?.media?.name : meta.last.content }}</span>
		</span>
		<div class="flex flex-row-reverse justify-start h-full">
			<span>{{ formatTime(meta.last.createdAt, true) }}</span>
		</div>
	</router-link>
</template>

<script lang="ts">
import { handleOpenChat } from '@app/composable/sessions/ChatHandler'
import { ChatMetaEntity } from '@modules/sessions'
import { formatTime } from '@utils/dates'
import { defineAsyncComponent, defineComponent, PropType } from 'vue'

const Avatar = defineAsyncComponent(() => import('@app/components/core/AvatarUser.vue'))

export default defineComponent({
	props: {
		meta: {
			type: Object as PropType<ChatMetaEntity>,
			required: true
		}
	},
	setup () {
		return {
			handleOpenChat, formatTime
		}
	},
	components: { Avatar }
})
</script>
