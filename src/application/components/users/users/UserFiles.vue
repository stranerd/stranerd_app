<template>
	<div class="showcase-flex">
		<form class="p-4 lg:p-0" @submit.prevent="search">
			<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
		</form>
		<EmptyState v-if="!loading && !error && files.length === 0" class="border-bottom-line"
			info="This user hasn't created any files yet" />
		<pre>{{ JSON.stringify(files, null, 4) }}</pre>
		<BlockLoading v-if="loading" />
		<LoadMore v-if="hasMore" :load="fetchOlderFiles" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserFileList } from '@app/composable/users/users/files'
import EmptyState from '@app/components/core/EmptyState.vue'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'ProfileFiles',
	components: { EmptyState },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup (props) {
		const {
			files, error, loading, hasMore, fetchOlderFiles,
			searchMode, searchResults, searchValue, search
		} = useUserFileList(props.user.id)
		return {
			files, error, loading, hasMore, fetchOlderFiles,
			searchMode, searchResults, searchValue, search
		}
	}
})
</script>
