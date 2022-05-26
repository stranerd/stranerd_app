<template>
	<AdminWrapper>
		<TagsList />
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@app/components/admin/AdminWrapper.vue'
import TagsList from '@app/components/questions/tags/TagsList.vue'

export default defineComponent({
	name: 'AdminQuestionsTags',
	displayName: 'Question Tags',
	components: { AdminWrapper, TagsList },
	middlewares: ['isAdmin']
})
</script>
