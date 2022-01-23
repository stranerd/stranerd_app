<template>
	<AdminWrapper>
		<div class="mb-12 w-full">
			<div class="w-full">
				<ion-select v-model="questionIndex" interface="action-sheet" placeholder="Select test to add or edit questions" class="bg-white border border-faded_gray  rounded-xl">
					<ion-select-option v-for="num in 5" :key="num" :value="num - 1">
						{{ num }}
					</ion-select-option>
				</ion-select>
			</div>

			<div class="mt-8">
				<div class="grid">
					<ion-text class="text-main_dark text-center heading font-bold w-full">Add Question</ion-text>
				</div>
			
				<div class="flex flex-col gap-2 items-start w-full mb-8">
					<div class=" w-full ">
						<IonTextarea class="bg-white border border-faded_gray rounded-xl" rows="4" placeholder="Write your question here"/>
					</div>
					<div class=" w-full ">
						<IonTextarea class="bg-white border border-faded_gray rounded-xl" rows="4" placeholder="Write the answer here."/>
					</div>
				
				
			
				
					<ion-button class="btn-primary relative   w-full  z-50 !m-0 !p-0">
						Add
					</ion-button>
				</div>
			</div>

			<div class="mt-20">
				<div class="grid mb-4">
					<ion-text class="text-main_dark text-center heading font-bold w-full">Questions <span class="text-gray">(1)</span> </ion-text>
				</div>
			
				<div class=" gap-2 items-start w-full mb-8">
					<ion-reorder-group disabled="true">
						<ion-reorder v-for="(card, index) in 2" :key="index"
							class="flex flex-col bg-white px-6 py-4 rounded-xl mb-4">
							<div class="flex w-full items-center justify-between">
								<ion-text class="text-main_dark font-bold">{{ index + 1 }}</ion-text>
								<div class="flex" >
									<ion-icon
										:icon='pencil'
										class="text-gray text-2xl mr-4"
									/>
									<ion-icon
										:icon='trashBin'
										class="text-delete_red text-2xl"
									/>
								
									
								</div>
							</div>

							<div class="flex w-full gap-4 md:h-auto mt-6" @click="editCard(index)">
								<ion-text class="w-1/2">
									What will an air bubble in water act like?

								</ion-text>

								<div class="flex flex-col w-1/2 border-l pl-3 border-new_gray">
									<ion-text class="w-full">
										Concave lens
									</ion-text>
									<ion-text class="w-full">
										Concave lens
									</ion-text>
									<ion-text class="w-full">
										Concave lens
									</ion-text>
								</div>
							
								
							</div>
						</ion-reorder>
					</ion-reorder-group>
				</div>
			</div>

		</div>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@root/application/components/admin/AdminWrapper.vue'
import {  IonSelect, IonSelectOption, IonTextarea, 	IonReorder,
	IonReorderGroup, } from '@ionic/vue'
import { add, pencil, trashBin } from 'ionicons/icons'



export default defineComponent({
	name: 'AdminTestQuestionsPage',
	displayName: 'Administration',
	components: {
		AdminWrapper, IonSelect, IonSelectOption , IonTextarea,	IonReorder,
		IonReorderGroup,
	},

	setup(){
		return{
			add, pencil, trashBin 

		}
	}
})
</script>


<style scoped>
ion-button{
    --padding-top: 1.7rem !important;
    --padding-bottom: 1.7rem !important;
}

ion-input{
       --padding-top: 1rem !important;
    --padding-bottom: 0.8rem !important;
}
	ion-select {
		--background: #F7F7FC;
		--padding-start: 1rem;
		--padding-end: 1rem;
		--padding-top: 1rem;
		--padding-bottom: 0.8rem;
	}
</style>