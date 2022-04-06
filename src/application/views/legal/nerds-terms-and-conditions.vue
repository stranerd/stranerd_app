<template>
	<Justified>
		<div class="lg:w-8/12 w-full mx-auto bg-white lg:my-8 md:rounded-xl max-w-[1000px]">
			<Note link="/legal/nerds-terms-and-conditions.pdf" />
		</div>
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
