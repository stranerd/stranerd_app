<template>
	<div class="flex items-center gap-2">
		<IonIcon :icon="cardOutline" />
		<IonText class="w-full">**** **** **** {{ card.last4Digits }}</IonText>
		<SpinLoading v-if="loading" />
		<IonIcon v-else :class="{'text-primaryBg': card.primary }"
			:icon="card.primary ? radioButtonOnOutline : radioButtonOffOutline" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { cardOutline, radioButtonOffOutline, radioButtonOnOutline } from 'ionicons/icons'
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
		const { loading, error, message, makeCardPrimary } = useCard(props.card)
		return {
			cardOutline, radioButtonOnOutline, radioButtonOffOutline,
			makeCardPrimary, loading, error, message
		}
	}
})
</script>
