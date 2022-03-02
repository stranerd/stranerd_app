<template>
	<span class="leading-none" @click.prevent="shareInfo">
		<slot>
			<ion-icon :class="cssClass" :icon='shareSocialOutline' />
		</slot>
	</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { domain } from '@utils/environment'
import { share } from '@utils/commons'
import { shareSocialOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'Share',
	props: {
		title: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
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
			await share({
				url,
				title: props.title,
				text: props.text
			})
		}
		return { shareSocialOutline, shareInfo }
	}
})
</script>
