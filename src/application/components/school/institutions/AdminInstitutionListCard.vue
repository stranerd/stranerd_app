<template>
	<router-link :to="`/admin/school/institutions/${institution.id}`" class="card-sm card-padding">
		<span class="uppercase text-[20px]">{{ institution.name }}</span>
	</router-link>
</template>

<script lang="ts" setup>
import { InstitutionEntity } from '@modules/school'

defineProps({
	institution: {
		type: InstitutionEntity,
		required: true
	}
})
</script>
