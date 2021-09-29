<template>
	<div>
		<div class="flex flex-col align-items-center">
			<h1 class="text-primaryDark font-bold fs-32">
				Access expert tutors in any subject
			</h1>
			<span class="text-sub text-center sub">
				Request a tutorial chat session for your academic needs. <br>
				All tutors have been vetted by us and meet professional standards.
			</span>
			<SelectSubject v-model:subject-id="subjectId" :has-icon="true" class="select mt-1 mt-md-2 mb-2 mb-md-4" />
		</div>
		<TutorsListCard v-for="tutor in tutors" :key="tutor.hash" :tutor="tutor" />
		<DisplayWarning v-if="!loading && !error && tutors.length === 0" message="No nerds found." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { useTutorsList } from '@/application/hooks/users/roles/tutors'
import TutorsListCard from '@app/components/users/tutors/TutorsListCard.vue'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'

export default defineComponent({
	name: 'TutorsList',
	components: { TutorsListCard, SelectSubject },
	setup () {
		const { subjectId, filteredTutors: tutors, listener, loading, error } = useTutorsList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { subjectId, tutors, loading, error }
	}
})
</script>

<style lang="scss" scoped>
	.sub {
		font-size: 1.125rem;
		max-width: 35rem;
	}

	.fs-32 {
		font-size: 2rem;
	}

	.select {
		flex-grow: 1;
		color: $color-sub;
		box-sizing: border-box;
		max-width: 400px;
		margin: 0 auto;
		border-radius: 12px;
		box-shadow: -5px 5px 15px rgba($color-primary, 0.1);
		border: 1px solid $color-line;
		background-color: $color-white;
		padding-right: 0.5rem;
	}

	h1 {
		color: $color-dark;
		text-align: center;
		margin: 0;
		font-size: 18px;
		line-height: 1.35em;
		@media (min-width: $md) {
			max-width: 80%;
			font-size: 1.5rem;
		}
	}
</style>
