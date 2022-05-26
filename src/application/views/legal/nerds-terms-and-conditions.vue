<template>
	<Justified>
		<PdfReader link="/legal/nerds-terms-and-conditions.pdf" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import PdfReader from '@app/components/core/media/PdfReader.vue'

export default defineComponent({
	name: 'LegalNerdsTermsAndConditions',
	displayName: 'Nerds Terms and Conditions',
	components: { Justified, PdfReader }
})
</script>
