<template>
	<div class="m-0 w-full bg-white rounded-xl flex flex-col items-start gap-2 box-border p-4 text-main_dark">
		<div class="w-full flex justify-between items-center">
			<ion-text class="truncate">
				<Institution :institutionId="institutionId" class="font-semibold" />
			</ion-text>
			<router-link :to="`/study/preps/${institutionId}`">
				<ion-icon :icon="arrowForward" class="text-2xl text-gray" />
			</router-link>
		</div>
		<Tag :index="0" :tag="yearGap" class="text-sm" />

		<router-link :to="`/study/preps/${institutionId}`" class="w-full mt-auto">
			<ion-button class="btn-outline text-primary w-full" size="small">Get Started</ion-button>
		</router-link>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { TestPrepEntity } from '@modules/study'
import Institution from '@app/components/study/institutions/Institution.vue'
import { arrowForward } from 'ionicons/icons'

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
		const startYear = computed(() => props.testPreps.map((prep) => prep.data.year).sort()[0])
		const endYear = computed(() => props.testPreps.map((prep) => prep.data.year).sort().reverse()[0])
		const yearGap = computed(() => {
			if (startYear.value !== endYear.value) return `${startYear.value} - ${endYear.value}`
			else return `${startYear.value}`
		})

		return { yearGap, arrowForward }
	}
})
</script>
