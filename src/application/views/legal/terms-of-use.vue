<template>
	<Justified>
		<PdfReader link="/legal/terms-of-use.pdf" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import PdfReader from '@app/components/core/media/PdfReader.vue'

export default defineComponent({
	name: 'LegalTermsOfUse',
	displayName: 'Terms Of Use',
	components: { Justified, PdfReader }
})
</script>
