<template>
	<div>
		<Onboarding v-if="!isWeb" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Onboarding from '@app/components/onboarding/Onboarding.vue'
import { usePlatform } from '@app/composable/core/states'

export default defineComponent({
	name: 'IndexPage',
	components: { Onboarding },
	middlewares: ['isNotAuthenticated'],
	setup () {
		const { isWeb } = usePlatform()
		return { isWeb }
	}
})
</script>
