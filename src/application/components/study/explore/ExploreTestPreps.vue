<template>
	<div>
		<template v-if="groupedByInstitution.length === 0">
			<div class="py-3">
				<EmptyState info="No test preps available" />
			</div>
		</template>
		<template v-else>
			<div class="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mt-8">
				<div v-for="group in groupedByInstitution" :key="group.institutionId"
					:class="[`m-0 h-[13rem] min-w-[16.5rem] cardPadding border bg-white rounded-xl flex flex-col items-center md:gap-2 gap-[1rem] box-border !p-4 md:!p-7 border border-faded_gray lg:border-0`]">
					<ion-text class="font-bold text-lg text-main_dark">
						<Institution :institutionId="group.institutionId" />
					</ion-text>

					<div class="mt-1">
						<router-link :to="`/study/preps/${group.institutionId}/test`">
							<ion-button class="btn-secondary  min-w-[7rem] font-bold w-full mb-3">
								Test yourself
							</ion-button>
						</router-link>

						<router-link :to="`/study/preps/${group.institutionId}/study`">
							<ion-button class="btn-outline text-main_dark min-w-[7rem]  font-bold w-full">
								Study solutions
							</ion-button>
						</router-link>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import Institution from '@app/components/study/institutions/Institution.vue'
import { useTestPrepList } from '@app/composable/study/testPreps'
import { calendar, play } from 'ionicons/icons'

export default defineComponent({
	name: 'ExploreTestPreps',
	components: { Institution },
	props: {
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup () {
		const { groupedByInstitution, listener, loading, error } = useTestPrepList()

		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return { groupedByInstitution, calendar, play, loading, error }
	}
})
</script>

<style scoped>
	ion-select {
		--background: #F7F7FC;
		background: #F7F7FC;
		--padding-start: 1rem;
		--padding-end: 1rem;
	}

	ion-segment {
		--background: #F7F7FC;
		color: #8B9EB1;
		font-weight: bold;
	}

	ion-segment-button {
		--background-checked: #4D5C6F;
		--background-focused: #4D5C6F;
		--indicator-color: #4D5C6F;
		--indicator-box-shadow: none;
		--padding-top: 0.5rem;
		--padding-bottom: 0.5rem;
		color: #8B9EB1;
		font-weight: bold;
	}
</style>
