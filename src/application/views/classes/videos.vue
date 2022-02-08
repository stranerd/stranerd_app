<template>
	<classWrapper>
		<ExploreVideosList />
	</classWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import classWrapper from '@app/components/classes/ClassWrapper.vue'
import ExploreVideosList from '@app/components/study/videos/ExploreVideosList.vue'

export default defineComponent({
	name: 'ClassVideos',
	displayName: 'Classes',
	components: { classWrapper, ExploreVideosList }
})
</script>
