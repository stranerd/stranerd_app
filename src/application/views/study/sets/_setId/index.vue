<template>
	<Justified>
		<div>
			<SetView v-if="set" :key="set.hash" :set="set" />
			<BlockLoading v-if="loading" />
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { useRoute } from 'vue-router'
import { useSetById } from '@app/composable/study/sets'
import SetView from '@app/components/study/sets/SetView.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'StudySetsSetId',
	components: { Justified, SetView },
	setup () {
		useRouteMeta('Folder')
		const { setId } = useRoute().params
		const { error, loading, set } = useSetById(setId as string)
		return { error, loading, set }
	}
})
</script>
