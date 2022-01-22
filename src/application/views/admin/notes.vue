<template>
	<AdminWrapper>
		<div class="mb-12 w-full">
			<div class="flex items-center justify-center md:justify-between flex-col md:flex-row w-full mb-8 p-0 m-0 bg-white border border-faded_gray rounded-xl gap-2">
			
				<div class="w-60 grid place-items-center">
					<ion-input class=" !m-0 !p-0  " placeholder="Input note link"/>
				</div>
				<div class="w-60 grid place-items-center">
					<ion-text class="text-main_dark font-bold ">OR</ion-text>
				</div>
				<div class="w-96 grid place-items-center">
					<ion-button class="btn-outline text-primary relative   z-50 !m-0 !p-0 mini border-primary">
						Upload a note
					</ion-button>
				</div>
				
				
				<ion-button class="btn-primary relative md:left-2 md:bottom-2 w-full mt-5 md:w-auto z-50 !m-0 !p-0">
					Add
				</ion-button>
			</div>


			<div v-for="(person) in 5" :key="person"
				class="flex items-center justify-between mt-4 bg-white rounded-xl font-bold lg:text-base text-xs text-main_dark py-4 px-6"
			>
				<div class="w-8/12 flex items-center gap-2">
					<ion-text>Figures of Speech</ion-text>
				</div>
				<div class="w-3/12 font-bold text-right text-delete_red cursor-pointer">
					<ion-text class="text-primary mr-8">Preview</ion-text>
					<ion-text class="text-delete_red ">Remove</ion-text>
				</div>
			</div>

		</div>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@root/application/components/admin/AdminWrapper.vue'


export default defineComponent({
	name: 'AdminNotesPage',
	displayName: 'Administration',
	components: {
		AdminWrapper,

	}
})
</script>


<style scoped>
ion-button{
    --padding-top: 1.7rem !important;
    --padding-bottom: 1.7rem !important;
        --padding-start: 2rem !important;
    --padding-end: 2rem !important;
} 

.mini{
  --padding-top: 0.5rem !important;
    --padding-bottom: 0.5rem !important;
    --border-color: #546DD3 !important;
}

ion-input{
       --padding-top: 1rem !important;
    --padding-bottom: 0.8rem !important;

}
</style>
