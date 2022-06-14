<template>
	<Justified>
		<PdfReader link="/legal/nerds-terms-and-conditions.pdf" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import PdfReader from '@app/components/core/media/PdfReader.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'LegalNerdsTermsAndConditions',
	components: { Justified, PdfReader },
	setup () {
		useRouteMeta('Nerds Terms and Conditions', {})
	}
})
</script>
