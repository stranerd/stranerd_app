<template>
	<div class="flex flex-col">
		<div class="px-4 mb-4">
			<IonSearchbar v-model.trim="search" placeholder="Search" type="search" />
		</div>
		<BlockLoading v-if="loading" />
		<router-link v-if="!loading && !error && groups.length === 0" to="/classes">
			<EmptyState :info="search ? 'No results' : 'Join a class to have discussions'"
				class="border-bottom-line py-6" />
		</router-link>
		<MetaBlock v-for="group in groups" :key="group.key" :hasAvatar="true"
			:metas="group.values"
			:title="classes.find((c) => c.id === group.key)?.name ?? 'Class'" 
			:photo="classes.find((c) => c.id === group.key)?.photo ?? 'Class'" 
			
		/>
		<ChatMetasListCard v-for="chatMeta in connects" :key="chatMeta.hash" :chatMeta="chatMeta" :hasAvatar="true" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MetaBlock from '@app/components/messaging/chatMetas/MetaBlock.vue'
import { useChatMetas } from '@app/composable/messaging/chatMetas'
import { useUserClassList } from '@app/composable/users/users/classes'
import ChatMetasListCard from '@app/components/messaging/chatMetas/ChatMetasListCard.vue'

export default defineComponent({
	name: 'ChatMetasList',
	components: { MetaBlock, ChatMetasListCard },
	setup () {
		const { classes } = useUserClassList()
		const { groups, connects, unRead, error, loading, search } = useChatMetas()
		return { classes, search, groups, connects, unRead, error, loading }
	}
})
</script>
