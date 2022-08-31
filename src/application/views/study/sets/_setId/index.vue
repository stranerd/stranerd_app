<template>
	<DefaultLayout>
		<div class="h-full flex flex-col">
			<BlockLoading v-if="loading" />
			<SetView v-else-if="set" :key="set.hash" :set="set" />
			<NotFound v-else title="Folder not found" />
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
