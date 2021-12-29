<template>
	<HomeLayout v-if="true || isWeb">
		<Landing />
	</HomeLayout>
	<OnboardingLayout v-else>
		<Onboarding />
	</OnboardingLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Onboarding from '@app/components/onboarding/Onboarding.vue'
import OnboardingLayout from '@app/layouts/Onboarding.vue'
import HomeLayout from '@app/layouts/Home.vue'
import Landing from '@app/components/landing/Landing.vue'
import { usePlatform } from '@app/composable/core/states'

export default defineComponent({
	name: 'IndexPage',
	components: { Onboarding, OnboardingLayout, HomeLayout, Landing },
	middlewares: ['isNotAuthenticated'],
	setup () {
		const { isWeb } = usePlatform()
		return { isWeb }
	}
})
</script>
