<template>
	<div>
		<Onboarding />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Onboarding from '@app/components/onboarding/Onboarding.vue'

export default defineComponent({
	name: 'IndexPage',
	components: { Onboarding },
	middlewares: ['isNotAuthenticated']
})
</script>
