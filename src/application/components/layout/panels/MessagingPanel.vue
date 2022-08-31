<template>
	<div class="flex flex-col gap-4">
		<IonText class="font-bold text-2xl card-padding !py-0">Discussions</IonText>
		<MessagingView />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MessagingView from '@app/components/messaging/MessagingView.vue'

export default defineComponent({
	name: 'MessagingPanel',
	components: { MessagingView }
})
</script>
