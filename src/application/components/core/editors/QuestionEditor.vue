<template>
	<BaseEditor
		:error="error"
		:toolbar="toolbar"
		:valid="valid"
		:value="model"
		path="questions"
		placeholder="Write your question here and make sure it is explained in full detail."
		@update:value="$emit('update:model',$event)"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseEditor from '@app/components/core/editors/BaseEditor.vue'

export default defineComponent({
	name: 'QuestionEditor',
	components: { BaseEditor },
	props: {
		model: {
			required: true,
			type: String
		},
		error: {
			required: true,
			type: String
		},
		valid: {
			required: true,
			type: Boolean
		}
	},
	setup () {
		return {
			toolbar: [
				[{ header: [2, 3, 4, 5, false] }],
				['bold', 'italic', 'underline', 'strike'],
				[{ script: 'sub' }, { script: 'super' }],
				['code-block'],
				['clean']
			]
		}
	}
})
</script>
