<template>
	<div class="showcase-flex !p-0">
		<EmptyState v-if="classes.length === 0" info="No classes found." />
		<ClassListCard v-for="classInst in classes" :key="classInst.hash" :classInst="classInst" />
	</div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import ClassListCard from '@app/components/classes/classes/SearchClassListCard.vue'
import { ClassEntity } from '@modules/classes'

defineProps({
	classes: {
		type: Array as PropType<ClassEntity[]>,
		required: true
	}
})
</script>
