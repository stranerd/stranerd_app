<template>
	<span :class="{ '!uppercase': institution?.isGateway }" class="capitalize">
		<slot :institution="institution">
			{{ institution?.name ?? 'Institution' }}
		</slot>
	</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useInstitution } from '@app/composable/school/institutions'

export default defineComponent({
	name: 'Institution',
	props: {
		institutionId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { institution } = useInstitution(props.institutionId)
		return { institution }
	}
})
</script>
