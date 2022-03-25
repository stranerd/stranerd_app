<template>
	<div>
		<EmptyState v-if="filtered.length === 0" info="No results found." />
		<div class="showcase">
			<SetListCard v-for="set in filtered" :key="set.hash" :set="set" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import SetListCard from '@app/components/study/sets/SetListCard.vue'
import { SetEntity } from '@modules/study'

export default defineComponent({
	name: 'SearchSetsList',
	components: { SetListCard },
	props: {
		sets: {
			type: Array as PropType<SetEntity[]>,
			required: true
		},
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup (props) {
		const filtered = computed(() => props.sets.slice(0, props.sliced ? 6 : undefined))
		return { filtered }
	}
})
</script>
