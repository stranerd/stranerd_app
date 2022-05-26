<template>
	<Justified>
		<Note link="/legal/nerds-terms-and-conditions.pdf" />
	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import { defineComponent } from 'vue'
import Note from '@app/components/core/media/Note.vue'

export default defineComponent({
	name: 'LegalNerdsTermsAndConditions',
	displayName: 'Nerds Terms and Conditions',
	components: { Justified, Note }
})
</script>
