<template>
	<DefaultLayout>
		<div>
			<SetView v-if="set" :key="set.hash" :set="set" />
			<BlockLoading v-if="loading" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useSetById } from '@app/composable/study/sets'
import SetView from '@app/components/study/sets/SetView.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'StudySetsSetId',
	components: { SetView },
	setup () {
		useRouteMeta('Folder', { back: true })
		const { setId } = useRoute().params
		const { error, loading, set } = useSetById(setId as string)
		return { error, loading, set }
	}
})
</script>
