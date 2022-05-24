<template>
	<Justified>
		<div>
			<div class="bg-white md:px-4 lg:px-0">
				<div class="sm:flex hidden p-4 w-full justify-center items-center text-secondaryText gap-4">
					<ion-icon :icon="cogOutline" class="text-3xl" />
					<ion-text class="text-secondaryText text-heading font-bold">Administration</ion-text>
					<ion-icon :icon="cogOutline" class="text-3xl" />
				</div>
				<div class="w-full lg:w-8/12 mx-auto">
					<div class="nav-scroll">
						<router-link to="/admin/users/admins">Admins</router-link>
						<router-link to="/admin/school/institutions">Institutions</router-link>
						<router-link to="/admin/study/preps">Preps</router-link>
						<router-link to="/admin/school/questions">Test Questions</router-link>
					</div>
				</div>
			</div>
			<div class="py-4 md:px-4 lg:px-0 lg:w-8/12 w-full mx-auto">
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
