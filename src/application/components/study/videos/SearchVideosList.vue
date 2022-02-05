<template>
	<IonSkeletonText v-if="loading" animated class="h-36 rounded-xl" />
	<div v-else>
		<EmptyState v-if="fetched && !loading && filtered.length === 0" info="No results found." />
		<div class="showcase">
			<VideoListCard v-for="video in filtered" :key="video.hash"
				:openMenu="(event) => openMenu(video, event)"
				:video="video" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import VideoListCard from '@app/components/study/videos/VideoListCard.vue'
import { VideoEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'
import { IonSkeletonText } from '@ionic/vue'
import { useSearch } from '@app/composable/meta/search'

export default defineComponent({
	name: 'SearchVideosList',
	components: { VideoListCard, IonSkeletonText },
	props: {
		videos: {
			type: Array as PropType<VideoEntity[]>,
			required: true
		},
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup (props) {
		const { loading, fetched } = useSearch()
		const openMenu = (entity: VideoEntity, event: Event) => openStudyEntityMenu(entity, {}, event)
		const filtered = computed(() => props.videos.slice(0, props.sliced ? 6 : undefined))
		return { filtered, openMenu, loading, fetched }
	}
})
</script>
