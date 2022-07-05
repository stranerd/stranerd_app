<template>
	<div class="flex flex-col">
	
		<MetaBlock :metas="connects" class="border-bottom-line" title="Direct Messages" />
		<BlockLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MetaBlock from '@app/components/messaging/chatMetas/MetaBlock.vue'
import { useChatMetas } from '@app/composable/messaging/chatMetas'

export default defineComponent({
	name: 'DashboardChatMetasList',
	components: { MetaBlock },
	setup () {
		const { connects, unRead, error, loading } = useChatMetas()
		return { connects, unRead, error, loading }
	}
})
</script>
