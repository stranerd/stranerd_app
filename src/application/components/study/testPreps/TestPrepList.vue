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

			<router-link class="text-primary text-body flex items-center font-bold"
				to="/search/preps">
				<span>explore</span>
			</router-link>
		</div>

		<template v-if="testPreps.length === 0">
			<EmptyState info="No testPreps available." />
		</template>

		<template v-else>
			<div class="showcase">
				<InstitutionTestPrepsListCard v-for="group in testPreps" :key="group.institutionId"
					:institutionId="group.institutionId" :testPreps="group.preps" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { groupedByInstitution, useTestPrepList } from '@app/composable/study/testPreps'
import { IonBadge } from '@ionic/vue'
import InstitutionTestPrepsListCard from '@app/components/study/testPreps/InstitutionTestPrepsListCard.vue'

export default defineComponent({
	name: 'TestPrepList',
	components: { InstitutionTestPrepsListCard, IonBadge },
	props: {
		suggested: {
			required: false,
			default: false
		}
	},
	setup () {
		const { testPreps: preps, listener, loading, error } = useTestPrepList()
		const testPreps = computed({
			get: () => groupedByInstitution(preps.value).value.slice(0, 6),
			set: () => {
			}
		})

		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return { testPreps }
	}
})
</script>
