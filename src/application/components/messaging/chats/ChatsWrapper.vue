<template>
	<DefaultLayout :hideBottom="true" :hideFab="true" :hideTop="true" :ignorePagePadding="true">
		<template v-slot:panel>
			<MessagingPanel />
		</template>
		<template v-slot:content-top>
			<div v-if="chatMeta"
				class="flex items-center bg-headerBg lg:bg-bodyBg text-headerText lg:text-bodyText p-4 lg:pt-0 gap-4 w-full">
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
			<div v-else />
		</template>
		<template v-slot:content-bottom>
			<ChatForm v-if="chatMeta && chatMeta.members.includes(id)" :name="chatMeta.getToName(id)" :to="to"
				class="py-2 px-4" />
		</template>
		<ChatsList v-if="chatMeta && chatMeta.members.includes(id)" :to="to" class="py-1 px-4" />
		<div v-else-if="!loading" class="h-full flex flex-col gap-4 justify-center items-center">
			<p class="text-2xl">You cant access this chat</p>
			<router-link to="/messages">
				<IonButton class="btn-outline">
					Back To Messages
				</IonButton>
			</router-link>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { arrowBackOutline, createOutline } from 'ionicons/icons'
import { openGroupEditModal, useGroupList } from '@app/composable/classes/groups'
import { formatTime } from '@utils/dates'
import { useAuth } from '@app/composable/auth/auth'
import { useChatMetas } from '@app/composable/messaging/chatMetas'
import { useUser } from '@app/composable/users/users'
import MessagingPanel from '@app/components/layout/panels/MessagingPanel.vue'
import ChatsList from '@app/components/messaging/chats/ChatsList.vue'
import ChatForm from '@app/components/messaging/chats/ChatForm.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'ChatsWrapper',
	components: { MessagingPanel, ChatsList, ChatForm },
	setup () {
		const { id } = useAuth()
		const route = useRoute()
		const { to, classId } = route.params as { to: string, classId: string }
		const { loading, error, meta } = useChatMetas()
		const chatMeta = computed(() => meta.value.find((m) => m.getTo(id.value) === to) ?? null)
		const { groups } = useGroupList(classId ?? '---')
		const { user } = useUser(to)
		const group = computed(() => groups.value.find((group) => group.id === to) ?? null)
		return {
			to, arrowBackOutline, createOutline,
			formatTime, loading, error, chatMeta, id, openGroupEditModal, group, user
		}
	}
})
</script>
