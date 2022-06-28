<template>
	<div class="!gap-4 card-padding flex flex-col">
		<div class="flex gap-4 items-center" @click="show = !show">
			<IonText class="font-bold capitalize truncate w-full">{{ title }}</IonText>
			<IonIcon :icon="show ? chevronUpOutline : chevronDownOutline" />
		</div>
		<div v-if="show" class="flex flex-col">
			<ChatMetasListCard v-for="chatMeta in metas" :key="chatMeta.hash" :chatMeta="chatMeta" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import ChatMetasListCard from '@app/components/messaging/chatMetas/ChatMetasListCard.vue'
import { chevronDownOutline, chevronUpOutline } from 'ionicons/icons'
import { ChatMetaEntity } from '@modules/messaging'

export default defineComponent({
	name: 'MetaBlock',
	components: { ChatMetasListCard },
	props: {
		title: {
			type: String,
			required: true
		},
		metas: {
			type: Array as PropType<ChatMetaEntity[]>,
			required: true
		},
		open: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	setup (props) {
		const show = ref(props.open || false)
		return { show, chevronUpOutline, chevronDownOutline }
	}
})
</script>
