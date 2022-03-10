<template>
	<Justified>
		<div>
			<div class="blueTop py-4">
				<ion-text class="heading lg:text-2xl font-bold text-main_dark text-center">
					FAQs
				</ion-text>
			</div>
			<div class="lg:w-8/12 w-full mx-auto bg-white">
				<Note link="/legal/FAQs.pdf" />
			</div>
		</div>
	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import { defineComponent } from 'vue'
import Note from '@app/components/core/media/Note.vue'

export default defineComponent({
	name: 'LegalFAQs',
	displayName: 'FAQs',
	components: { Justified, Note }
})
</script>
