<template>
	<DashboardLayout>
		<div>
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
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@root/application/layouts/Dashboard.vue'
import FindTutors from '@app/components/users/tutors/FindTutors.vue'

export default defineComponent({
	name: 'TutorsFind',
	components: { DashboardLayout, FindTutors }
})
</script>
