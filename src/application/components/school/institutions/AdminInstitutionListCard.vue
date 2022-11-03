<template>
	<router-link :to="`/admin/school/institutions/${institution.id}`" class="card-sm card-padding">
		<span class="uppercase text-[20px]">{{ institution.name }}</span>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { InstitutionEntity } from '@modules/school'

export default defineComponent({
	name: 'AdminInstitutionListCard',
	props: {
		institution: {
			type: InstitutionEntity,
			required: true
		}
	}
})
</script>
