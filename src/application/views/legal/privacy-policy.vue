<template>
	<Justified>
		<div>
			<div class="blueTop">
				<ion-text class="heading lg:text-2xl font-bold text-white text-center">
					Privacy Policy
				</ion-text>
			</div>
			<div class="lg:w-8/12 w-full mx-auto mt-8 p-4 mb-16 bg-white">
				<Note :note="{ link: '/legal/privacy-policy.pdf' }" />
			</div>
		</div>
	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import { defineComponent } from 'vue'
import Note from '@app/components/study/notes/Note.vue'

export default defineComponent({
	name: 'PrivacyPolicy',
	displayName: 'Privacy Policy',
	components: { Justified, Note }
})
</script>
