<template>
	<div class="showcase-flex">
		<EmptyState v-if="filtered.length === 0" info="No results found." />
		<ClassListCard v-for="classInst in filtered" :key="classInst.hash" :classInst="classInst" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import ClassListCard from '@app/components/classes/classes/SearchClassListCard.vue'
import { ClassEntity } from '@modules/classes'

export default defineComponent({
	name: 'SearchClassesList',
	components: { ClassListCard },
	props: {
		classes: {
			type: Array as PropType<ClassEntity[]>,
			required: true
		},
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup (props) {
		const filtered = computed(() => props.classes.slice(0, props.sliced ? 6 : undefined))
		return { filtered }
	}
})
</script>
