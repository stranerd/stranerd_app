<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div class="flex flex-col lg:gap-4 flex-1">
			<div class="flex items-center justify-between text-sm">
				<span v-for="path in [
						{ name: 'Posts' },
						{ name: 'Files' },
						{ name: 'Assignments' },
						{ name: 'Attendance' },
					]" :key="path.name"
					:class="{ '!text-primaryBg !border-primaryBg': path.name === tab}"
					class="border-b-2 border-itemBg text-secondaryText p-3 capitalize w-full flex justify-center items-center gap-2"
					@click="tab = path.name">
					<span class="capitalize cursor-pointer">{{ path.name }}</span>
				</span>
			</div>
			<PostSection v-if="tab === 'Posts'" />
			<FileSection v-if="tab === 'Files'" />
			<AssignmentSection v-if="tab === 'Assignments'" />
			<AttendanceSection v-if="tab === 'Attendance'" />
		
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { useRoute } from 'vue-router'
import PostSection from '@app/components/teacher/post/index.vue'
import FileSection from '@app/components/teacher/file/index.vue'
import AssignmentSection from '@app/components/teacher/assignment/index.vue'
import AttendanceSection from '@app/components/teacher/attendance/index.vue'

export default defineComponent({
	name: 'CreateCourses',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	components:{PostSection, FileSection, AssignmentSection, AttendanceSection},
	setup () {
		useRouteMeta('MEG 511', { back: true })
		const route = useRoute()
		const { tab: t = '' } = route.query
		const tabValues = ['Posts', 'Files', 'Assignments', 'Attendance']
		const tab = ref(tabValues.includes(t as string) ? t as string : tabValues[0])
		

		return { tab }
	}
})
</script>
