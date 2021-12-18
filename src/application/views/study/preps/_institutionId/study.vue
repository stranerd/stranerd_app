<template>
	<Justified>
		<!-- TODO: Break into sections -->
		<div class="bg-primary w-full min-h-[150px] flex flex-col justify-center items-center pt-0 pb-1">
			<ion-text class="heading lg:text-2xl font-bold text-white text-center my-2">
				<Institution :institutionId="institutionId" />
			</ion-text>
			<div class="flex items-center hidden">
				<ion-text class="text-faded_gray font-semibold text-center">
					Study exam questions and their solutions for tertiary level institutions in Nigeria.
				</ion-text>
			</div>
		</div>

		<div class="md:w-8/12 w-full px-4 mx-auto mt-8">
			<div class="grid lg:grid-cols-4 md:grid-cols-3 gap-5 mt-8">
				<div v-for="prep in preps" :key="prep.hash"
					:class="[`m-0 min-w-[16.5rem] cardPadding border bg-light_gray rounded-xl flex flex-col items-center md:gap-2 gap-[1rem] box-border !p-4 md:!p-7 border border-faded_gray lg:border-0`]">
					<ion-text class="font-bold text-lg text-main_dark">
						{{ prep.name }}
					</ion-text>

					<ion-button class="btn-secondary min-w-[7rem] font-bold w-full mt-1"
						@click="createTest(prep, false)">
						Study
					</ion-button>
				</div>
			</div>
		</div>

		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import Institution from '@app/components/study/institutions/Institution.vue'
import { useRoute } from 'vue-router'
import { useTestPrepList } from '@app/composable/study/testPreps'
import { useCreateTest } from '@app/composable/study/tests'

export default defineComponent({
	name: 'StartUnTimedTest',
	displayName: 'Test Preps',
	components: { Justified, Institution },
	middlewares: ['isAuthenticated'],
	setup () {
		const { institutionId } = useRoute().params
		const { groupedByInstitution } = useTestPrepList()
		const preps = computed({
			get: () => groupedByInstitution.value.find((x) => x.institutionId === institutionId)?.preps ?? [],
			set: () => {
			}
		})
		const { loading, error, createTest } = useCreateTest()
		return { institutionId, preps, loading, error, createTest }
	}
})
</script>

<style lang="scss" scoped>
	.segment-button-checked {
		color: white !important
	}

	ion-select {
		--background: #F7F7FC;
		background: #F7F7FC;
		--padding-start: 1rem;
		--padding-end: 1rem;
		--padding-top: 0.8rem;
		--padding-bottom: 0.8rem;
	}

	ion-segment {
		--background: #F7F7FC;
		color: #8B9EB1;
		font-weight: bold;
	}

	ion-segment-button {
		--background-checked: #8B9EB1;
		--background-focused: #8B9EB1;
		--indicator-color: #8B9EB1;
		--indicator-box-shadow: none;
		--padding-top: 0.8rem;
		--padding-bottom: 0.8rem;
		color: #8B9EB1;
		font-weight: bold;
	}

	.custom-shadow {
		box-shadow: 0px 0px 50px rgba(77, 92, 111, 0.1);
		border-radius: 24px;
		@media (max-width: 770px) {
			box-shadow: none;
			border-radius: 0;
		}
	}

	.ion-iten-transparent {
		--background: transparent;
	}

	ion-searchbar {
		--box-shadow: 'none';
		--border-radius: 0.5rem;
	}

	.searchbar-input.sc-ion-searchbar-md {
		padding-top: 12px;
		padding-bottom: 12px;
	}
</style>
