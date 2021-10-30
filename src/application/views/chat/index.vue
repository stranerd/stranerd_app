<template>
	<span>Main chat</span>
</template>

<script lang="ts">
import { ellipsisVertical, chatbubbles, home  } from 'ionicons/icons'
import { openChat } from '@/application/composable/sessions/ChatHandler'

export default  {
	name: 'chat',
	layout: 'Chat',
	components: { },
	setup(){
		
		return { ellipsisVertical, chatbubbles, home, openChat }
	}
}
</script>
