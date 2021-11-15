<template>
<<<<<<< HEAD
	<IonPage>
		<IonContent>
=======
	<DashboardLayout>
		<div>
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
			<div class="col-span-12 md:col-start-3 md:col-end-11">
				<div class="rounded-md flex flex-row items-center">
					<router-link active-class="activeSlideTab"
						class="w-1/2 text-center inactiveSlideTab"
						to="/tutors/explore">
						Explore Tutors
					</router-link>
					<router-link active-class="activeSlideTab"
						class="w-1/2 text-center inactiveSlideTab"
						to="/tutors/find">
						Find a Tutor
					</router-link>
				</div>
			</div>
			<FindTutors />
<<<<<<< HEAD
		</IonContent>
	</IonPage>
=======
		</div>
	</DashboardLayout>
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
</template>

<script lang="ts">
import { defineComponent } from 'vue'
<<<<<<< HEAD
import { IonContent, IonPage } from '@ionic/vue'
=======
import DashboardLayout from '@app/layouts/Dashboard.vue'
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
import FindTutors from '@app/components/users/tutors/FindTutors.vue'

export default defineComponent({
	name: 'TutorsFind',
<<<<<<< HEAD
	layout: 'dashboard',
	components: { IonPage, IonContent, FindTutors }
=======
	components: { DashboardLayout, FindTutors }
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
})
</script>
