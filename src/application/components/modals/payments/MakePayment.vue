<template>
	<Modal :modal="$attrs.modal">
		<template slot="title">
			Make Purchase
		</template>
		<client-only>
			<PaymentsFlutterwave v-if="false && isAfrican" />
			<PaymentsStripe v-else />
		</client-only>
	</Modal>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'

export default defineComponent({
	name: 'MakePayment',
	setup () {
		const isAfrican = computed({
			get: () => useAuth().location.value?.continentCode === 'AF',
			set: () => {
			}
		})
		return { isAfrican }
	}
})
</script>
