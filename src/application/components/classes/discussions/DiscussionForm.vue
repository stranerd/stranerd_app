<template>
	<div class="relative mt-2">
		<span v-if="loadingCounter" class="loading-counter">
			{{ loadingCounter }} {{ pluralize(loadingCounter, 'message', 'messages') }} sending
		</span>
		<div v-if="showFileUpload" class="absolute -top-4 flex flex-col gap-4 py-2 mb-2" style="transform: translateY(-100%)">
			<FileInput :multiple="true" accept="image/*" @files="catchFiles">
				<div class="flex gap-2 items-center">
					<span class="rounded-full p-2 h-8 w-8 bg-primaryBg text-primaryText flex justify-center items-center">
						<IonIcon :icon="imageOutline" class="text-heading" />
					</span>
					<IonText class="bg-itemBg py-1 px-4 rounded-full">Photos</IonText>
				</div>
			</FileInput>
			<FileInput :multiple="true" accept="*" @files="catchFiles">
				<div class="flex gap-2 items-center">
					<span class="rounded-full p-2 h-8 w-8 bg-primaryBg text-primaryText flex justify-center items-center">
						<IonIcon :icon="documentOutline" class="text-heading" />
					</span>
					<IonText class="bg-itemBg py-1 px-4 rounded-full">Documents</IonText>
				</div>
			</FileInput>
			<FileInput :multiple="true" accept="video/*" @files="catchFiles">
				<div class="flex gap-2 items-center">
					<span class="rounded-full p-2 h-8 w-8 bg-primaryBg text-primaryText flex justify-center items-center">
						<IonIcon :icon="videocamOutline" class="text-heading" />
					</span>
					<IonText class="bg-itemBg py-1 px-4 rounded-full">Videos</IonText>
				</div>
			</FileInput>
		</div>
		<div v-if="showFileCaption" class="chat-block">
			<div class="body">
				<div class="flex items-center">
					<IonIcon :icon="closeOutline" class="text-heading4" @click="showFileCaption = false" />
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
					<span>{{ fileData[fileIndex].factory.media.name }}</span>
				</div>
				<div v-if="fileData.length" class="flex gap-4 w-full items-center md:max-w-[80%] mx-auto">
					<IonIcon :icon="chevronBackOutline" class="text-heading5"
						@click="fileIndex === 0 ? fileIndex : fileIndex--" />
					<IonInput v-model="fileData[fileIndex].factory.content" class="border border-itbg-itemBg"
						placeholder="Add a caption" />
					<IonIcon :icon="chevronForwardOutline"
						class="text-heading5"
						@click="fileIndex === fileData.length - 1 ? fileIndex : fileIndex++" />
				</div>
				<div class="flex items-center gap-2 md:gap-4 overflow-x-auto mt-auto">
					<div v-for="(file, index) in fileData" :key="file.hash"
						class="rounded-xl flex items-center justify-center cursor-pointer w-12 h-12 md:w-24 md:h-24 border border-itbg-itemBg"
						@click="fileIndex = index">
						<img v-if="file.factory.media.type.includes('image')" :src="file.data" />
						<IonIcon v-else-if="file.factory.media.type.includes('video')" :icon="videocamOutline"
							class="text-heading5" />
						<IonIcon v-else :icon="documentOutline" class="text-heading5" />
					</div>
					<FileInput :multiple="true" accept="*" @files="catchMoreFiles">
						<div
							class="rounded-xl flex items-center justify-center cursor-pointer w-12 h-12 md:w-24 md:h-24 border border-itbg-itemBg">
							<IonIcon :icon="addOutline" class="text-heading5" />
						</div>
					</FileInput>
					<div class="ml-auto">
						<IonButton v-if="fileData.length" :disabled="loadingCounter" color="primary" shape="round"
							size="small"
							@click="uploadFiles">
							<IonIcon slot="icon-only" :icon="paperPlaneOutline" />
						</IonButton>
					</div>
				</div>
			</div>
		</div>
		<form class="flex items-center gap-2"
			@submit.prevent="createTextDiscussion">
			<IonIcon :icon="showFileUpload ? closeCircleOutline : addCircleOutline"
				class="text-heading3" @click="showFileUpload = !showFileUpload" />
			<IonInput v-model="factory.content" class="flex-grow rounded-full h-8" placeholder="Send a message" required />
			<IonButton :disabled="!factory.valid || loadingCounter"  class="btn-primary h-8 w-8 flex items-center justify-center"
				type="submit">
				<IonIcon slot="icon-only" :icon="paperPlaneOutline" />
			</IonButton>
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
import { getRandomValue, pluralize } from '@utils/commons'

export default defineComponent({
	name: 'DiscussionForm',
	props: {
		classId: {
			required: true,
			type: String
		},
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
			loadingCounter, error, factory, createTextDiscussion, createMediaDiscussion
		} = useCreateDiscussion(props.classId, props.groupId)
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
			showFileCaption.value = false
			await createMediaDiscussion(fileData.value.map((f) => f.factory) as DiscussionFactory[])
		}
		return {
			loadingCounter, error, factory, createTextDiscussion, uploadFiles, pluralize,
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

	.loading-counter {
		position: fixed;
		right: 1rem;
		top: 1rem;
		padding: 0.5rem 0.75rem;
		border-radius: 0.75rem;
		background: $color-white;
		border: 1px solid rgba($color-gray, 0.5);
	}
</style>
