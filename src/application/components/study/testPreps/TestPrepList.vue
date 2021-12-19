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
				<TestPrepCard v-for="testPrep in testPreps" :key="testPrep.hash" :openMenu="() => openMenu(testPrep)"
					:testPrep="testPrep" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { useTestPrepList } from '@app/composable/study/testPreps'
import TestPrepCard from '@app/components/study/testPreps/TestPrepListCard.vue'
import { IonBadge } from '@ionic/vue'
import { TestPrepEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'

export default defineComponent({
	name: 'TestPrepList',
	components: { TestPrepCard, IonBadge },
	props: {
		suggested: {
			required: false,
			default: false
		}
	},
	setup () {
		const { testPreps: allTestPreps, listener, loading, error } = useTestPrepList()
		const testPreps = computed({
			get: () => allTestPreps.value.slice(0, 3),
			set: () => {
			}
		})

		const openMenu = (entity: TestPrepEntity) => openStudyEntityMenu(entity, {})

		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return { testPreps, openMenu }
	}
})
</script>
