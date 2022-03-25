<template>
	<div class="relative">
		<div v-if="showFileUpload" class="absolute top-0 flex flex-col gap-4 py-2" style="transform: translateY(-100%)">
			<FileInput :multiple="true" accept="image/*" @files="catchFiles">
				<div class="flex gap-2 items-center">
					<span class="rounded-full p-2 h-10 w-10 bg-new_gray">
						<IonIcon :icon="imageOutline" class="text-2xl" />
					</span>
					<IonText class="bg-new_gray py-1 px-4 rounded-full">Photos</IonText>
				</div>
			</FileInput>
			<FileInput :multiple="true" accept="*" @files="catchFiles">
				<div class="flex gap-2 items-center">
					<span class="rounded-full p-2 h-10 w-10 bg-new_gray">
						<IonIcon :icon="documentOutline" class="text-2xl" />
					</span>
					<IonText class="bg-new_gray py-1 px-4 rounded-full">Documents</IonText>
				</div>
			</FileInput>
			<FileInput :multiple="true" accept="video/*" @files="catchFiles">
				<div class="flex gap-2 items-center">
					<span class="rounded-full p-2 h-10 w-10 bg-new_gray">
						<IonIcon :icon="videocamOutline" class="text-2xl" />
					</span>
					<IonText class="bg-new_gray py-1 px-4 rounded-full">Videos</IonText>
				</div>
			</FileInput>
		</div>
		<div v-if="showFileCaption" class="chat-block">
			<div class="body">
				<div class="flex items-center">
					<IonIcon :icon="closeOutline" class="text-3xl" @click="showFileCaption = false" />
					<span v-if="fileData.length" class="text-red ml-auto" @click="remove">
						Remove File
					</span>
				</div>
				<div v-if="fileData[fileIndex]" class="content flex flex-col items-center justify-center gap-2">
					<img v-if="fileData[fileIndex].factory.media.type.includes('image')" :src="fileData[fileIndex].data"
						class="object-cover" />
					<video v-else-if="fileData[fileIndex].factory.media.type.includes('video')"
						:src="fileData[fileIndex].data" class="object-cover" controls />
					<IonIcon v-else :icon="documentOutline" class="text-8xl" />
				</div>
				<div v-if="fileData.length" class="flex gap-4 w-full items-center md:max-w-[80%] mx-auto">
					<IonIcon :icon="chevronBackOutline" class="text-4xl"
						@click="fileIndex === 0 ? fileIndex : fileIndex--" />
					<IonInput v-model="fileData[fileIndex].factory.content" class="border border-new_gray"
						placeholder="Add a caption" />
					<IonIcon :icon="chevronForwardOutline"
						class="text-4xl"
						@click="fileIndex === fileData.length - 1 ? fileIndex : fileIndex++" />
				</div>
				<div class="flex items-center gap-2 md:gap-4 overflow-x-auto mt-auto">
					<div v-for="(file, index) in fileData" :key="file.hash"
						class="rounded-xl flex items-center justify-center cursor-pointer w-12 h-12 md:w-24 md:h-24 border border-new_gray"
						@click="fileIndex = index">
						<img v-if="file.factory.media.type.includes('image')" :src="file.data" />
						<IonIcon v-else-if="file.factory.media.type.includes('video')" :icon="videocamOutline"
							class="text-4xl" />
						<IonIcon v-else :icon="documentOutline" class="text-4xl" />
					</div>
					<FileInput :multiple="true" accept="*" @files="catchMoreFiles">
						<div
							class="rounded-xl flex items-center justify-center cursor-pointer w-12 h-12 md:w-24 md:h-24 border border-new_gray">
							<IonIcon :icon="addOutline" class="text-4xl" />
						</div>
					</FileInput>
					<div class="ml-auto">
						<IonButton v-if="fileData.length" :disabled="loading" color="primary" shape="round" size="small"
							@click="uploadFiles">
							<IonIcon slot="icon-only" :icon="paperPlaneOutline" />
						</IonButton>
					</div>
				</div>
			</div>
		</div>
		<form class="flex items-center md:gap-2"
			@submit.prevent="createTextDiscussion">
			<IonIcon :icon="showFileUpload ? closeCircleOutline : addCircleOutline"
				class="text-3xl md:text-5xl" @click="showFileUpload = !showFileUpload" />
			<IonInput v-model="factory.content" class="flex-grow" placeholder="Send a message" required />
			<IonButton :disabled="!factory.valid || loading" color="primary" shape="round"
				size="small" type="submit">
				<IonIcon slot="icon-only" :icon="paperPlaneOutline" />
			</IonButton>
			<PageLoading v-if="loading" />
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useCreateDiscussion } from '@app/composable/classes/discussions'
import {
	addCircleOutline,
	addOutline,
	chevronBackOutline,
	chevronForwardOutline,
	closeCircleOutline,
	closeOutline,
	documentOutline,
	imageOutline,
	paperPlaneOutline,
	videocamOutline
} from 'ionicons/icons'
import { useFileInputCallback } from '@app/composable/core/forms'
import { DiscussionFactory } from '@modules/classes'
import { getRandomValue } from '@utils/commons'

export default defineComponent({
	name: 'DiscussionForm',
	props: {
		groupId: {
			required: true,
			type: String
		}
	},
	setup (props) {
		const showFileUpload = ref(false)
		const showFileCaption = ref(false)
		const fileIndex = ref(0)
		const {
			loading, error, factory, createTextDiscussion, createMediaDiscussion
		} = useCreateDiscussion(props.groupId)
		const fileData = ref([] as { data: string, factory: DiscussionFactory, hash: string }[])
		const catchFiles = useFileInputCallback(async (files) => {
			fileData.value = files.map((file) => {
				const factory = new DiscussionFactory()
				factory.media = file
				return { data: window.URL.createObjectURL(file.data), factory, hash: getRandomValue() }
			})
			fileIndex.value = 0
			showFileCaption.value = true
			showFileUpload.value = false
		})
		const catchMoreFiles = useFileInputCallback(async (files) => {
			fileData.value.push(...files.map((file) => {
				const factory = new DiscussionFactory()
				factory.media = file
				return { data: window.URL.createObjectURL(file.data), factory, hash: getRandomValue() }
			}))
		})
		const remove = () => {
			fileData.value.splice(fileIndex.value, 1)
			if (fileIndex.value !== 0) fileIndex.value--
		}
		const uploadFiles = async () => {
			await createMediaDiscussion(fileData.value.map((f) => f.factory) as DiscussionFactory[])
			showFileCaption.value = false
		}
		return {
			loading, error, factory, createTextDiscussion, uploadFiles,
			addCircleOutline, closeOutline, paperPlaneOutline, closeCircleOutline, imageOutline,
			documentOutline, videocamOutline, addOutline, chevronForwardOutline, chevronBackOutline,
			showFileUpload, catchFiles, catchMoreFiles, fileData, showFileCaption, fileIndex, remove
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-button {
		--padding-start: 0.4rem !important;
		--padding-end: 0.4rem !important;
		--padding-top: 0.4rem !important;
		--padding-bottom: 0.4rem !important;
		--border-radius: 10rem !important;
		border-radius: 10rem !important;
		@media (min-width: $md) {
			--padding-start: 0.6rem !important;
			--padding-end: 0.6rem !important;
			--padding-top: 0.6rem !important;
			--padding-bottom: 0.6rem !important;
		}
	}
</style>
