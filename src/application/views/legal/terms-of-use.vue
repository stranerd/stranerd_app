<template>
	<Justified>
		<Note link="/legal/terms-of-use.pdf" />
	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import { defineComponent } from 'vue'
import Note from '@app/components/core/media/Note.vue'

export default defineComponent({
	name: 'LegalTermsOfUse',
	displayName: 'Terms Of Use',
	components: { Justified, Note }
})
</script>
