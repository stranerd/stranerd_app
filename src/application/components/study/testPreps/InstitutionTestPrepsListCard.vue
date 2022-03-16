<template>
	<router-link :to="`/study/preps/${institutionId}`"
		class="w-full bg-white rounded-xl flex flex-col items-start box-border card-padding text-main_dark">
		<ion-text class="truncate w-full">
			<Institution :institutionId="institutionId" class="font-semibold" />
		</ion-text>
		<div class="flex justify-between items-center w-full gap-2">
			<Tag :tag="yearGap" :index="3" />
			<Share :link="`/study/preps/${institutionId}`"
				:title="`${institution ? institution.name : 'Institution'}'s preps`"
				cssClass="text-lg" text="Share this institution preps" />
		</div>
	</router-link>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { TestPrepEntity } from '@modules/study'
import Institution from '@app/components/study/institutions/Institution.vue'
import { useInstitution } from '@app/composable/study/institutions'

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

		return { yearGap, institution }
	}
})
</script>
