<template>
	<HomeLayout>
		<PdfReader class="max-w-[900px] mx-auto" link="/legal/honor-code.pdf" />
	</HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PdfReader from '@app/components/core/media/PdfReader.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'LegalHonorCode',
	components: { PdfReader },
	setup () {
		useRouteMeta('HonorCode', { back: true })
	}
})
</script>
