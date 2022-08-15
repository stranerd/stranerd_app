<template>
	<PrepsWrapper>
		<div class="h-full flex flex-col">
			<EmptySearch />
		</div>
	</PrepsWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'
import PrepsWrapper from '@app/components/study/testPreps/PrepsWrapper.vue'

export default defineComponent({
	name: 'StudyPrepsSolutions',
	components: { PrepsWrapper },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Test preps', {})
	}
})
</script>
