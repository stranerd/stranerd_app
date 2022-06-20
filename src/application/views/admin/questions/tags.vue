<template>
	<AdminWrapper>
		<TagsList />
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@app/components/admin/AdminWrapper.vue'
import TagsList from '@app/components/questions/tags/TagsList.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AdminQuestionsTags',
	components: { AdminWrapper, TagsList },
	beforeRouteEnter: generateMiddlewares(['isAdmin']),
	setup () {
		useRouteMeta('Question Tags', { back: true })
	}
})
</script>
