<template>
	<AdminWrapper>
		<div class="mb-12 w-full">
			<div>
				<div class="grid">
					<ion-text class="text-main_dark text-center mb-4 heading font-bold w-full">Create a test</ion-text>
				</div>

				<div class="flex flex-col md:flex-row gap-4 items-start w-full mb-8">
					<div class="md:w-1/4 w-full ">
						<ion-select v-model="questionIndex" class="bg-white border border-faded_gray md:mr-4 rounded-xl" interface="action-sheet"
							placeholder="Course">
							<ion-select-option v-for="num in 5" :key="num" :value="num - 1">
								{{ num }}
							</ion-select-option>
						</ion-select>
					</div>

					<div class="md:w-1/2 w-full mr-4">
						<ion-input class="bg-white border border-faded_gray mr-4" placeholder="Add years" />
					</div>
					<div class="md:w-1/4 w-full ">
						<ion-select v-model="questionIndex" class="bg-white border border-faded_gray md:mr-4 rounded-xl" interface="action-sheet"
							placeholder="Test mode">
							<ion-select-option v-for="num in 5" :key="num" :value="num - 1">
								{{ num }}
							</ion-select-option>
						</ion-select>
					</div>


					<ion-button class="btn-primary relative  w-full mt-5 md:w-auto z-50 !m-0 !p-0">
						Create
					</ion-button>
				</div>

			</div>


			<div>
				<div class="grid">
					<ion-text class="text-main_dark text-center mb-4 heading font-bold w-full">Tests</ion-text>
				</div>

				<div class="flex flex-col md:flex-row gap-4 items-center justify-center w-full mb-8">
					<div class="md:w-1/4 w-full ">
						<ion-select v-model="questionIndex" class="bg-white border border-faded_gray rounded-xl" interface="action-sheet"
							placeholder="Instituition">
							<ion-select-option v-for="num in 5" :key="num" :value="num - 1">
								{{ num }}
							</ion-select-option>
						</ion-select>
					</div>
					<div class="md:w-1/4 w-full ">
						<ion-select v-model="questionIndex" class="bg-white border border-faded_gray rounded-xl" interface="action-sheet"
							placeholder="Course">
							<ion-select-option v-for="num in 5" :key="num" :value="num - 1">
								{{ num }}
							</ion-select-option>
						</ion-select>
					</div>
					<div class="md:w-1/4 w-full ">
						<ion-select v-model="questionIndex" class="bg-white border border-faded_gray rounded-xl" interface="action-sheet"
							placeholder="Year">
							<ion-select-option v-for="num in 5" :key="num" :value="num - 1">
								{{ num }}
							</ion-select-option>
						</ion-select>
					</div>
					<div class="md:w-1/4 w-full ">
						<ion-select v-model="questionIndex" class="bg-white border border-faded_gray rounded-xl" interface="action-sheet"
							placeholder="Mode">
							<ion-select-option v-for="num in 5" :key="num" :value="num - 1">
								{{ num }}
							</ion-select-option>
						</ion-select>
					</div>

				</div>

			</div>


			<div v-for="(person) in 5" :key="person"
				class="flex items-center justify-between mt-4 bg-white rounded-xl font-bold lg:text-base text-xs text-main_dark py-4 px-6"
			>
				<div class="w-8/12 flex items-center gap-2">
					<ion-text>Mathematics</ion-text>
				</div>
				<div class="w-3/12 font-bold text-right text-delete_red cursor-pointer">
					<ion-text class="text-primary mr-8">Edit</ion-text>
					<ion-text class="text-delete_red ">Delete</ion-text>
				</div>
			</div>

		</div>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@root/application/components/admin/AdminWrapper.vue'
import { IonSelect, IonSelectOption } from '@ionic/vue'

export default defineComponent({
	name: 'AdminTestsPage',
	displayName: 'Administration',
	components: {
		AdminWrapper, IonSelect, IonSelectOption

	}
})
</script>


<style scoped>
	ion-button {
		--padding-top: 1.6rem !important;
		--padding-bottom: 1.6rem !important;
		--padding-start: 2rem !important;
		--padding-end: 2rem !important;
	}

	ion-input {
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
