<template>
	<router-link :to="`/study/preps/${institutionId}`"
		class="w-full border-bottom-line flex items-start box-border card-padding !py-6">
		<ion-text class="truncate flex-grow">
			<Institution :institutionId="institutionId" class="font-500" />
		</ion-text>
		<div class="flex justify-between items-center gap-2 text-sub">
			<Tag :tag="yearGap" class="w-full" />
			<IonIcon :icon="arrowForwardOutline" class="text-heading2 ml-auto" />
		</div>
	</router-link>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { TestPrepEntity } from '@modules/study'
import Institution from '@app/components/school/institutions/Institution.vue'
import { useInstitution } from '@app/composable/school/institutions'
import { arrowForwardOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'InstitutionTestPrepsListCard',
	components: { Institution },
	props: {
		institutionId: {
			type: String,
			required: true
		},
		testPreps: {
			type: Array as PropType<TestPrepEntity[]>,
			required: true
		}
	},
	setup (props) {
		const { institution } = useInstitution(props.institutionId)
		const startYear = computed(() => props.testPreps.map((prep) => prep.data.year).sort()[0])
		const endYear = computed(() => props.testPreps.map((prep) => prep.data.year).sort().reverse()[0])
		const yearGap = computed(() => {
			if (startYear.value !== endYear.value) return `${startYear.value} - ${endYear.value}`
			else return `${startYear.value}`
		})

		return { yearGap, institution, arrowForwardOutline }
	}
})
</script>
