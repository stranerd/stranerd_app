<template>
	<div>
		<Pdf v-for="i in numPages" :id="i" :key="i" :annotation="true" :page="i" :resize="true" :scale="100"
			:src="pdfData" style="margin: 10px auto;">
			<template v-slot:loading>
				<BlockLoading />
			</template>
		</Pdf>
		<BlockLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
//@ts-ignore
import Pdfvuer from 'pdfvuer'

export default defineComponent({
	name: 'Note',
	components: { Pdf: Pdfvuer },
	props: {
		link: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const page = ref(1)
		const scale = ref('page-width')
		const pdfData = ref(undefined)
		const numPages = ref(0)
		const loading = ref(true)

		onMounted(async () => {
			pdfData.value = Pdfvuer.createLoadingTask(props.link)
			// @ts-ignore
			pdfData.value.then((pdf: any) => {
				numPages.value = pdf.numPages
				loading.value = false
			})
		})

		return { page, scale, numPages, pdfData, loading }
	}
})
</script>
