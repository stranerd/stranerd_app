<template>
	<DefaultLayout>
		<div class="showcase-flex">
			<Search class="p-4 lg:p-0" />
			<slot />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Search from '@app/components/search/Search.vue'

export default defineComponent({
	name: 'SearchWrapper',
	components: { Search }
})
</script>
