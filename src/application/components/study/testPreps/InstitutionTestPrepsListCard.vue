<template>
	<div
		class="m-0 w-full min-h-40 bg-white rounded-xl flex flex-col items-start justify-between md:gap-2 gap-[1rem] box-border p-6">
		<div class="flex flex-col">
			<ion-text class="font-bold text-main_dark">
				<Institution :institutionId="institutionId" />
			</ion-text>
			<ion-text class="text-base text-gray">{{ formatNumber(testPreps.length) }} tests</ion-text>
		</div>
		<div class="w-full flex items-center justify-between gap-3">
			<router-link :to="`/study/preps/${institutionId}?type=test`" class="w-full">
				<ion-button class="btn-primary w-full" size="small">Test</ion-button>
			</router-link>
			<router-link :to="`/study/preps/${institutionId}?type=study`" class="w-full">
				<ion-button class="btn-outline text-primary  w-full" size="small">
					Solutions
				</ion-button>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TestPrepEntity } from '@modules/study'
import Institution from '@app/components/study/institutions/Institution.vue'
import { formatNumber } from '@utils/commons'

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
	setup () {
		return { formatNumber }
	}
})
</script>
