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
import { computed, defineComponent } from 'vue'
import { useAuth } from '@/application/hooks/auth/auth'

export default defineComponent({
	name: 'MakePayment',
	setup () {
		const isAfrican = computed({
			get: () => useAuth().location.value?.continentCode === 'AF',
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			set: () => {
			}
		})
		return { isAfrican }
	}
})
</script>
