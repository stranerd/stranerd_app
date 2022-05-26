<template>
	<Justified>
		<Note link="/legal/privacy-policy.pdf" />
	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import { defineComponent } from 'vue'
import Note from '@app/components/core/media/Note.vue'

export default defineComponent({
	name: 'LegalPrivacyPolicy',
	displayName: 'Privacy Policy',
	components: { Justified, Note }
})
</script>
