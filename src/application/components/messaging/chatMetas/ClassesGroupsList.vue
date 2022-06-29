<template>
	<div v-if="classInst" class="flex flex-col">
		<div class="flex card-padding gap-4 items-center" @click="show = !show">
			<IonText class="font-bold capitalize truncate w-full">{{ classInst.name }}</IonText>
			<IonIcon :icon="show ? chevronUpOutline : chevronDownOutline" />
		</div>
		<div v-if="show" class="flex flex-col">
			<ChatMetasListCard v-for="chatMeta in metas" :key="chatMeta.hash" :chatMeta="chatMeta" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { useRoute } from 'vue-router'
import ChatMetasListCard from '@app/components/messaging/chatMetas/ChatMetasListCard.vue'
import { chevronDownOutline, chevronUpOutline } from 'ionicons/icons'
import { useUserClassList } from '@app/composable/users/users/classes'
import { ChatMetaEntity } from '@modules/messaging'

export default defineComponent({
	name: 'ClassesGroupsList',
	components: { ChatMetasListCard },
	props: {
		classId: {
			type: String,
			required: true
		},
		metas: {
			type: Array as PropType<ChatMetaEntity[]>,
			required: true
		}
	},
	setup (props) {
		const route = useRoute()
		const { classes } = useUserClassList()
		const classInst = computed(() => classes.value.find((c) => c.id === props.classId) ?? null)
		const show = ref(route.query.classId === props.classId)
		return { show, classInst, chevronUpOutline, chevronDownOutline }
	}
})
</script>
