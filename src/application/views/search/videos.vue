<template>
	<SearchWrapper>
		<template v-slot:default="{ videos }">
			<SearchVideosList :videos="videos" />
		</template>
	</SearchWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchWrapper from '@app/components/search/SearchWrapper.vue'
import SearchVideosList from '@app/components/study/videos/SearchVideosList.vue'

export default defineComponent({
	name: 'SearchVideos',
	displayName: 'Search Videos',
	components: { SearchWrapper, SearchVideosList }
})
</script>
