<template>
	<Pdf v-for="i in numPages" :id="i" :key="i" :annotation="true" :page="i" :resize="true" :scale="scale"
		:src="pdfData"
		style="width:80%;margin:20px auto;">
		<template v-slot:loading>
			<PageLoading />
		</template>
	</Pdf>
</template>

<script lang="ts">
import { add, bookmark, chevronDown, chevronUp, contract, pencil, remove, scan, shareSocial } from 'ionicons/icons'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { NoteEntity } from '@modules/study'
//@ts-ignore
import Pdfvuer from 'pdfvuer'

export default defineComponent({
	name: 'Note',
	components: { Pdf: Pdfvuer },
	props: {
		note: {
			type: NoteEntity,
			required: true
		}
	},
	setup (props) {
		const page = ref(1)
		const scale = ref(1)
		const pdfData = ref(undefined)
		const numPages = ref(0)
		const pdfLoading = ref(true)
		const formattedZoom = computed(() => {
			return scale.value * 100
		})

		onMounted(async () => {
			pdfData.value = Pdfvuer.createLoadingTask(props.note.media?.link ?? props.note.link)
			// @ts-ignore
			pdfData.value.then((pdf: any) => {
				pdfLoading.value = false
				numPages.value = pdf.numPages
			})
		})

		return {
			page, scale, numPages, pdfLoading, formattedZoom, pdfData,
			add, remove, scan, chevronDown,
			chevronUp, pencil, contract, bookmark, shareSocial
		}
	}
})
</script>
