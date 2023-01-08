<template>
	<div>
		<EmptyState v-if="!loading && !error && institutions.length === 0" info="No institutions found." />
		<div class="flex flex-col gap-4">
			<template v-if="exams.length">
				<InstitutionListCard v-for="institution in exams" :key="institution.hash" :institution="institution" />
			</template>
			<template v-if="schools.length">
				<InstitutionListCard v-for="institution in schools" :key="institution.hash"
					:institution="institution" />
			</template>
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts" setup>
import InstitutionListCard from '@app/components/school/institutions/AdminInstitutionListCard.vue'
import { useInstitutionList } from '@app/composable/school/institutions'

const { loading, error, institutions, schools, gatewayExams: exams } = useInstitutionList()
</script>
