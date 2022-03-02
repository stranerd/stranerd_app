<template>
	<div class="w-full bg-white rounded-xl flex flex-col items-start gap-6 box-border p-4 text-main_dark">
		<div class="w-full flex justify-between items-center">
			<ion-text class="truncate">
				<Institution :institutionId="institutionId" class="font-semibold" />
			</ion-text>
			<router-link :to="`/study/preps/${institutionId}`">
				<ion-icon :icon="arrowForwardCircleOutline" class="text-2xl text-gray" />
			</router-link>
		</div>

		<div class="flex justify-between items-center w-full gap-2">
			<Tag :index="0" :tag="yearGap" class="text-sm" />
			<Share :link="`/study/preps/${institutionId}`"
				:title="`${institution ? institution.name : 'Institution'}'s preps`"
				cssClass="text-lg" text="Share this institution preps" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { TestPrepEntity } from '@modules/study'
import Institution from '@app/components/study/institutions/Institution.vue'
import { arrowForwardCircleOutline } from 'ionicons/icons'
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

		return { yearGap, arrowForwardCircleOutline, institution }
	}
})
</script>
