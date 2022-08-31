<template>
	<div class="flex items-center gap-2 border border-disabled rounded-xl card-padding">
		<IonIcon :icon="cardOutline" />
		<IonText class="w-full">**** **** **** {{ card.last4Digits }}</IonText>
		<SpinLoading v-if="loading" />
		<template v-else>
			<IonIcon v-if="!card.primary" :icon="removeCircleOutline" class="text-danger" @click="deleteCard" />
			<IonIcon :class="{'text-primaryBg': card.primary }"
				:icon="card.primary ? radioButtonOnOutline : radioButtonOffOutline"
				@click="makeCardPrimary" />
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { cardOutline, radioButtonOffOutline, radioButtonOnOutline, removeCircleOutline } from 'ionicons/icons'
import { CardEntity } from '@modules/payment'
import { useCard } from '@app/composable/payment/cards'

export default defineComponent({
	name: 'CardsListCard',
	props: {
		card: {
			type: CardEntity,
			required: true
		}
	},
	setup (props) {
		const { loading, error, message, makeCardPrimary, deleteCard } = useCard(props.card)
		return {
			cardOutline, radioButtonOnOutline, radioButtonOffOutline, removeCircleOutline,
			makeCardPrimary, deleteCard, loading, error, message
		}
	}
})
</script>
