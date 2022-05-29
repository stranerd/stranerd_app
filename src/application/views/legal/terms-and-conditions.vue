<template>
	<Justified>
		<PdfReader link="/legal/terms-and-conditions.pdf" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import PdfReader from '@app/components/core/media/PdfReader.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'LegalTermsAndConditions',
	components: { Justified, PdfReader },
	setup () {
		useRouteMeta('Terms and Conditions')
	}
})
</script>
