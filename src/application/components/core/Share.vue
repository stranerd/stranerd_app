<template>
	<span @click.prevent="shareInfo">
		<slot>

			<ion-icon :icon='arrowRedo' :class="cssClass"/>

		</slot>
	</span>

	<page-loading v-if="loading"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {  useRoute } from 'vue-router'
import { domain, isClient } from '@utils/environment'
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
		const loading = ref(false)
		const shareInfo = async () => {
			const link = props.link || route.fullPath
			if (window.navigator.share){
				loading.value = true
				try{
							 await window.navigator.share({
						url: domain + link.startsWith('/') ? link : `/${link}`,
						title: props.title,
						text: props.text
					})
					loading.value = false
				}catch{
					const res = await copyToClipboard(domain + link.startsWith('/') ? link : `/${link}`)
					await Notify({
						title: `something went wrong somewhere.${res ? ' The link has been copied to your clipboard instead' : ''}`,
						icon: 'info'
					})
					loading.value = false
				}


			}
			else {
				loading.value = true
				const res = await copyToClipboard(domain + link.startsWith('/') ? link : `/${link}`)
				await Notify({
					title: `Your current device is unable to share links.${res ? ' The link has been copied to your clipboard instead' : ''}`,
					icon: 'info'
				})
				loading.value = false
			}
		}
		return { arrowRedo,shareInfo, loading }
	}
})
</script>
