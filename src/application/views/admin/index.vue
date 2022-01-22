<template>
	<AdminWrapper>
		<div>
			<div class="mb-12">
				<ExploreTestPrepsList :sliced="true" />
			</div>

			<div class="mb-12">
				<ExploreNotesList :sliced="true" />
			</div>

	

		</div>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@root/application/components/admin/AdminWrapper.vue'
import ExploreTestPrepsList from '@app/components/study/testPreps/ExploreTestPrepsList.vue'
import ExploreNotesList from '@app/components/study/notes/ExploreNotesList.vue'


export default defineComponent({
	name: 'AdminPage',
	displayName: 'Administration',
	components: {
		AdminWrapper,
		ExploreTestPrepsList,
		ExploreNotesList,

	}
})
</script>
