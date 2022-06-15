<template>
	<DefaultLayout>
		<PdfReader link="/legal/nerds-terms-and-conditions.pdf" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PdfReader from '@app/components/core/media/PdfReader.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'LegalNerdsTermsAndConditions',
	components: { PdfReader },
	setup () {
		useRouteMeta('Nerds Terms and Conditions', {})
	}
})
</script>
