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
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'SearchUsers',
	components: { SearchWrapper, SearchUsersList },
	setup () {
		useRouteMeta('Search Nerds', { back: true })
	}
})
</script>
