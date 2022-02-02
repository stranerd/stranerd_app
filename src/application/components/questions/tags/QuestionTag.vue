<template>
	<router-link :to="`/questions/tags/${tag}`">
		<Tag :index="index" :secondary="secondary" :tag="tag">
			<slot :tag="tag">{{ tag }}</slot>
		</Tag>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Tag from '@app/components/core/Tag.vue'

export default defineComponent({
	name: 'QuestionTag',
	components: { Tag },
	props: {
		tag: {
			type: String,
			required: true
		},
		index: {
			type: Number,
			required: false
		},
		secondary: {
			type: Boolean,
			default: false,
			required: false
		}
	}
})
</script>
