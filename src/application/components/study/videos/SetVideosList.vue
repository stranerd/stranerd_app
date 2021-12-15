<template>
	<div>
		<div class="w-full flex justify-between mb-4">
			<div class="heading font-bold text-main_dark flex items-center">
				<ion-text>Videos</ion-text>
			</div>
			<router-link
				:to="`/study/sets/${set.id}/videos`"
				class="text-primary normalText flex items-center font-bold">
				<span>view all</span>
			</router-link>
		</div>

		<template v-if="filtered.length === 0">
			<EmptyState info="No videos saved." />
		</template>

		<template v-else>
			<div class="showcase">
				<VideoCard v-for="video in filtered" :key="video.hash" :video="video" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import VideoCard from '@app/components/study/videos/VideoListCard.vue'
import { SetEntity, VideoEntity } from '@modules/study'

export default defineComponent({
	name: 'SetVideoList',
	components: { VideoCard },
	props: {
		set: {
			type: SetEntity,
			required: true
		},
		videos: {
			type: Array as PropType<VideoEntity[]>,
			required: true
		}
	},
	setup (props) {
		const filtered = computed({
			get: () => props.videos.slice(0, 6),
			set: () => {
			}
		})
		return { filtered }
	}
})
</script>

<style>
	ion-badge {
		--background: #FFDC00 !important;
		--color: #132740 !important;
		--padding-top: 6px !important;
	}
</style>
