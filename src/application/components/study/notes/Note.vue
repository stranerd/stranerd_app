<template>
	<Pdf v-for="i in numPages" :id="i" :key="i" :annotation="true" :page="i" :resize="true" :scale="100"
		:src="pdfData" style="margin: 10px auto;">
		<template v-slot:loading>
			<PageLoading />
		</template>
	</Pdf>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue'
import { NoteEntity } from '@modules/study'
//@ts-ignore
import Pdfvuer from 'pdfvuer'

export default defineComponent({
	name: 'Note',
	components: { Pdf: Pdfvuer },
	props: {
		note: {
			type: Object as PropType<NoteEntity>,
			required: true
		}
	},
	setup (props) {
		const page = ref(1)
		const scale = ref('page-width')
		const pdfData = ref(undefined)
		const numPages = ref(0)

		onMounted(async () => {
			pdfData.value = Pdfvuer.createLoadingTask(props.note.media?.link ?? props.note.link)
			// @ts-ignore
			pdfData.value.then((pdf: any) => {
				numPages.value = pdf.numPages
			})
		})

		return { page, scale, numPages, pdfData }
	}
})
</script>
