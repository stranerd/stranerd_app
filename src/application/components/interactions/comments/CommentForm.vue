<template>
	<form class="flex gap-4 card-padding items-center text-sm" @submit.prevent="createComment">
		<IonInput v-model="factory.body" class="flex-grow" placeholder="Add a comment" />
		<IonButton :disabled="!factory.valid" class="btn-primary" type="submit">
			<IonIcon slot="icon-only" :icon="paperPlaneOutline" />
		</IonButton>
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useCreateComment } from '@app/composable/interactions/comments'
import { InteractionEntities } from '@modules/interactions'
import { paperPlaneOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'CommentForm',
	props: {
		id: {
			type: String,
			required: true
		},
		type: {
			type: String as PropType<InteractionEntities>,
			required: true
		}
	},
	setup (props) {
		const { factory, loading, error, createComment } = useCreateComment(props.id, props.type)
		return { factory, loading, error, createComment, paperPlaneOutline }
	}
})
</script>

<style lang="scss" scoped>
	ion-input {
		border-radius: 10rem;
	}

	ion-button {
		height: 36px;
		width: 36px;
		--padding-start: 0.4rem !important;
		--padding-end: 0.4rem !important;
		--padding-top: 0.4rem !important;
		--padding-bottom: 0.4rem !important;
		--border-radius: 10rem !important;
		@media (min-width: $md) {
			--padding-start: 0.6rem !important;
			--padding-end: 0.6rem !important;
			--padding-top: 0.6rem !important;
			--padding-bottom: 0.6rem !important;
		}
	}
</style>
