<template>
	<div class="min-h-full showcase-flex gap-4">
		<IonText v-if="preps.length" class="font-bold text-sm">Saved</IonText>
		<EmptyTests v-if="!loading && !error && preps.length === 0" />
		<TestPrepListCard v-for="prep in preps" :key="prep.hash" :testPrep="prep" />
		<BlockLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useSavedTestPreps } from '@app/composable/study/testPreps'
import { useUserSetList } from '@app/composable/users/users/sets'
import TestPrepListCard from '@app/components/study/testPreps/SavedTestPrepListCard.vue'
import { PastQuestionType } from '@modules/school'
import { orComputed } from '@app/composable/core/states'

export default defineComponent({
	name: 'SavedTestPreps',
	components: { TestPrepListCard },
	props: {
		obj: {
			type: Boolean,
			required: true
		}
	},
	setup (props) {
		const { sets, loading: setLoading, error: setError } = useUserSetList()
		const prepIds = computed(() => sets.value.reduce((acc, cur) => {
			acc.push(...cur.saved.testPreps)
			return acc
		}, [] as string[]))
		const { testPreps, loading: prepLoading, error: prepError } = useSavedTestPreps(prepIds)
		const preps = computed(() => testPreps.value.filter((p) => props.obj ? p.data.questionType === PastQuestionType.objective : p.data.questionType !== PastQuestionType.objective))
		const loading = orComputed([setLoading, prepLoading])
		const error = orComputed([setError, prepError])
		return { preps, loading, error }
	}
})
</script>
