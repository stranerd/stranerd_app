<template>
	<Justified>
		<PdfReader link="/legal/privacy-policy.pdf" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import PdfReader from '@app/components/core/media/PdfReader.vue'

export default defineComponent({
	name: 'LegalPrivacyPolicy',
	displayName: 'Privacy Policy',
	components: { Justified, PdfReader }
})
</script>
