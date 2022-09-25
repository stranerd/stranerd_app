<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<!-- <span>make a post section</span> -->
		<form class="h-full w-full p-4 flex flex-col items-center justify-between text-sm">
			<div class=" w-full">
				<div class="flex flex-col w-full mb-4">
					<IonLabel class="text-secondaryText mb-2">Type</IonLabel>
					<IonSelect :size="24" interface="action-sheet" placeholder="Select post type">
						<IonSelectOption  value="level">
							Level 1
						</IonSelectOption>
					</IonSelect>
				</div>

				<div class="flex flex-col w-full mb-4">
					<IonLabel class="text-secondaryText mb-2">Title</IonLabel>
					<IonInput :size="24"
						inputmode="text" placeholder="Name the post" position="floating" type="text" />
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
import { documentOutline } from 'ionicons/icons'


export default defineComponent({
	name: 'postPage',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Make a post', { back: true })

		return { documentOutline }
	}
})
</script>
