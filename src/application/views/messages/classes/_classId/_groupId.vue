<template>
	<DefaultLayout :hideBottom="true" :hideFab="true" :hideTop="true">
		<Chats :classId="classId" :to="groupId" :type="ChatType.classes" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Chats from '@app/components/messaging/chats/Chats.vue'
import { useRoute } from 'vue-router'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { ChatType } from '@modules/messaging'

export default defineComponent({
	name: 'MessagesClassesClassIdGroupId',
	components: { Chats },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Group', { back: true })
		const route = useRoute()
		const { groupId, classId } = route.params
		return { groupId: groupId as string, classId: classId as string, ChatType }
	}
})
</script>
