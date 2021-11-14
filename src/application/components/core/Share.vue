<template>
	<span @click.prevent="shareInfo">
		<slot>
			<ion-icon :class="cssClass" :icon='arrowRedo' />
		</slot>
	</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { domain } from '@utils/environment'
import { Notify } from '@app/composable/core/notifications'
import { copyToClipboard } from '@utils/commons'
import { arrowRedo } from 'ionicons/icons'

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
		},
		cssClass: {
			type: String,
			required: false,
			default: ''
		}
	},
	setup (props) {
		const route = useRoute()
		const shareInfo = async () => {
			const link = props.link || route.fullPath
			const url = domain + (link.startsWith('/') ? link : `/${link}`)
			if (window.navigator.share) {
				try {
					await window.navigator.share({
						url,
						title: props.title,
						text: props.text
					})
				} catch {
					const res = await copyToClipboard(url)
					await Notify({
						title: `something went wrong somewhere.${res ? ' The link has been copied to your clipboard instead' : ''}`,
						icon: 'info'
					})
				}
			} else {
				const res = await copyToClipboard(url)
				await Notify({
					title: `Your current device is unable to share links.${res ? ' The link has been copied to your clipboard instead' : ''}`,
					icon: 'info'
				})
			}
		}
		return { arrowRedo, shareInfo }
	}
})
</script>
