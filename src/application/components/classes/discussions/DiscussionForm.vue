<template>
	<form class="flex items-center gap-2 md:gap-4" @submit.prevent="createTextDiscussion">
		<IonIcon :icon="cameraOutline" class="text-3xl md:text-5xl" />
		<IonIcon :icon="addCircleOutline" class="text-3xl md:text-5xl" />
		<IonInput v-model="factory.content" class="flex-grow" placeholder="Send a message" />
		<IonButton :disabled="!factory.valid || loading" color="primary" shape="round" size="small" type="submit">
			<IonIcon slot="icon-only" :icon="paperPlaneOutline" />
		</IonButton>
		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCreateDiscussion } from '@app/composable/classes/discussions'
import { addCircleOutline, cameraOutline, paperPlaneOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'DiscussionForm',
	props: {
		groupId: {
			required: true,
			type: String
		}
	},
	setup (props) {
		const {
			loading,
			error,
			factory,
			createTextDiscussion,
			createMediaDiscussion
		} = useCreateDiscussion(props.groupId)
		return {
			loading, error, factory, createTextDiscussion, createMediaDiscussion,
			cameraOutline, addCircleOutline, paperPlaneOutline
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-input {
		--padding-start: 0rem !important;
		--padding-end: 0rem !important;
		--padding-top: 0rem !important;
		--padding-bottom: 0rem !important;
	}

	ion-button {
		--padding-start: 0.5rem !important;
		--padding-end: 0.5rem !important;
		--padding-top: 0.25rem !important;
		--padding-bottom: 0.25rem !important;
		--border-radius: 10rem !important;
		border-radius: 10rem !important;
		@media (min-width: $md) {
			--padding-start: 0.75rem !important;
			--padding-end: 0.75rem !important;
			--padding-top: 0.5rem !important;
			--padding-bottom: 0.5rem !important;
		}
	}
</style>
