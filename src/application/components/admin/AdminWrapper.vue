<template>
	<Justified>
		<div>
			<div class="blueTop flex-col items-center">
				<div class="sm:flex hidden w-full justify-center items-center px-4 mt-auto">
					<ion-icon :icon="cog" class="text-3xl text-white"></ion-icon>
					<ion-text class="text-white heading font-bold mx-4">
						Administration
					</ion-text>
					<ion-icon :icon="cog" class="text-3xl text-white"></ion-icon>
				</div>

				<div
					class="mb-0.5 justify-center md:text-sm lg:text-base lg:items-center flex flex-row lg:w-7/12 w-full lg:px-3 text-xs mx-auto text-faded_gray font-bold whitespace-normal overflow-x-auto mt-auto">
					<router-link :to="`/admin/users/admins`"
						class="py-2 lg:mr-12 mr-4 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						Admins
					</router-link>
					<router-link :to="`/admin/subjects`"
						class="py-2 lg:mr-12 mr-4 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						Subjects
					</router-link>
					<router-link :to="`/admin/instituitions`"
						class="py-2 lg:mr-12 mr-4 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						Instituitions
					</router-link>
					<router-link :to="`/admin/tests`"
						class="py-2 lg:mr-12 mr-4 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						Tests
					</router-link>
					<router-link :to="`/admin/testQuestions`"
						class="py-2 lg:mr-12 mr-4 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						Test Questions
					</router-link>
					<router-link :to="`/admin/notes`"
						class="py-2 lg:mr-12 mr-4 cursor-pointer"
						exact-active-class="border-b-4 text-white border-white">
						Notes
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
import { cog } from 'ionicons/icons'

export default defineComponent({
	name: 'AdminWrapper',
	components: { Justified },
	setup () {
		return { cog }
	}
})
</script>
