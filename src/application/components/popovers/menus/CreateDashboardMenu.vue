<template>
	<Popover>
		<router-link class="flex gap-2 items-center text-gray hover:text-secondaryText border-bottom-line card-padding"
			to="/study/flashCards/create">
			<div class="w-48 flex items-center gap-3">
				<IonIcon :icon="flashOutline" class="text-heading3" />
				<IonLabel class="font-bold">Create a flashcard</IonLabel>
			</div>
		</router-link>
		<router-link class="flex gap-2 items-center text-gray hover:text-secondaryText border-bottom-line card-padding"
			to="/study/documents/create">
			<div class="w-48 flex items-center gap-3">
				<IonIcon :icon="readerOutline" class="text-heading3" />
				<IonLabel class="font-bold">Upload a document</IonLabel>
			</div>
		</router-link>
		<router-link class="flex gap-2 items-center text-gray hover:text-secondaryText border-bottom-line card-padding"
			to="/study/sets/create">
			<div class="w-48 flex items-center gap-3">
				<IonIcon :icon="folderOutline" class="text-heading3" />
				<IonLabel class="font-bold">Create a study folder</IonLabel>
			</div>
		</router-link>
		<router-link class="flex gap-2 items-center text-gray hover:text-secondaryText border-bottom-line card-padding"
			to="/questions/create">
			<div class="w-48 flex items-center gap-3">
				<IonIcon :icon="helpCircleOutline" class="text-heading3" />
				<IonLabel class="font-bold">Ask a question</IonLabel>
			</div>
		</router-link>
		<router-link v-if="user?.isVerified"
			class="flex gap-2 items-center text-gray hover:text-secondaryText border-bottom-line card-padding"
			to="/classes/create">
			<div class="w-48 flex items-center gap-3">
				<IonIcon :icon="peopleOutline" class="text-heading3" />
				<IonLabel class="font-bold">Create a class</IonLabel>
			</div>
		</router-link>
	</Popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { flashOutline, folderOutline, helpCircleOutline, peopleOutline, readerOutline } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'CreateDashboardMenu',
	setup () {
		const { user } = useAuth()
		return {
			user, helpCircleOutline, folderOutline, flashOutline, peopleOutline, readerOutline
		}
	}
})
</script>
