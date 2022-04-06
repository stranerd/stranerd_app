<template>
	<Justified>
		<div class="lg:w-8/12 w-full mx-auto bg-white lg:my-8 md:rounded-xl max-w-[1000px]">
			<Note link="/legal/privacy-policy.pdf" />
		</div>
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
