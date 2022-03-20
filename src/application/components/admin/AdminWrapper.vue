<template>
	<Justified>
		<div>
			<div class="blueTop !mb-0 flex-col items-center">
				<div class="sm:flex hidden w-full justify-center items-center px-4 mt-auto">
					<ion-icon :icon="cogOutline" class="text-3xl text-main_dark"></ion-icon>
					<ion-text class="text-main_dark text-heading font-bold mx-4">
						Administration
					</ion-text>
					<ion-icon :icon="cogOutline" class="text-3xl text-main_dark"></ion-icon>
				</div>

				<div
					class="mb-0.5 justify-center lg:items-center flex flex-row lg:w-7/12 w-full lg:px-3 text-sub mx-auto text-faded_gray font-bold whitespace-normal overflow-x-auto mt-auto">
					<router-link :to="`/admin/users/admins`"
						class="py-2 lg:mr-12 mr-4 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						Admins
					</router-link>
					<router-link :to="`/admin/school/institutions`"
						class="py-2 lg:mr-12 mr-4 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						Institutions
					</router-link>
					<router-link :to="`/admin/study/preps`"
						class="py-2 lg:mr-12 mr-4 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						Preps
					</router-link>
					<router-link :to="`/admin/school/questions`"
						class="py-2 lg:mr-12 mr-4 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						Test Questions
					</router-link>
				</div>
			</div>
			<div class="p-4 lg:w-8/12 w-full mx-auto">
				<slot />
			</div>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { cogOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'AdminWrapper',
	components: { Justified },
	setup () {
		return { cogOutline }
	}
})
</script>
