<template>
	<router-link :to="`/chat/${meta.userId}`"
		class="flex flex-row  px-3 py-3 gap-2 border-b-[1px] border-light_gray cursor-pointer text-icon_inactive"
		@click="handleOpenChat">
		<div>
			<avatar :id="meta.id" :has-dot="true" :size="41" :src="meta?.avatar?.link" />
		</div>
		<span class="flex flex-col justify-center flex-grow ">
			<h3 class="text-main_dark heading font-bold">{{ meta.fullName }}</h3>
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
import { defineComponent, PropType } from 'vue'
import Avatar from '../../core/Avatar.vue'

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
