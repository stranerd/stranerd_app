<template>
	<SearchWrapper>
		<template v-slot:default="{ classes }">
			<SearchClassesList :classes="classes" />
		</template>
	</SearchWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchWrapper from '@app/components/search/SearchWrapper.vue'
import SearchClassesList from '@app/components/classes/classes/SearchClassesList.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'SearchClasses',
	components: { SearchWrapper, SearchClassesList },
	setup () {
		useRouteMeta('Search Classes', { back: true })
	}
})
</script>
