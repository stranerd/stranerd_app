<template>
	<div>
		<div class="w-full flex justify-between mb-4">
			<div class="heading font-bold text-main_dark flex items-center">
				<ion-text class="mr-3">
					Test Preps
				</ion-text>
				<ion-badge v-if="suggested" class="uppercase">
					Latest
				</ion-badge>
			</div>

			<router-link class="text-primary normalText flex items-center font-bold"
				to="/study/explore/preps">
				<span>view all</span>
			</router-link>
		</div>

		<template v-if="testPreps.length === 0">
			<EmptyState info="No testPreps available." />
		</template>

		<template v-else>
			<div class="showcase">
				<div v-for="group in testPreps" :key="group.institutionId"
					:class="[`m-0 w-full h-44 bg-white rounded-xl flex flex-col items-start justify-between md:gap-2 gap-[1rem] box-border p-6`]">
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
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { useTestPrepList } from '@app/composable/study/testPreps'
import { IonBadge } from '@ionic/vue'
import Institution from '@app/components/study/institutions/Institution.vue'

export default defineComponent({
	name: 'TestPrepList',
	components: { IonBadge, Institution },
	props: {
		suggested: {
			required: false,
			default: false
		}
	},
	setup () {
		const { groupedByInstitution, listener, loading, error } = useTestPrepList()
		const testPreps = computed({
			get: () => groupedByInstitution.value.slice(0, 6),
			set: () => {
			}
		})

		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return { testPreps }
	}
})
</script>
