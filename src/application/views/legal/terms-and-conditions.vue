<template>
	<Justified>
		<PdfReader link="/legal/terms-and-conditions.pdf" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import PdfReader from '@app/components/core/media/PdfReader.vue'

export default defineComponent({
	name: 'LegalTermsAndConditions',
	displayName: 'Terms and Conditions',
	components: { Justified, PdfReader }
})
</script>
