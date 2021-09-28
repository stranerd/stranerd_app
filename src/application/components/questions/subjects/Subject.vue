<template>
	<DynamicText>{{ subject ? subject.name : 'Subject' }}</DynamicText>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSubject } from '@app/hooks/questions/subjects'

export default defineComponent({
	name: 'Subject',
	props: {
		subjectId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { subject } = useSubject(props.subjectId)
		return { subject }
	}
})
</script>
