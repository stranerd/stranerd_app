<template>
	<NuxtLink :to="`/sessions/${meta.id}`" class="gap-0-5">
		<Avatar :size="40" :src="meta.avatar" class="d-md-none" />
		<Avatar :size="56" :src="meta.avatar" class="d-none d-md-inline" />
		<div class="flex-grow-1 text-truncate">
			<div class="d-flex justify-content-between align-items-center gap-0-5">
				<DynamicText :truncate="true" class="name">
					{{ meta.fullName }}
				</DynamicText>
				<DynamicText>{{ formatTime(meta.last.createdAt, true) }}</DynamicText>
			</div>
			<div class="d-flex align-items-center text-truncate gap-0-25">
				<i v-if="meta.last.isMedia" class="fas fa-paperclip" />
				<DynamicText :truncate="true">
					{{ meta.last.isMedia ? meta.last.media.name : meta.last.content }}
				</DynamicText>
				<span
					v-if="meta.unRead.length"
					class="bg-success ms-auto d-flex align-items-center justify-content-center rounded-pill text-white"
					style="height: 1.5em; width: 1.5em;"
				>
					{{ meta.unRead.length }}
				</span>
			</div>
		</div>
	</NuxtLink>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { formatTime } from '@utils/dates'
import { ChatMetaEntity } from '@modules/sessions'

export default defineComponent({
	name: 'UserChatCard',
	props: {
		meta: {
			type: Object as PropType<ChatMetaEntity>,
			required: true
		}
	},
	setup () {
		return { formatTime }
	}
})
</script>

<style lang="scss" scoped>
	a {
		padding: 0.6rem;
		display: flex;
		align-items: center;
		border-bottom: 1px solid $color-line;
	}

	a.nuxt-link-exact-active {
		background: $color-tags;
	}

	a:hover {
		transform: none;
		font-size: inherit;
		color: inherit;
		text-decoration: none;
	}

	.name {
		font-size: 1.25rem;
		color: $color-dark;
	}
</style>
