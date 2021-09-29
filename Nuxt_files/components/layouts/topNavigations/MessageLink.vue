<template>
	<NuxtLink class="gap-0-5" to="/sessions">
		<span class="position-relative">
			<Icon
				class="head-icons"
				class-name="head-icons"
				size="s"
				icon-name="chat"
			/>
			<i
				v-if="meta.map((m) => m.unRead.length).filter((c) => !!c).length > 0"
				class="fas fa-circle text-danger position-absolute"
				style="top: 0; right: 0; font-size: 0.6em;"
			/>
		</span>
	</NuxtLink>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useChatsList } from '@app/hooks/sessions/chats-list'

export default defineComponent({
	name: 'MessageLink',
	setup () {
		const { meta, listener } = useChatsList()
		onMounted(() => {
			if (!listener.isRunning.value) listener.startListener()
		})
		return { meta }
	}
})
</script>

<style scoped lang="scss">
	.head-icons {
		color: white;
		@media (max-width: $md) {
			color: $color-primary-dark;
		}
	}
</style>
