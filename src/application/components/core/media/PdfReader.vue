<template>
	<div class="p-6">
		<PdfEmbed :source="link" style="margin: 0 auto;" @loaded="loaded" @loading-failed="loadingFailed" />
		<BlockLoading v-if="loading" />
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PdfEmbed from 'vue-pdf-embed'

const props = defineProps({
	link: {
		type: String,
		required: true
	}
})

const numPages = ref(0)
const loading = ref(true)

const loaded = (pdf: any) => {
	numPages.value = pdf.numPages
	loading.value = false
}

const loadingFailed = () => {
	loading.value = false
}
</script>
