<template>
	<div class="flex flex-col flex-1">
		<div class="flex flex-col gap-4 py-4 border-bottom-line px-4 lg:px-0 lg:pt-0">
			<IonSelect v-model="groupId" class="capitalize" interface="action-sheet" placeholder="Sort by discussion">
				<IonSelectOption :value="null" class="capitalize">
					All
				</IonSelectOption>
				<IonSelectOption v-for="group in groups" :key="group.hash" :value="group.id" class="capitalize">
					{{ group.name }}
				</IonSelectOption>
			</IonSelect>
			<div class="flex items-center w-full">
				<a v-for="({ label, value }, idx) in [
						{ label: 'Images', value: 'images' }, { label: 'Videos', value: 'videos' },
						{ label: 'Docs', value: 'docs' }, { label: 'Links', value: 'links' }
					]" :key="value"
					:class="{ 'bg-primaryBg !text-primaryText': type === value, 'rounded-l-xl': idx === 0, 'rounded-r-xl': idx === 3 }"
					class="flex-grow p-2 border border-primaryBg text-primaryBg text-center cursor-pointer"
					@click="type = value">
					{{ label }}
				</a>
			</div>
			<form v-if="chats.length" @submit.prevent="search">
				<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
			</form>
		</div>
		<EmptyFiles v-if="!loading && !error && chats.length === 0" />
		<ImagesList v-if="type === 'images'" :media="images" />
		<VideosList v-if="type === 'videos'" :media="videos" />
		<DocsList v-if="type === 'docs'" :media="docs" />
		<LinksList v-if="type === 'links'" :media="links" />
		<BlockLoading v-if="loading" />
		<LoadMore v-if="hasMore && !searchMode" :load="fetchOlderChats" />
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ClassEntity } from '@modules/classes'
import { useGroupList } from '@app/composable/classes/groups'
import { useClassLibrary } from '@app/composable/classes/library'
import ImagesList from '@app/components/media/ImagesList.vue'
import VideosList from '@app/components/media/VideosList.vue'
import DocsList from '@app/components/media/DocsList.vue'
import LinksList from '@app/components/media/LinksList.vue'
import { groupBy } from '@utils/commons'
import { months } from '@utils/dates'

const props = defineProps({
	classInst: {
		type: ClassEntity,
		required: true
	}
})

const {
	loading, error, chats, groupId, type, hasMore, fetchOlderChats,
	searchValue, searchMode, search
} = useClassLibrary(props.classInst.id)
const { groups } = useGroupList(props.classInst.id)
const images = computed(() => groupBy(chats.value.filter((c) => c.isImage)
	.map((c) => ({ hash: c.hash, media: c.media!, path: c.saveFilePath, createdAt: c.createdAt })), (c) => {
	const date = new Date(c.createdAt)
	return `${months[date.getMonth()]} ${date.getFullYear()}`
}))
const videos = computed(() => groupBy(chats.value.filter((c) => c.isVideo)
	.map((c) => ({ hash: c.hash, media: c.media!, path: c.saveFilePath, createdAt: c.createdAt })), (c) => {
	const date = new Date(c.createdAt)
	return `${months[date.getMonth()]} ${date.getFullYear()}`
}))
const docs = computed(() => groupBy(chats.value.filter((c) => c.isDoc)
	.map((c) => ({ hash: c.hash, media: c.media!, path: c.saveFilePath, createdAt: c.createdAt })), (c) => {
	const date = new Date(c.createdAt)
	return `${months[date.getMonth()]} ${date.getFullYear()}`
}))
const links = computed(() => groupBy(chats.value.filter((c) => c.isDoc)
	.map((c) => ({ hash: c.hash, links: c.links, createdAt: c.createdAt })), (c) => {
	const date = new Date(c.createdAt)
	return `${months[date.getMonth()]} ${date.getFullYear()}`
}))
</script>
