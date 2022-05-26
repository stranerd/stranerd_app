<template>
	<Justified>
		<Note link="/legal/terms-and-conditions.pdf" />
	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import { defineComponent } from 'vue'
import Note from '@app/components/core/media/Note.vue'

export default defineComponent({
	name: 'LegalTermsAndConditions',
	displayName: 'Terms and Conditions',
	components: { Justified, Note }
})
</script>
