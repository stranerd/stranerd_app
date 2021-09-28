<template>
	<div class="d-flex flex-column">
		<flutterwave-pay-button
			:amount="getLocalAmount(amount)"
			:callback="makePaymentCallback"
			:currency="getLocalCurrency()"
			:customer="{
				name: user && user.fullName,
				email: user && user.email
			}"
			:customizations="{
				title: 'Stranerd' ,
				description: '',
				logo : logo
			}"
			:meta="{
				consumer_id: user && user.id
			}"
			:onclose="closedPaymentModal"
			:tx_ref="getRandomValue()"
			class="btn btn-primary btn-lg mx-auto"
			payment_options="card,ussd"
			redirect_url=""
		>
			Click To Pay With Flutterwave
		</flutterwave-pay-button>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { getRandomValue } from '@utils/commons'
import { logo } from '@utils/environment'
import { useFlutterwavePayment } from '@app/hooks/payment/payment'

export default defineComponent({
	name: 'Flutterwave',
	setup () {
		const { user, getLocalCurrency, getLocalAmount } = useAuth()
		const { loading, error, amount, pay } = useFlutterwavePayment()
		const makePaymentCallback = async (response: any) => await pay(response.status === 'successful')
		const closedPaymentModal = () => 'closed'
		return {
			makePaymentCallback, closedPaymentModal, getRandomValue,
			user, logo, getLocalCurrency, getLocalAmount,
			amount, loading, error
		}
	}
})
</script>
