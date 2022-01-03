<template>
	<IonSkeletonText v-if="loading" class="h-36 rounded-xl " animated/>
	<div v-else>
		<template v-if="filtered.length === 0">
			<EmptyState info="No videos available." />
		</template>
		<template v-else>
			<div class="showcase">
				<VideoListCard v-for="video in filtered" :key="video.hash" :openMenu="(event:any) => openMenu(video, event)"
					:video="video" />
			</div>
		</template>
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
		const {loading}=	useSearch()
		const openMenu = (entity: VideoEntity, event: Event) => openStudyEntityMenu(entity, {}, event)
		const filtered = computed(() => props.videos.slice(0, props.sliced ? 6 : undefined))
		return { filtered, openMenu, loading }
	}
})
</script>
