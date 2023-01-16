<template>
	<a class="leading-none" @click.prevent="shareInfo">
		<slot>
			<IonIcon :class="cssClass" :icon="shareOutline" />
		</slot>
	</a>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { domain } from '@utils/environment'
import { share } from '@utils/commons'
import { shareOutline } from 'ionicons/icons'

const props = defineProps({
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
})

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
</script>
