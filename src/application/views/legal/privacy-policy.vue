<template>
	<HomeLayout>
		<PdfReader class="max-w-[900px] mx-auto" link="/legal/privacy-policy.pdf" />
	</HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PdfReader from '@app/components/core/media/PdfReader.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'LegalPrivacyPolicy',
	components: { PdfReader },
	setup () {
		useRouteMeta('Privacy Policy', { back: true })
	}
})
</script>
