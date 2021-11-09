<template>
	<form class="px-2" @submit.prevent="submit">
		<div v-if="!disabled.body" class="mt-3 border border-faded_gray rounded-lg py-5 px-1">
			<IonTextarea v-model="factory.body" class="bg-white border-0 focus:outline-none w-full"
				placeholder="Write your question here and make sure it is explained in full detail."
				rows="9" />
		</div>

		<div v-if="!disabled.attachments"
			class="mt-3 rounded-lg py-5 px-1 text-icon_inactive relative bg-light_gray flex flex-col justify-center items-center">
			<IonIcon :icon="image" class="text-[32px]" />
			<input
				id="images" accept="image/x-png,image/jpeg,image/jpg"
				class="cursor-pointer w-full h-full absolute"
				multiple
				name="images"
				style="opacity:0; overflow:hidden; position:absolute;"
				type="file"
				@change="catchAttachments" />
			<p class="mt-3">
				Add images to help with your question <b>(Optional)</b>
			</p>
			<div v-if="factory.attachments.length > 0" class="py-2 flex flex-row flex-wrap gap-x-2">
				<span v-for="attachment in factory.attachments" :key="attachment.name">
					<span
						class="py-1 px-2 font-bold text-white bg-faded_gray rounded-lg flex flex-row items-center">
						{{ attachment.name }}  <IonIcon :icon="close" class="ml-1 cursor-pointer"
							@click="factory.removeAttachment(attachment)" />
					</span>
				</span>
			</div>
		</div>

		<div v-if="!disabled.subjectId" class="mt-3 py-1 px-2 bg-light_gray rounded-lg flex">
			<SelectSubject v-model:subject-id="factory.subjectId" :show-all="false" />
		</div>

		<div v-if="!disabled.tags" class="py-2 pl-6 mt-3 bg-light_gray rounded-lg flex flex-col">
			<IonInput v-model="tag" class="w-full font-medium" placeholder="Add related tags">
			</IonInput>
			<div v-if="factory.tags.length > 0" class="py-2 flex flex-row flex-wrap gap-x-2">
				<span v-for="tag in factory.tags" :key="tag">
					<span
						class="py-1 px-2 font-bold text-white bg-faded_gray rounded-lg flex flex-row items-center">
						{{ tag }}  <ion-icon :icon="close" class="ml-1 cursor-pointer" @click="removeTag(tag)" />
					</span>
				</span>
			</div>
		</div>

		<div v-if="!disabled.coins" class="py-1 px-2 mt-3 bg-light_gray rounded-lg">
			<IonSelect v-model="factory.coins" class="w-full  font-medium"
				interface="action-sheet" placeholder="Set a reward for Best Answers">
				<IonSelectOption v-for="coin in coins" :key="coin" :value="coin">
					{{ coin }} Bronze Coins
				</IonSelectOption>
			</IonSelect>
		</div>

		<div class="flex mt-7 text-white">
			<div class="w-1/2 flex justify-center items-center">
				<button class=" px-6 py-3 relative ion-activatable rounded-lg  font-bold bg-dark_gray ">
					Cancel
					<IonRippleEffect class="rounded-lg" />
				</button>
			</div>
			<div class="w-1/2 flex flex-row justify-center items-center">
				<button :disabled="loading || !factory.valid"
					class=" px-6 relative ion-activatable font-bold py-3 rounded-lg bg-primary" type="submit">
					<slot name="buttonText">
						Submit
					</slot>
					<IonRippleEffect class="rounded-lg" />
				</button>
			</div>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IonIcon, IonInput, IonRippleEffect, IonSelect, IonSelectOption, IonTextarea } from '@ionic/vue'
import { close, image } from 'ionicons/icons'
import { useMultipleFileInputs, useTags } from '@app/composable/core/forms'
import { QuestionFactory } from '@modules/questions'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'
import { useAccountModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'QuestionForm',
	components: {
		IonTextarea,
		IonIcon,
		IonSelect,
		IonSelectOption,
		IonInput,
		IonRippleEffect,
		SelectSubject
	},
	props: {
		factory: {
			type: Object as PropType<QuestionFactory>,
			required: true
		},
		coins: {
			type: Array,
			required: true
		},
		submit: {
			type: Function,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		error: {
			type: String,
			required: true
		},
		disabled: {
			type: Object,
			required: false,
			default: () => ({})
		}
	},
	setup (props) {
		const { openBuyCoins } = useAccountModal()

		const { tag, removeTag } = useTags(
			(tag: string) => props.factory.addTag(tag),
			(tag: string) => props.factory.removeTag(tag)
		)

		const { catchMultipleFiles: catchAttachments } = useMultipleFileInputs(
			(files: File[]) => files.map(props.factory.addAttachment)
		)

		return {
			image, close,
			tag, removeTag, catchAttachments,
			openBuyCoins
		}
	}
})
</script>

<style scoped>
	ion-select {
		--placeholder-color: #8B9EB1;
		--placeholder-opacity: 1;
	}

	ion-input {
		--placeholder-color: #8B9EB1;
		--placeholder-opacity: 1;
	}

	ion-icon {
		font-size: 22px;
	}
</style>
