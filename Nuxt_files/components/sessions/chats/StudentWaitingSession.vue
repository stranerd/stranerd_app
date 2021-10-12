<template>
	<div class="bg-primary text-white py-1 lead text-center">
		Waiting for&nbsp;
		<DynamicText>{{ session.tutorBio.fullName }}</DynamicText>
		&nbsp;to accept session
	</div>
</template>

<script lang="ts">
import { SessionEntity } from '@/modules/sessions'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
	name: 'StudentWaitingSession',
	props: {
		session: {
			type: Object as PropType<SessionEntity>,
			required: true
		}
	}
})
</script>
