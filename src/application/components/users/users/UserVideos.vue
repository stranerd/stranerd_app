<template>
	<div v-if="loading" class="flex items-center justify-center w-full col-span-12 py-8">
		<ion-progress-bar type="indeterminate"></ion-progress-bar>
	</div>
	<div v-else class="col-span-12 md:gap-4 flex flex-col">
		<VideoListCard v-for="video in videos" :key="video.hash" :video="video" />
		<EmptyState v-if="!loading && !error && videos.length === 0"
			info="This user hasn't created any videos yet or they are marked private" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonProgressBar } from '@ionic/vue'
import VideoListCard from '@app/components/study/videos/VideoListCard.vue'
import { useUserVideoList } from '@app/composable/users/users/videos'
import EmptyState from '../../core/EmptyState.vue'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'ProfileVideos',
	components: { VideoListCard, IonProgressBar, EmptyState },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup (props) {
		const { videos, error, loading } = useUserVideoList(props.user.id)
		return { videos, error, loading }
	}
})
</script>
