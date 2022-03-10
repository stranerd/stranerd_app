<template>
	<Justified>
		<div>
			<div class="blueTop py-4">
				<ion-text class="heading lg:text-2xl font-bold text-main_dark text-center">
					Privacy Policy
				</ion-text>
			</div>
			<div class="lg:w-8/12 w-full mx-auto bg-white">
				<Note link="/legal/privacy-policy.pdf" />
			</div>
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
