<template>
	<Justified>
		<PdfReader link="/legal/FAQs.pdf" />
	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import { defineComponent } from 'vue'
import PdfReader from '@app/components/core/media/PdfReader.vue'

export default defineComponent({
	name: 'LegalFAQs',
	displayName: 'FAQs',
	components: { Justified, PdfReader }
})
</script>
