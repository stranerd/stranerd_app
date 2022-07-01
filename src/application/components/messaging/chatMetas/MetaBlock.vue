<template>
	<div class="flex flex-col card-padding !gap-4 !px-0">
		<div class="flex card-padding !py-0 !gap-4 items-center" @click="show = !show">
			<IonText class="font-bold capitalize truncate w-full">{{ title }}</IonText>
			<span>
				<IonIcon :class="{'rotate-180': show}" :icon="chevronDownOutline" class="transition-all duration-300" />
			</span>
		</div>
		<div v-if="show" class="flex flex-col">
			<router-link v-if="showConnects && pendingConnects.length" class=" card-padding !py-2 text-info"
				to="/connect/requests">
				Requests ({{ pendingConnects.length }})
			</router-link>
			<ChatMetasListCard v-for="chatMeta in metas" :key="chatMeta.hash" :chatMeta="chatMeta" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import ChatMetasListCard from '@app/components/messaging/chatMetas/ChatMetasListCard.vue'
import { chevronDownOutline } from 'ionicons/icons'
import { ChatMetaEntity } from '@modules/messaging'
import { useConnects } from '@app/composable/users/connects'

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
		},
		showConnects: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	setup (props) {
		const show = ref(props.open || false)
		const { pendingConnects } = useConnects()
		return { show, chevronDownOutline, pendingConnects }
	}
})
</script>
