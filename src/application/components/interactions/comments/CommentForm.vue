<template>
	<form class="flex gap-4 items-center" @submit.prevent="createComment">
		<IonInput v-model="factory.body" :placeholder="`Add a ${title}...`" class="flex-grow bg-bodyBg" />
		<IonButton :disabled="!factory.valid" class="btn-primary" type="submit">
			<IonIcon slot="icon-only" :icon="paperPlaneOutline" />
		</IonButton>
	</form>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { useCreateComment } from '@app/composable/interactions/comments'
import { InteractionEntities } from '@modules/interactions'
import { paperPlaneOutline } from 'ionicons/icons'

const props = defineProps({
	id: {
		type: String,
		required: true
	},
	type: {
		type: String as PropType<InteractionEntities>,
		required: true
	}
})

const { factory, loading, error, createComment } = useCreateComment(props.id, props.type)
const title = computed(() => props.type === InteractionEntities.comments ? 'reply' : 'comment')
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
