<template>
	<div class="flex items-center gap-2 border border-disabled rounded-xl card-padding">
		<IonIcon :icon="cardOutline" />
		<IonText class="w-full">**** **** **** {{ method.data.last4Digits }}</IonText>
		<SpinLoading v-if="loading" />
		<template v-else>
			<IonIcon v-if="!method.primary" :icon="removeCircleOutline" class="text-danger" @click="deleteMethod" />
			<IonIcon :class="{'text-primaryBg': method.primary }"
				:icon="method.primary ? radioButtonOnOutline : radioButtonOffOutline"
				@click="makeMethodPrimary" />
		</template>
	</div>
</template>

<script lang="ts" setup>
import { cardOutline, radioButtonOffOutline, radioButtonOnOutline, removeCircleOutline } from 'ionicons/icons'
import { MethodEntity } from '@modules/payment'
import { useMethod } from '@app/composable/payment/methods'

const props = defineProps({
	method: {
		type: MethodEntity,
		required: true
	}
})

const { loading, error, message, makeMethodPrimary, deleteMethod } = useMethod(props.method)
</script>
