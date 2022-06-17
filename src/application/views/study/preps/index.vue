<template>
	<DefaultLayout>
		<div>
			<router-link class="border-bottom-line p-4 flex items-center gap-4"
				to="/study/preps/start">
				<IonIcon :icon="addOutline" />
				<IonText>Take test/Study solutions</IonText>
			</router-link>

			<ContinueTests />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { addOutline } from 'ionicons/icons'
import ContinueTests from '@root/application/components/study/tests/ContinueTests.vue'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'StudyPreps',
	components: { ContinueTests },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Test preps')
		return { addOutline }
	}
})
</script>
