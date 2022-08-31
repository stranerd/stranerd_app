<template>
	<ChatMetasList />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChatMetasList from '@app/components/messaging/chatMetas/ChatMetasList.vue'

export default defineComponent({
	name: 'MessagingView',
	components: { ChatMetasList }
})
</script>
