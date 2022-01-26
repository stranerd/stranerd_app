<template>
	<PageWrapper>
		<template v-slot="{ set, videos }">
			<SetVideosList :set="set" :videos="videos" />
		</template>
	</PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageWrapper from '@app/components/study/sets/page/PageWrapper.vue'
import SetVideosList from '@app/components/study/videos/SetVideosList.vue'

export default defineComponent({
	name: 'StudySetsSetIdVideos',
	displayName: 'Study Set',
	components: { PageWrapper, SetVideosList }
})
</script>
