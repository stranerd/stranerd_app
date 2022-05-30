<template>
	<Justified>
		<PdfReader link="/legal/FAQs.pdf" />
	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import { defineComponent } from 'vue'
import PdfReader from '@app/components/core/media/PdfReader.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'LegalFAQs',
	components: { Justified, PdfReader },
	setup () {
		useRouteMeta('FAQs')
	}
})
</script>
