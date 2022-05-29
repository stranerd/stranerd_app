<template>
	<HomeLayout v-if="isWeb">
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
import { isWeb } from '@utils/constants'
import { storage } from '@utils/storage'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'Index',
	displayName: 'Home',
	components: { Onboarding, OnboardingLayout, HomeLayout, Landing },
	beforeRouteEnter: generateMiddlewares(['isNotAuthenticated', async () => {
		if (isWeb) return
		const isOnboardingDone = await storage.get('onboarding-done')
		if (isOnboardingDone) return '/dashboard'
		else await storage.set('onboarding-done', true)
	}]),
	setup () {
		return { isWeb }
	}
})
</script>
