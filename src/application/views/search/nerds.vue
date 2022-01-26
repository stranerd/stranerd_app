<template>
	<SearchWrapper>
		<template v-slot:default="{ users }">
			<SearchUsersList :users="users" />
		</template>
	</SearchWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchWrapper from '@app/components/search/SearchWrapper.vue'
import SearchUsersList from '@app/components/users/SearchUsersList.vue'

export default defineComponent({
	name: 'SearchNerds',
	displayName: 'Search',
	components: { SearchWrapper, SearchUsersList }
})
</script>
