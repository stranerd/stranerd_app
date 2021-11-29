<template>
	<div class="col-span-12 flex flex-col px-3 normalText mb-14">
		<div class="flex flex-col gap-3 border-2 py-10 px-4 border-faded_gray rounded-lg">
			<div class="flex flex-col gap-2 text-icon_inactive pb-3 border-b-2 border-faded_gray">
				<h1 class="headings text-main_dark font-bold">About {{ user.id === id ? 'Me' : user.firstName }}</h1>
				<p class="leading-relaxed">
					{{ user.description }}
				</p>
			</div>

			<div class="flex flex-col gap-2 text-icon_inactive pb-3 border-b-2 border-faded_gray">
				<h1 class="headings text-main_dark font-bold">Level</h1>
				<p class="leading-relaxed">
					University - 1st year
				</p>
			</div>

			<div class="flex flex-col gap-2 text-icon_inactive pb-3 border-b-2 border-faded_gray">
				<h1 class="headings text-main_dark font-bold">School</h1>
				<p class="leading-relaxed">
					Northwestern University
				</p>
			</div>

			<div class="flex flex-col gap-2 text-icon_inactive pb-3 border-b-2 border-faded_gray">
				<h1 class="headings text-main_dark font-bold">Best Subject</h1>
				<Subject v-if="user.strongestSubject" :subject-id="user.strongestSubject" />
				<span v-else>N/A</span>
			</div>

			<div class="flex flex-col gap-2 text-icon_inactive pb-3 border-b-2 border-faded_gray">
				<h1 class="headings text-main_dark font-bold">Also Good In</h1>
				<div v-if="user.weakerSubjects.length > 0" class="d-flex flex-wrap gap-0-25">
					<span v-for="(subject, index) in user.weakerSubjects" :key="subject.id">
						<Subject :subject-id="subject" />
						<span v-if="index < user.weakerSubjects.length - 1">,&nbsp;</span>
					</span>
				</div>
				<span v-else>N/A</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import Subject from '@app/components/questions/subjects/Subject.vue'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'profileBio',
	components: { Subject },
	props: {
		user: {
			required: true,
			type: UserEntity
		}
	},
	setup () {
		const { id } = useAuth()
		return { id }
	}
})
</script>
