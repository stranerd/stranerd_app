<template>
	<div class="grid grid-col-6 text-xs md:text-sm  col-span-12">
		<div class="col-span-6 grid grid-cols-6 py-2 ">

			<div class="col-span-6 grid grid-cols-12 md:px-2 px-3 place-items-center">
				<div class="py-1 px-2 px-md text-sm col-span-12 md:col-start-4 md:col-end-10 md:mb-3 text-icon_inactive md:min-w-[18.5rem] w-full  bg-light_gray rounded-md md:rounded-md flex flex- mt-2">
					<ion-select v-model="subjectId" class="w-full normalText  placeholder-[#8B9EB1] font-bold text-icon_inactive " placeholder="Filter by subject" interface="action-sheet">
						<ion-select-option :value="''" >All Subjects</ion-select-option>
						<ion-select-option :value="subject.id" v-for="(subject, index) in subjects" :key="index + 'subject'">{{ subject.name }}</ion-select-option>
					</ion-select>
				</div>
				
				<!-- <div class="py-1 pr-3 mx-20 mt-3 text-sm col-span-12 md:col-start-4 md:col-end-10 md:mb-3  min-w-[10.125rem]  bg-light_gray rounded-md md:rounded-md flex flex-row">
					<ion-select value="notifications" class="w-full normalText  placeholder-[#8B9EB1] font-bold" placeholder="Level" interface="action-sheet">
						<ion-select-option value="100" >100</ion-select-option>
						<ion-select-option value="200" >200</ion-select-option>
						<ion-select-option value="300" >300</ion-select-option>
						<ion-select-option value="400"  >400</ion-select-option>
						<ion-select-option value="500" >500</ion-select-option>
					</ion-select>
				</div> -->

	
			</div>

			<div class="mt-3 md:mt-5 col-span-6 grid grid-cols-12  px-3 gap-4 justify-evenly">
				<template v-if="tutors.length == 0">
					<div class="col-span-12 " >
						<empty-state :info="'No tutors found!'" 
						></empty-state>
					</div>					
				</template>
				<template v-else>
					<div class="col-span-6 md:col-span-4 lg:col-span-3" v-for="(tutor, index) in tutors" :key="index">
						<tutor-card class="bg-light_gray flex " :tutor="tutor" :showButton="true" />
					</div>
				</template>
				
			</div>
		</div>

	</div>

</template>
<script lang="ts">
import { IonSelect, IonSelectOption, } from '@ionic/vue'
import {  defineAsyncComponent, defineComponent } from 'vue'

import 'swiper/swiper-bundle.min.css'
import TutorCard from './TutorCard.vue'
import { useTutorsList } from '@/application/composable/users/roles/tutors'
import { useSubjectList } from '@/application/composable/questions/subjects'
const EmptyState = defineAsyncComponent(() => import('@/application/components/core/emptyState.vue'))

export default defineComponent({
	components: { IonSelect, IonSelectOption,   TutorCard, EmptyState },
	setup() {

		const { subjects } = useSubjectList()

		const { subjectId, filteredTutors: tutors, listener, loading, error } = useTutorsList()

		return { tutors, subjects, subjectId }
	}
})
</script>
<style scoped>
.customShadow {
	 box-shadow: 0 2px 6px rgb(0 0 0 / 0.2);
}
ion-select {
 
  /* Set a different placeholder color */
  --placeholder-color: #8B9EB1;
  /* Set full opacity on the placeholder */
  --placeholder-opacity: 1;
}
</style>
