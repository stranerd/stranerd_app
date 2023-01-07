<template>
	<div class="relative">
		<span v-if="loadingCounter" class="loading-counter">
			{{ loadingCounter }} {{ pluralize(loadingCounter, 'message', 'messages') }} sending
		</span>
		<div v-if="showFileUpload" class="absolute flex flex-col gap-4 py-4"
			style="transform: translateY(calc(-100% - 1rem))">
			<FileInput v-for="{ icon, label, accept } in [
				{ icon: imageOutline, label: 'Photos', accept: 'image/*' },
				{ icon: videocamOutline, label: 'Videos', accept: 'video/*' },
				{ icon: documentOutline, label: 'Documents', accept: '*' },
			]" :key="label" :accept="accept" :multiple="true" @files="catchFiles">
				<div class="flex gap-2 items-center">
					<span
						class="rounded-full p-2 h-8 w-8 bg-primaryBg text-primaryText flex justify-center items-center">
						<IonIcon :icon="icon" />
					</span>
					<IonText class="bg-itemBg text-secondaryText py-1 px-4 rounded-full">{{ label }}</IonText>
				</div>
			</FileInput>
		</div>
		<div v-if="showFileCaption" class="chat-block">
			<div class="body">
				<div class="flex items-center justify-between">
					<IonIcon :icon="closeOutline" @click="showFileCaption = false" />
					<IonIcon :icon="trashBinOutline" class="text-danger" @click="remove" />
				</div>
				<div class="content flex flex-col items-center justify-center gap-2">
					<img v-if="fileData[fileIndex].factory.media?.type.includes('image')"
						:src="fileData[fileIndex].data"
						class="object-cover" />
					<video v-else-if="fileData[fileIndex].factory.media?.type.includes('video')"
						:src="fileData[fileIndex].data" class="object-cover" controls />
					<IonIcon v-else :icon="documentOutline" class="text-4xl" />
					<span>{{ fileData[fileIndex].factory.media?.name }}</span>
				</div>
				<div>
					<div class="mb-4">
						<IonInput v-model="fileData[fileIndex].factory.body" placeholder="Add a caption" />
					</div>
					<div class="flex items-center gap-2 overflow-x-auto text-secondaryText">
						<div v-for="(file, index) in fileData" :key="file.hash"
							class="rounded-xl flex cursor-pointer justify-center items-center w-12 h-12 border border-itemBg text-2xl"
							style="flex-shrink: 0;"
							@click="fileIndex = index">
							<img v-if="file.factory.media?.type.includes('image')" :src="file.data"
								class="h-full w-full" />
							<IonIcon v-else-if="file.factory.media?.type.includes('video')" :icon="videocamOutline" />
							<IonIcon v-else :icon="documentOutline" />
						</div>
						<FileInput :multiple="true" accept="*" @files="catchMoreFiles">
							<div
								class="rounded-xl flex items-center justify-center cursor-pointer w-12 h-12 border border-itemBg">
								<IonIcon :icon="addOutline" />
							</div>
						</FileInput>
						<IonButton :disabled="loadingCounter" class="btn-primary ml-auto" @click="uploadFiles">
							<IonIcon slot="icon-only" :icon="paperPlaneOutline" />
						</IonButton>
					</div>
				</div>
			</div>
		</div>
		<form class="flex items-center gap-2" @submit.prevent="createTextChat">
			<IonIcon :icon="showFileUpload ? closeCircleOutline : addCircleOutline" class="text-2xl"
				@click="showFileUpload = !showFileUpload" />
			<IonInput v-model="factory.body" :placeholder="`Message ${name}`" class="flex-grow rounded-full" required />
			<IonButton :disabled="!factory.valid || loadingCounter" class="btn-primary" type="submit">
				<IonIcon slot="icon-only" :icon="paperPlaneOutline" />
			</IonButton>
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
import { pluralize } from '@utils/commons'
import { getRandomValue } from '@stranerd/validate'
import { ChatFactory } from '@modules/messaging'
import { useCreateChat } from '@app/composable/messaging/chats'

export default defineComponent({
	name: 'ChatForm',
	props: {
		to: {
			required: true,
			type: String
		},
		name: {
			required: true,
			type: String
		}
	},
	setup (props) {
		const showFileUpload = ref(false)
		const showFileCaption = ref(false)
		const fileIndex = ref(0)
		const {
			loadingCounter, error, factory, createTextChat, createMediaChat
		} = useCreateChat(props.to)
		const fileData = ref([] as { data: string, factory: ChatFactory, hash: string }[])
		const catchFiles = useFileInputCallback(async (files) => {
			fileData.value = files.map((file) => {
				const factory = new ChatFactory()
				factory.media = file
				return { data: window.URL.createObjectURL(file.data), factory, hash: getRandomValue() }
			})
			fileIndex.value = 0
			showFileCaption.value = true
			showFileUpload.value = false
		})
		const catchMoreFiles = useFileInputCallback(async (files) => {
			fileData.value.push(...files.map((file) => {
				const factory = new ChatFactory()
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
			await createMediaChat(fileData.value.map((f) => f.factory) as ChatFactory[])
		}
		return {
			loadingCounter, error, factory, createTextChat, uploadFiles, pluralize,
			addCircleOutline, closeOutline, paperPlaneOutline, closeCircleOutline, trashBinOutline, imageOutline,
			documentOutline, videocamOutline, addOutline, chevronForwardOutline, chevronBackOutline,
			showFileUpload, catchFiles, catchMoreFiles, fileData, showFileCaption, fileIndex, remove
		}
	}
})
</script>

<style lang="scss" scoped>
ion-button {
	height: 36px;
	width: 36px;
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

.chat-block {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 10;
	background: $color-bodyBg;

	.body {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		& > * {
			padding: 1rem;
		}

		.content {
			flex-grow: 1;
			border-top: $border;
			border-bottom: $border;
			overflow-y: auto;
			padding: 0.25rem 1rem;

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
}

</style>
