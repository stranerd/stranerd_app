<template>
	<div
		class="m-0 w-full h-48 bg-white rounded-xl flex flex-col items-start md:gap-2 gap-[1rem] box-border p-6">
		<div class="w-full flex justify-between items-center">
			<ion-text>
				<Institution :institutionId="institutionId" class="font-bold text-main-dark" />
			</ion-text>
			<ion-icon :icon="arrowForward" class="text-3xl text-gray" />
		</div>
		<Tag :tag="yearGap" />

		<router-link :to="`/study/preps/${institutionId}`" class="w-full mt-auto">
			<ion-button class="btn-outline text-primary w-full">Get Started</ion-button>
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
		const startYear = computed(() => props.testPreps.map((prep) => prep.data.year)[0])
		const endYear = computed(() => props.testPreps.map((prep) => prep.data.year).reverse()[0])
		const yearGap = computed(() => {
			if (startYear.value !== endYear.value) return `${startYear.value} - ${endYear.value}`
			else return `${startYear.value}`
		})

		return { yearGap, arrowForward }
	}
})
</script>
