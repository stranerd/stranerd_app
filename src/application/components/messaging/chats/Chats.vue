<template>
	<div class="chat-block">
		<div v-if="chatMeta && chatMeta.members.includes(id)" class="body">
			<div class="flex items-center bg-headerBg text-headerText px-4 gap-4">
				<router-link to="/messages">
					<IonIcon :icon="arrowBackOutline" />
				</router-link>
				<Avatar :name="chatMeta.getToName(id)" :size="36" :src="chatMeta.getToPhoto(id)" />
				<div class="flex flex-col flex-grow truncate">
					<IonText class="font-semibold">{{ chatMeta.getToName(id) }}</IonText>
					<IonText v-if="chatMeta.isClasses(chatMeta) && group" class="text-sm">
						Created {{ formatTime(group.createdAt) }} by <span>{{ group.user.bio.fullName }}</span>
					</IonText>
				</div>
				<span v-if="chatMeta.isClasses(chatMeta) && group && group.admins.includes(id)">
					<IonIcon :icon="createOutline" @click="openGroupEditModal(group, $router)" />
				</span>
			</div>
			<ChatsList :to="to" class="content" />
			<ChatForm :to="to" />
		</div>
		<div v-else-if="!loading" class="body justify-center">
			<EmptyState btnText="Back to messages" info="You can't send a message here" route="/messages" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { arrowBackOutline, chatboxEllipsesOutline, createOutline } from 'ionicons/icons'
import { openGroupEditModal, useGroupList } from '@app/composable/classes/groups'
import { formatTime } from '@utils/dates'
import { useAuth } from '@app/composable/auth/auth'
import ChatForm from '@app/components/messaging/chats/ChatForm.vue'
import ChatsList from '@app/components/messaging/chats/ChatsList.vue'
import { ChatType } from '@modules/messaging'
import { useChatMetas } from '@app/composable/messaging/chatMetas'
import { useUser } from '@app/composable/users/users'

export default defineComponent({
	name: 'Chats',
	components: { ChatForm, ChatsList },
	props: {
		to: {
			required: true,
			type: String
		},
		type: {
			type: String as PropType<ChatType>,
			required: true
		},
		classId: {
			type: String,
			required: false,
			default: ''
		}
	},
	setup (props) {
		const { id } = useAuth()
		const { loading, error, meta } = useChatMetas()
		const chatMeta = computed(() => meta.value.find((m) => m.getTo(id.value) === props.to) ?? null)
		const { groups } = useGroupList(props.classId)
		const { user } = useUser(props.to)
		const group = computed(() => groups.value.find((group) => group.id === props.to) ?? null)
		return {
			arrowBackOutline, chatboxEllipsesOutline, createOutline,
			formatTime, loading, error, chatMeta, id, openGroupEditModal, group, user
		}
	}
})
</script>
