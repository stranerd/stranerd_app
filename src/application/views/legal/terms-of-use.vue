<template>
	<Justified>
		<PdfReader link="/legal/terms-of-use.pdf" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import PdfReader from '@app/components/core/media/PdfReader.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'LegalTermsOfUse',
	components: { Justified, PdfReader },
	setup () {
		useRouteMeta('Terms of Use', {})
	}
})
</script>
