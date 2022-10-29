<template>
	<DefaultLayout>
		<div class="flex page-padding flex-col gap-8 opacity-75">
			<div class="flex flex-col gap-2">
				<IonText class="font-bold text-lg">Make your own classes</IonText>
				<IonText class="text-secondaryText">Bring students together to share sets, files and info</IonText>
				<span class="w-full mt-2" to="/classes/create">
					<IonButton class="btn-primary w-full" disabled>
						<div class="flex w-full items-center gap-4">
							<IonIcon :icon="peopleOutline" />
							<span class="flex-1 text-left">Create a class</span>
							<IonIcon :icon="arrowForwardOutline" />
						</div>
					</IonButton>
				</span>
			</div>
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-2">
					<IonText class="font-bold text-lg">Your classes</IonText>
					<IonText class="text-secondaryText">
						Classes you have created or joined
					</IonText>
				</div>
				<div class="card-sm card-padding text-center font-bold text-lg">Coming soon</div>
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import { arrowForwardOutline, peopleOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'Classes',
	setup () {
		useRouteMeta('Classes', {})
		return { arrowForwardOutline, peopleOutline }
	}
})
</script>
