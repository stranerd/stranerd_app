<template>
	<PrepsWrapper>
		<ContinueTests class="h-full p-4 lg:p-0" />
	</PrepsWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'
import PrepsWrapper from '@app/components/study/testPreps/PrepsWrapper.vue'
import ContinueTests from '@app/components/study/tests/ContinueTests.vue'

export default defineComponent({
	name: 'StudyPreps',
	components: { PrepsWrapper, ContinueTests },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Test preps', {})
	}
})
</script>
