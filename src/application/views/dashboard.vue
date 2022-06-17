<template>
	<DefaultLayout>
		<div>
			<div class="card-padding flex items-center border-bottom-line">
				<IonIcon :icon="linkOutline" />
				<IonText class="ml-3">Stranerd Connect</IonText>
			</div>
			<div class="card-padding flex items-center justify-between border-bottom-line">
				<IonText class="font-bold">Recent</IonText>
				<IonIcon :icon="chevronDownOutline" />
			</div>
			<div class="card-padding flex items-center justify-between border-bottom-line">
				<IonText class="font-bold">Direct messages</IonText>
				<IonIcon :icon="chevronDownOutline" />
			</div>
			<ClassesList :hideSearch="true" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import ClassesList from '@app/components/classes/classes/ClassesList.vue'
import { chevronDownOutline, linkOutline } from 'ionicons/icons'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'Dashboard',
	components: { ClassesList },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Home', {})
		return { linkOutline, chevronDownOutline }
	}
})
</script>
