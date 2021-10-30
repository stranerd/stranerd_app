<template>
<div class="flex flex-row items-center px-3 py-4 border-b-[1px] border-light_gray cursor-pointer text-icon_inactive" @click="handleOpenChat" >
	 <avatar :size="'41'" :photo-url="meta?.avatar?.link"  :has-dot="true"/>
	 <div class="flex flex-col justify-center  px-3  flex-grow">
		<h3 class="text-dark_gray heading font-bold">{{ meta.fullName }}</h3>
		<span>{{ meta.last.isMedia ? meta?.last?.media?.name : meta.last.content }}</span>
		</div>
		<div class="flex flex-row-reverse justify-start h-full">
		<span>{{ formatTime(meta.last.createdAt, true) }}</span>
	</div>
</div>
</template>

<script lang="ts">
import { handleOpenChat } from '@/application/composable/sessions/ChatHandler'
import { ChatMetaEntity } from '@/modules/sessions'
import { formatTime } from '@/utils/dates'
import { defineAsyncComponent, defineComponent, PropType } from 'vue'
const Avatar = defineAsyncComponent(() => import('@/application/components/core/AvatarUser.vue'))

export default defineComponent({
	props: {
		meta: {
			type: Object as PropType<ChatMetaEntity>,
			required: true
		}
	},
	setup() {
		return {
			handleOpenChat, formatTime
		 }
	},
	components: { Avatar }
})
</script>
