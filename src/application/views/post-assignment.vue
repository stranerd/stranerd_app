<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<form class="h-full w-full p-4 flex flex-col items-center justify-between text-sm">
			<div class=" w-full">
				<div class="flex flex-col w-full mb-4">
					<IonLabel class="text-secondaryText mb-2">Title</IonLabel>
					<IonInput :size="24"
						inputmode="text" placeholder="Name the assignment" position="floating" type="text" />
				</div>

				<div class="flex flex-col w-full mb-4">
					<IonLabel class="text-secondaryText mb-2">Description</IonLabel>
					<IonTextarea placeholder="Write here"/>
				</div>

				<div class="flex flex-col w-full mb-4">
					<IonLabel class="text-secondaryText mb-2">Attachment <span class="font-normal">(Optional)</span></IonLabel>
					<IonButton class="btn-outline-dashed text-primaryBg bg-bodyBg flex items-center justify-center w-full rounded ">
						<span class="flex items-center">
							<IonIcon :icon="documentOutline" class="mr-2" />
							<span class="normal-case">Upload file(s)</span>
						</span>
					</IonButton >
				</div>

				<span class="border my-4 w-full block"></span>

				<div class="flex flex-col w-full mb-4">
					<IonLabel class="text-secondaryText mb-2">Deadline <span class="font-normal">(Optional)</span></IonLabel>
					<div class="flex items-center justify-between gap-3">
						<div class="flex flex-col w-full mt-4">
							<IonLabel class="text-secondaryText mb-2">Date</IonLabel>
							<div class="w-full h-fit relative">
								<IonInput :size="24" inputmode="text" placeholder="DD/MM/YY" position="floating" type="text" />
								<IonIcon :icon="calendarClearOutline" class="absolute top-1/2 right-3 -translate-y-1/2 text-secondaryText"/>
							</div>
						</div>
						<div class="flex flex-col w-full mt-4">
							<IonLabel class="text-secondaryText mb-2">Time</IonLabel>
							<div class="w-full h-fit relative">
								<IonInput :size="24" inputmode="text" placeholder="00:00" position="floating" type="text" />
								<IonIcon :icon="timeOutline" class="absolute top-1/2 right-3 -translate-y-1/2 text-secondaryText"/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<IonButton class="w-full btn-primary" type="submit">
				<SpinLoading v-if="false" />
				<span v-else>Add</span>
			</IonButton>
		</form>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { documentOutline, calendarClearOutline, timeOutline } from 'ionicons/icons'


export default defineComponent({
	name: 'postPage',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Post an assignment', { back: true })

		return { documentOutline, calendarClearOutline, timeOutline }
	}
})
</script>
