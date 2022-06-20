<template>
	<DefaultLayout>
		<PdfReader link="/legal/FAQs.pdf" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PdfReader from '@app/components/core/media/PdfReader.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'LegalFAQs',
	components: { PdfReader },
	setup () {
		useRouteMeta('FAQs', { back: true })
	}
})
</script>
