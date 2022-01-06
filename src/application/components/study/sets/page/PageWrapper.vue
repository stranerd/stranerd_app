<template>
	<Justified>
		<SetWrapper v-if="set" :set="set">
			<template v-slot:default="{ flashCards, notes, testPreps, videos, set }">
				<slot :flashCards="flashCards" :notes="notes" :set="set" :testPreps="testPreps" :videos="videos" />
			</template>
		</SetWrapper>
		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { useSetById } from '@app/composable/study/sets'
import { useRoute } from 'vue-router'
import SetWrapper from '@app/components/study/sets/page/SetWrapper.vue'

export default defineComponent({
	name: 'SetPageWrapper',
	components: { Justified, SetWrapper },
	setup () {
		const { setId } = useRoute().params
		const { error, loading, set, listener } = useSetById(setId as string)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { error, loading, set }
	}
})
</script>

