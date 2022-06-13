<template>
	<JustifiedLayout :hideBottom="true">
		<div class="flex flex-col p-4">
			<span class="text-secondaryText font-bold mb-4">Mathematics</span>
			<IonText>In a class of 50 students, 40 students offered Physics and 30 offered Biology. How many offered both Physics and Biology?</IonText>
		</div>
		<form class="flex flex-col gap-4 h-screen overflow-hidden p-4" @submit.prevent="submit">
		
			<BaseEditor class="h-5/6" v-model:value="factory.body" :error="factory.errors.body" :valid="factory.isValid('body')"
				placeholder="Answer here" />

			<div v-if="factory.attachments.length > 0" class="flex flex-row flex-wrap gap-2">
				<span v-for="attachment in factory.attachments" :key="attachment.name">
					<span
						class="py-1 px-2 font-bold text-primaryText bg-primaryBg rounded flex flex-row items-center">
						{{ attachment.name }} <IonIcon :icon="closeOutline" class="ml-1 cursor-pointer"
							@click="factory.removeAttachment(attachment)" />
					</span>
				</span>
			</div>
			<DisplayError :error="factory.errors.attachments" />



			<div class="flex w-full items-center gap-6 md:p-0">
				<FileInput
					:multiple="true"
					accept="image/x-png,image/jpeg,image/jpg"
					class="w-1/2"
					@files="catchAttachments"
				>
					<IonButton class="btn-outline w-full h-8">
						<IonIcon :icon="imageOutline" class="!text-base text-primaryBg mr-4" />
						Add image
					</IonButton>
				</FileInput>
				<IonButton :disabled="loading || !factory.valid"
					class="w-1/2 btn-primary h-9"
					type="submit" >
					<IonIcon :icon="paperPlaneOutline" class="!text-base text-primaryText mr-4" />
					<slot name="buttonText">Submit</slot>
				</IonButton>
			</div>

			<PageLoading v-if="loading" />
		</form>
	</JustifiedLayout>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
import JustifiedLayout from '@app/layouts/Justified.vue'
import { useCreateQuestion } from '@app/composable/questions/questions'
import BaseEditor from '@app/components/core/editors/BaseEditor.vue'
import { closeOutline, imageOutline, paperPlaneOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'Question',
	components: { JustifiedLayout, QuestionForm, BaseEditor },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),

	setup () {
		const { factory, error, loading, createQuestion } = useCreateQuestion()
		return { factory, error, loading, createQuestion, closeOutline, imageOutline, paperPlaneOutline }
	}
})
</script>
