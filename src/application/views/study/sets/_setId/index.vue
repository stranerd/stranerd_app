<template>
	<Justified>
		<div class="lg:w-8/12 w-full mx-auto md:px-4 py-4">
			<SetWrapper v-if="set" :key="set.hash" :set="set" />
			<PageLoading v-if="loading" />
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { useRoute } from 'vue-router'
import { useSetById } from '@app/composable/study/sets'
import SetWrapper from '@app/components/study/sets/page/SetWrapper.vue'

export default defineComponent({
	name: 'StudySetsSetId',
	displayName: 'Folder',
	components: { Justified, SetWrapper },
	setup () {
		const { setId } = useRoute().params
		const { error, loading, set } = useSetById(setId as string)
		return { error, loading, set }
	}
})
</script>
