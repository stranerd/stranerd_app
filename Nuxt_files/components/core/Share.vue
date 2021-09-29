<template>
	<span @click.prevent="share">
		<slot><i class="fas fa-share" /></slot>
	</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { domain, isClient } from '@/utils/environment'
import { Notify } from '@/application/hooks/core/notifications'
import { copyToClipboard } from '@/utils/commons'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'Share',
	props: {
		title: {
			type: String,
			required: false,
			default: 'Title'
		},
		text: {
			type: String,
			required: false,
			default: 'Text'
		},
		link: {
			type: String,
			required: false,
			default: ''
		}
	},
	setup (props) {
		const route = useRoute()
		const share = async () => {
			if (!isClient()) return
			const link = props.link || route.fullPath
			if (window.navigator.share) await window.navigator.share({
				url: domain + link.startsWith('/') ? link : `/${link}`,
				title: props.title,
				text: props.text
			})
			else {
				const res = await copyToClipboard(domain + link.startsWith('/') ? link : `/${link}`)
				await Notify({
					title: `Your current device is unable to share links.${res ? ' The link has been copied to your clipboard instead' : ''}`,
					icon: 'info'
				})
			}
		}
		return { share }
	}
})
</script>
