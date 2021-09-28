<template>
	<TagQuestionsList :tag-id="tagId" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TagQuestionsList from '@app/components/questions/questions/TagQuestionsList.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'TagPage',
	components: { TagQuestionsList },
	layout: 'justified',
	setup () {
		const { tagId } = useRoute().params
		// useMeta(() => ({
		// 	title: `Questions under ${tagId} | Stranerd`
		// }))
		return { tagId }
	},
	head: {}
})
</script>
