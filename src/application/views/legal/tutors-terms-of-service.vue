<template>
	<HomeLayout>
		<PdfReader class="max-w-[900px] mx-auto" link="/legal/tutor-terms-of-service.pdf" />
	</HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PdfReader from '@app/components/core/media/PdfReader.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'LegalTutorsTermsOfService',
	components: { PdfReader },
	setup () {
		useRouteMeta('Tutors Terms Of Service', { back: true })
	}
})
</script>
