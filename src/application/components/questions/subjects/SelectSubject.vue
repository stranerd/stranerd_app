<template>
	<AutoComplete
		:class="{'showAll': showAll}"
		:default="def"
		:icon="hasIcon"
		:placeholder="placeholder"
		:suggestions="subjects.filter((s) => !exclude.includes(s.id)).map((s) => ({ search: s.name, value: s.id, title: s.name }))"
		:value="value"
		class="w-full   rounded-xl text-main_dark"
		@update:value="update($event)"
	/>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useSubjectList } from '@app/composable/questions/subjects'
import AutoComplete from '@app/components/core/AutoComplete.vue'

export default defineComponent({
	name: 'SelectSubject',
	components: { AutoComplete },
	props: {
		hasIcon: {
			type: Boolean,
			required: false,
			default: false
		},
		subjectId: {
			type: String,
			required: true
		},
		showAll: {
			type: Boolean,
			required: false,
			default: true
		},
		placeholder: {
			type: String,
			required: false,
			default: 'Select a Subject'
		},
		exclude: {
			type: Array as PropType<string[]>,
			required: false,
			default: () => []
		}
	},
	setup (props, { emit }) {
		const def = { search: '', value: '', title: 'All' }
		const { subjects } = useSubjectList()
		const value = ref(subjects.value.find((s) => s.id === props.subjectId)?.name ?? def.search)
		const update = (res: { term: string, value: string }) => {
			value.value = res.term
			emit('update:subjectId', res.value)
		}
		return { def, subjects, value, update }
	}
})
</script>

<style lang="scss" scoped>
	.showAll :deep(input.form-control) {
		background-color: inherit;
		color: $color-sub;

		&::placeholder {
			font-size: 1em !important;
			opacity: 1 !important;
		}
	}
</style>
