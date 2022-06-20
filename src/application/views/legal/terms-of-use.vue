<template>
	<DefaultLayout>
		<PdfReader link="/legal/terms-of-use.pdf" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PdfReader from '@app/components/core/media/PdfReader.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'LegalTermsOfUse',
	components: { PdfReader },
	setup () {
		useRouteMeta('Terms of Use', { back: true })
	}
})
</script>
