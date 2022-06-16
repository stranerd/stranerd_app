<template>
	<div class="relative">
		<span v-if="loadingCounter" class="loading-counter">
			{{ loadingCounter }} {{ pluralize(loadingCounter, 'message', 'messages') }} sending
		</span>
		<div v-if="showFileUpload" class="absolute flex flex-col gap-4 py-4"
			style="transform: translateY(calc(-100% - 1rem))">
			<FileInput v-for="{ icon, label, accept } in [
				{ icon: imageOutline, label: 'Photos', accept: 'image/*' },
				{ icon: documentOutline, label: 'Documents', accept: '*' },
				{ icon: videocamOutline, label: 'Videos', accept: 'video/*' },
			]" :key="label" :accept="accept" :multiple="true" @files="catchFiles">
				<div class="flex gap-2 items-center">
					<span
						class="rounded-full p-2 h-8 w-8 bg-primaryBg text-primaryText flex justify-center items-center">
						<IonIcon :icon="icon" class="text-heading" />
					</span>
					<IonText class="bg-itemBg text-secondaryText py-1 px-4 rounded-full">{{ label }}</IonText>
				</div>
			</FileInput>
		</div>
		<div v-if="showFileCaption" class="chat-block">
			<div class="body">
				<div class="flex items-center justify-between">
					<IonIcon :icon="closeOutline" class="text-heading3" @click="showFileCaption = false" />
					<IonIcon :icon="trashBinOutline" class="text-heading3 text-danger" @click="remove" />
				</div>
				<div class="content flex flex-col items-center justify-center gap-2">
					<img v-if="fileData[fileIndex].factory.media.type.includes('image')" :src="fileData[fileIndex].data"
						class="object-cover" />
					<video v-else-if="fileData[fileIndex].factory.media.type.includes('video')"
						:src="fileData[fileIndex].data" class="object-cover" controls />
					<IonIcon v-else :icon="documentOutline" class="text-8xl" />
					<span>{{ fileData[fileIndex].factory.media.name }}</span>
				</div>
				<div>
					<div class="mb-4">
						<IonInput v-model="fileData[fileIndex].factory.content" placeholder="Add a caption" />
					</div>
					<div class="flex items-center gap-2 overflow-x-auto text-secondaryText">
						<div v-for="(file, index) in fileData" :key="file.hash"
							class="rounded-xl flex cursor-pointer w-12 h-12 border border-itemBg"
							style="flex-shrink: 0;"
							@click="fileIndex = index">
							<img v-if="file.factory.media?.type.includes('image')" :src="file.data"
								class="h-full w-full" />
							<IonIcon v-else-if="file.factory.media?.type.includes('video')" :icon="videocamOutline"
								class="text-heading5" />
							<IonIcon v-else :icon="documentOutline" class="text-heading5" />
						</div>
						<FileInput :multiple="true" accept="*" @files="catchMoreFiles">
							<div
								class="rounded-xl flex items-center justify-center cursor-pointer w-12 h-12 border border-itemBg">
								<IonIcon :icon="addOutline" class="text-heading5" />
							</div>
						</FileInput>
						<IonButton :disabled="loadingCounter" class="btn-primary ml-auto" @click="uploadFiles">
							<IonIcon slot="icon-only" :icon="paperPlaneOutline" />
						</IonButton>
					</div>
				</div>
			</div>
		</div>
		<form class="flex items-center gap-2" @submit.prevent="createTextDiscussion">
			<IonIcon :icon="showFileUpload ? closeCircleOutline : addCircleOutline"
				class="text-heading3" @click="showFileUpload = !showFileUpload" />
			<IonInput v-model="factory.content" class="flex-grow rounded-full h-8" placeholder="Write here" required />
			<IonButton :disabled="!factory.valid || loadingCounter" class="btn-primary" type="submit">
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
	trashBinOutline,
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
			if (fileData.value.length === 1) showFileCaption.value = false
			fileData.value.splice(fileIndex.value, 1)
			if (fileIndex.value !== 0) fileIndex.value--
		}
		const uploadFiles = async () => {
			showFileCaption.value = false
			await createMediaDiscussion(fileData.value.map((f) => f.factory) as DiscussionFactory[])
		}
		return {
			loadingCounter, error, factory, createTextDiscussion, uploadFiles, pluralize,
			addCircleOutline, closeOutline, paperPlaneOutline, closeCircleOutline, trashBinOutline, imageOutline,
			documentOutline, videocamOutline, addOutline, chevronForwardOutline, chevronBackOutline,
			showFileUpload, catchFiles, catchMoreFiles, fileData, showFileCaption, fileIndex, remove
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-button {
		height: 32px;
		width: 32px;
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
		background: $color-bodyBg;
		border: 1px solid $color-itemBg;
	}
</style>
