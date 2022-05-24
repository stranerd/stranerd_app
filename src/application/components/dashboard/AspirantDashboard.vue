<template>
	<div v-if="user && user.isAspirant" class="flex flex-col gap-4 md:gap-6">
		<!-- <div class="flex gap-2 md:gap-4 font-bold px-4 md:px-0 overflow-x-auto">
			<div
				v-for="(t, index) in ['general', ...user.school.exams.map((e) => e.institutionId)]" :key="index"
				:class="{'!bg-primary !text-white !border-primary': tab === t}"
				class="flex items-center justify-center bg-white text-gray rounded-xl px-4 md:px-8 py-3 md:py-4 cursor-pointer border border-line capitalize"
				@click="tab = t">
				<span v-if="t.toLowerCase() === 'general'">{{ t }}</span>
				<Institution v-else :institutionId="t" />
			</div>
		</div> -->
		<GeneralDashboard v-if="tab.toLowerCase() === 'general'" />
		<ExamDetails v-else :key="tab" :exam="user.school.exams.find((e) => e.institutionId === tab)"
			class="border-bottom-line" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import GeneralDashboard from '@app/components/dashboard/GeneralDashboard.vue'
import ExamDetails from '@app/components/dashboard/ExamDetails.vue'
import Institution from '@app/components/school/institutions/Institution.vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'AspirantDashboard',
	components: { GeneralDashboard, Institution, ExamDetails },
	setup () {
		const { user } = useAuth()
		const tab = ref('general')
		return { user, tab }
	}
})
</script>
