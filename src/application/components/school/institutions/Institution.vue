<template>
	<span :class="{ '!uppercase': institution?.isGateway }" class="capitalize">
		<slot :institution="institution">
			{{ institution?.name ?? 'Institution' }}
		</slot>
	</span>
</template>

<script lang="ts" setup>
import { useInstitution } from '@app/composable/school/institutions'

const props = defineProps({
	institutionId: {
		type: String,
		required: true
	}
})

const { institution } = useInstitution(props.institutionId)
</script>
