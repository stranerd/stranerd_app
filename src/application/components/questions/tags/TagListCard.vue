<template>
	<Tag :tag="tag.name" />
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { TagEntity } from '@modules/questions'
import Tag from '@app/components/questions/tags/Tag.vue'

export default defineComponent({
	name: 'TagListCard',
	components: { Tag },
	props: {
		tag: {
			type: Object as PropType<TagEntity>,
			required: true
		}
	}
})
</script>
