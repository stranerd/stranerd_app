<template>
	<div
		class="flex flex-row items-center px-3 py-4 bg-light_gray border-b-[1px] border-faded_gray text-icon_inactive gap-3 normalText sticky w-full bottom-0 justify-between">
		<ion-icon :icon="addCircle" class=" text-[23px]"></ion-icon>
		<textarea v-model="factory.content"
			class="bg-light_gray leading-tight focus:outline-none resize-none flex-grow placeholder-icon_inactive"
			placeholder="Type your response here"></textarea>
		<div class="flex flex-row items-center gap-3">
			<template v-if="factory.content?.length == 0 || factory.content == undefined ">
				<ion-icon :icon="videocam" class=" text-[23px]"></ion-icon>
				<ion-icon :icon="camera" class=" text-[23px]"></ion-icon>
				<ion-icon :icon="mic" class=" text-[23px]"></ion-icon>
			</template>
			<span v-else
				class="md:h-10 h-8 w-8 cursor-pointer md:w-10 bg-primary rounded-full flex flex-row justify-center items-center"
				@click="createTextChat">
				<ion-icon :icon="send" class=" md:text-[20px] text-[16px] text-white"></ion-icon>
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IonIcon } from '@ionic/vue'
import { addCircle, camera, mic, send, videocam } from 'ionicons/icons'
import { useCreateChat } from '@app/composable/sessions/chats'
import { useMultipleFileInputs } from '@app/composable/core/forms'

export default defineComponent({
	props: {
		userId: {
			type: String,
			required: true
		},
		sessionId: {
			type: String as PropType<string | undefined>,
			required: true
		}
	},
	setup (props: any) {

		const {
			createMediaChat,
			createTextChat,
			error,
			loading,
			factory
		} = useCreateChat(props.userId, props.sessionId)
		const { catchMultipleFiles } = useMultipleFileInputs(createMediaChat)

		return {
			mic, videocam, camera, send, addCircle, factory, error, loading, createTextChat, catchMultipleFiles
		}
	},
	components: {
		IonIcon
	}
})
</script>
