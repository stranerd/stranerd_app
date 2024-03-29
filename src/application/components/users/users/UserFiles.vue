<template>
	<div class="flex flex-col h-full">
		<div class="flex flex-col gap-4 py-4 border-bottom-line px-4 lg:px-0 lg:pt-0">
			<div class="flex items-center w-full">
				<a v-for="({ label, value }, idx) in [
						{ label: 'Images', value: 'images' }, { label: 'Videos', value: 'videos' },
						{ label: 'Docs', value: 'docs' }
					]" :key="value"
					:class="{ 'bg-primaryBg !text-primaryText': type === value, 'rounded-l-xl': idx === 0, 'rounded-r-xl': idx === 2 }"
					class="flex-grow p-2 border border-primaryBg text-primaryBg text-center"
					@click="type = value">
					{{ label }}
				</a>
			</div>
			<form v-if="files.length" @submit.prevent="search">
				<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
			</form>
		</div>
		<EmptyFiles v-if="!loading && !error && files.length === 0" />
		<ImagesList v-if="type === 'images'" :media="images" />
		<VideosList v-if="type === 'videos'" :media="videos" />
		<DocsList v-if="type === 'docs'" :media="docs" />
		<BlockLoading v-if="loading" />
		<LoadMore v-if="hasMore && !searchMode" :load="fetchOlderFiles" />
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import ImagesList from '@app/components/media/ImagesList.vue'
import VideosList from '@app/components/media/VideosList.vue'
import DocsList from '@app/components/media/DocsList.vue'
import { groupBy } from '@utils/commons'
import { months } from '@utils/dates'
import { useFileList } from '@app/composable/study/files'

const {
	loading, error, files, type, hasMore, fetchOlderFiles,
	searchValue, search, searchMode
} = useFileList()
const images = computed(() => groupBy(files.value.filter((c) => c.isImage)
	.map((c) => ({ hash: c.hash, media: c.media!, path: c.saveFilePath, createdAt: c.createdAt })), (c) => {
	const date = new Date(c.createdAt)
	return `${months[date.getMonth()]} ${date.getFullYear()}`
}))
const videos = computed(() => groupBy(files.value.filter((c) => c.isVideo)
	.map((c) => ({ hash: c.hash, media: c.media!, path: c.saveFilePath, createdAt: c.createdAt })), (c) => {
	const date = new Date(c.createdAt)
	return `${months[date.getMonth()]} ${date.getFullYear()}`
}))
const docs = computed(() => groupBy(files.value.filter((c) => c.isDoc)
	.map((c) => ({ hash: c.hash, media: c.media!, path: c.saveFilePath, createdAt: c.createdAt })), (c) => {
	const date = new Date(c.createdAt)
	return `${months[date.getMonth()]} ${date.getFullYear()}`
}))
</script>
