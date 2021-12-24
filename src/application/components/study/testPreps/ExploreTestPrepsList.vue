<template>
	<div>
		<template v-if="filtered.length === 0">
			<EmptyState info="No testPreps available." />
		</template>
		<template v-else>
			<div class="showcase">
				<div v-for="group in filtered" :key="group.institutionId"
					:class="[`m-0 w-full h-40 bg-white rounded-xl flex flex-col items-start justify-between md:gap-2 gap-[1rem] box-border p-6`]">
					<ion-text class="font-bold text-xl text-main_dark">
						<Institution :institutionId="group.institutionId" />
					</ion-text>

					<div class="w-full flex items-center justify-between gap-3">
						<router-link :to="`/study/preps/${group.institutionId}?type=test`" class="flex-grow">
							<ion-button class="btn-primary font-bold w-full">Test</ion-button>
						</router-link>
						<router-link :to="`/study/preps/${group.institutionId}?type=study`" class="flex-grow">
							<ion-button class="btn-outline text-primary font-bold w-full">
								Solutions
							</ion-button>
						</router-link>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { InstitutionTestPreps } from '@app/composable/study/testPreps'
import Institution from '@app/components/study/institutions/Institution.vue'

export default defineComponent({
	name: 'ExploreTestPrepsList',
	components: { Institution },
	props: {
		testPreps: {
			type: Array as PropType<InstitutionTestPreps[]>,
			required: true
		},
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup (props) {
		const filtered = computed(() => props.testPreps.slice(0, props.sliced ? 6 : undefined))
		return { filtered }
	}
})
</script>
