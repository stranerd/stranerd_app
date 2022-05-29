<template>
	<div>
		<PdfEmbed :source="link" style="margin: 10px auto;" @loaded="loaded" @loading-failed="loadingFailed" />
		<BlockLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PdfEmbed from 'vue-pdf-embed'

export default defineComponent({
	name: 'PdfReader',
	components: { PdfEmbed },
	props: {
		link: {
			type: String,
			required: true
		}
	},
	setup () {
		const numPages = ref(0)
		const loading = ref(true)

		const loaded = (pdf: any) => {
			numPages.value = pdf.numPages
			loading.value = false
		}

		const loadingFailed = () => {
			loading.value = false
		}

		return {
			numPages, loading,
			loaded, loadingFailed
		}
	}
})
</script>
