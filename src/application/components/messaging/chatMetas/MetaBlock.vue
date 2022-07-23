<template>
	<div class="flex flex-col card-padding !gap-4 !px-0">
		<div class="flex card-padding !py-0 !gap-4 items-center" @click="show = !show">
			<div v-if="hasAvatar" class="relative">
				<Avatar :name="title" :size="48" :src="photo" />
				<IonIcon :icon="peopleOutline"
					class="absolute text-xs -bottom-1.5 -right-1 text-primaryText bg-primaryBg rounded-full p-1 border border-bodyBg" />
			</div>
			<IonText class="font-bold capitalize truncate w-full">{{ title }}</IonText>
			<span>
				<IonIcon :class="{'rotate-90': show}" :icon="chevronForwardOutline" />
			</span>
		</div>
		<div v-if="show" class="flex flex-col">
			<ChatMetasListCard v-for="chatMeta in metas" :key="chatMeta.hash" :chatMeta="chatMeta"
				:hasAvatar="!hasAvatar" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import ChatMetasListCard from '@app/components/messaging/chatMetas/ChatMetasListCard.vue'
import { chevronForwardOutline, peopleOutline } from 'ionicons/icons'
import { ChatMetaEntity } from '@modules/messaging'
import { Media } from '@modules/core'

export default defineComponent({
	name: 'MetaBlock',
	components: { ChatMetasListCard },
	props: {
		title: {
			type: String,
			required: true
		},
		photo: {
			type: Object as PropType<Media>,
			required: false
		},
		metas: {
			type: Array as PropType<ChatMetaEntity[]>,
			required: true
		},
		hasAvatar: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	setup () {
		const show = ref(true)
		return { show, chevronForwardOutline, peopleOutline }
	}
})
</script>
