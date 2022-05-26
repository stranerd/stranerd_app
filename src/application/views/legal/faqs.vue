<template>
	<Justified>
		<Note link="/legal/FAQs.pdf" />
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
