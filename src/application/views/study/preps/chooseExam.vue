<template>
	<DashboardLayout>
		<div class="py-4 lg:py-8 md:px-4 lg:px-0">
		

			<div class="md:mt-4">
				<ExploreTestPrepsList  />
			</div>
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import ExploreTestPrepsList from '@root/application/components/study/testPreps/ExploreTestPrepsList.vue'

export default defineComponent({
	name: 'ChooseExam',
	displayName: 'Choose exam',
	components: { DashboardLayout, ExploreTestPrepsList },

})
</script>


