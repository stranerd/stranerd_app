<template>
	<div>
		<EmptyState v-if="!loading && !error && institutions.length === 0" info="No institutions found." />
		<IonAccordionGroup>
			<InstitutionListCard v-for="institution in institutions" :key="institution.hash"
				:institution="institution" />
		</IonAccordionGroup>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InstitutionListCard from '@app/components/study/institutions/AdminInstitutionListCard.vue'
import { useInstitutionList } from '@app/composable/study/institutions'
import { IonAccordionGroup } from '@ionic/vue'

export default defineComponent({
	name: 'AdminInstitutionsList',
	components: { InstitutionListCard, IonAccordionGroup },
	setup () {
		const { loading, error, institutions } = useInstitutionList()
		return { loading, error, institutions }
	}
})
</script>
