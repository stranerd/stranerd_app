<template>
	<DefaultLayout>
		<PdfReader link="/legal/privacy-policy.pdf" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PdfReader from '@app/components/core/media/PdfReader.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'LegalPrivacyPolicy',
	components: { PdfReader },
	setup () {
		useRouteMeta('Privacy Policy', {})
	}
})
</script>
