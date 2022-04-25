<template>
	<div>
		<EmptyState v-if="!loading && !error && institutions.length === 0" info="No institutions found." />
		<div class="flex flex-col gap-4">
			<InstitutionListCard v-for="institution in exams" :key="institution.hash" :institution="institution" />
			<div class="mb-4" />
			<InstitutionListCard v-for="institution in schools" :key="institution.hash" :institution="institution" />
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InstitutionListCard from '@app/components/school/institutions/AdminInstitutionListCard.vue'
import { useInstitutionList } from '@app/composable/school/institutions'

export default defineComponent({
	name: 'AdminInstitutionsList',
	components: { InstitutionListCard },
	setup () {
		const { loading, error, institutions, schools, gatewayExams: exams } = useInstitutionList()
		return { loading, error, institutions, schools, exams }
	}
})
</script>
