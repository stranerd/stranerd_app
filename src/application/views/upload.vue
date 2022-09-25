<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<form class="h-full w-full p-4 flex flex-col items-center justify-between text-sm">
			<div class=" w-full">
				<div class="flex flex-col w-full mb-4">
					<IonLabel class="text-secondaryText mb-2">File</IonLabel>
					<IonButton class="btn-outline-dashed text-primaryBg bg-bodyBg flex items-center justify-center w-full rounded ">
						<span class="flex items-center">
							<IonIcon :icon="documentOutline" class="mr-2" />
							<span class="normal-case">Tap to upload</span>
						</span>
					</IonButton >
				</div>

				<div class="flex flex-col w-full mb-4">
					<IonLabel class="text-secondaryText mb-2">Title <span class="font-normal">(Optional)</span></IonLabel>
					<IonInput :size="24" inputmode="text" placeholder="Rename your file" position="floating" type="text" />
				</div>
			</div>

			<IonButton class="w-full btn-primary" type="submit">
				<SpinLoading v-if="false" />
				<span v-else>Upload</span>
			</IonButton>
		</form>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { documentOutline } from 'ionicons/icons'


export default defineComponent({
	name: 'postPage',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Upload a file', { back: true })

		return { documentOutline }
	}
})
</script>
