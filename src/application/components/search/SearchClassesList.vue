<template>
	<div class="showcase-flex !p-0">
		<EmptyState v-if="classes.length === 0" info="No classes found." />
		<ClassListCard v-for="classInst in classes" :key="classInst.hash" :classInst="classInst" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ClassListCard from '@app/components/classes/classes/SearchClassListCard.vue'
import { ClassEntity } from '@modules/classes'

export default defineComponent({
	name: 'SearchClassesList',
	components: { ClassListCard },
	props: {
		classes: {
			type: Array as PropType<ClassEntity[]>,
			required: true
		}
	}
})
</script>
