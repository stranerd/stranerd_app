<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<form class="h-full w-full p-4 flex flex-col items-center justify-between text-sm">
			<div class=" w-full">
				<div class="flex flex-col w-full mb-4">
					<IonLabel class="text-secondaryText mb-2">Course</IonLabel>
					<IonInput :size="24"
						inputmode="email" placeholder="Enter course title" position="floating" type="email" />
				</div>

				<div class="flex flex-col w-full mb-4">
					<IonLabel class="text-secondaryText mb-2">Level</IonLabel>
					<IonSelect :size="24" interface="action-sheet" placeholder="Select level">
						<IonSelectOption  value="level">
							Level 1
						</IonSelectOption>
					</IonSelect>
				</div>
				
			</div>

			<IonButton class="w-full btn-primary" type="submit">
				<SpinLoading v-if="false" />
				<span v-else>Sign in</span>
			</IonButton>
		</form>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'


export default defineComponent({
	name: 'CreateCourses',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Create a Course', { back: true })

		return {  }
	}
})
</script>
