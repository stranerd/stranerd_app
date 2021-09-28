<template>
	<div>
		<Heading class="color-dark text-center mb-1" no-grow variant="2">
			Popular Tags
		</Heading>
		<div class="d-flex flex-wrap gap-0-5">
			<TagListCard v-for="tag in tags" :key="tag.hash" :tag="tag" class="bg-white" />
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
		<DisplayWarning v-if="!loading && !error && tags.length === 0" message="No tags found." />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TagListCard from '@app/components/questions/tags/TagListCard.vue'
import { useTagsList } from '@app/hooks/questions/tags'

export default defineComponent({
	name: 'TagsList',
	components: { TagListCard },
	setup () {
		const { loading, error, tags } = useTagsList()
		return { loading, error, tags }
	}
})
</script>
