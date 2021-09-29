<template>
	<div>
		<form class="gap-1 d-flex px-1">
			<div class="search-container gap-0-25">
				<img alt="" class="sub-icons" src="@app/assets/images/icons/search.svg">
				<input
					v-model.trim="searchTerm"
					class="form-control"
					placeholder="Search for anything..."
				>
			</div>
		</form>
		<div v-if="searchTerm" class="d-flex flex-column results p-1-5 gap-1-5 mt-0-5">
			<div v-if="questionsResult.length > 0">
				<Heading variant="2">
					Questions
				</Heading>
				<div v-for="question in questionsResult" :key="question.hash">
					<NuxtLink :to="`/questions/${question.id}`">
						<DynamicText :truncate="true" class="lead">
							{{ extractTextFromHTML(question.body) }}
						</DynamicText>
					</NuxtLink>
				</div>
			</div>
			<div v-if="answersResult.length > 0">
				<Heading variant="2">
					Answers
				</Heading>
				<div v-for="answer in answersResult" :key="answer.hash">
					<NuxtLink :to="`/questions/${answer.questionId}#${answer.id}`">
						<DynamicText class="lead d-block">
							{{ extractTextFromHTML(answer.title) }}
						</DynamicText>
						<DynamicText v-if="answer.body" :truncate="true">
							{{ extractTextFromHTML(answer.body) }}
						</DynamicText>
					</NuxtLink>
				</div>
			</div>
			<div v-if="usersResult.length > 0">
				<Heading variant="2">
					Users
				</Heading>
				<div v-for="user in usersResult" :key="user.hash">
					<NuxtLink :to="`/users/${user.id}`" class="d-flex align-items-center gap-0-5">
						<Avatar :size="45" :src="user.avatar" />
						<DynamicText :truncate="true">
							{{ user.fullName }}
						</DynamicText>
					</NuxtLink>
				</div>
			</div>

			<span
				v-if="questionsResult.length === 0 && answersResult.length === 0 && usersResult.length === 0"
				class="lead"
			>
				No results found.
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSearch } from '@/application/hooks/meta/search'
import { extractTextFromHTML } from '@/utils/commons'

export default defineComponent({
	name: 'SearchBar',
	setup () {
		const { searchTerm, loading, error, questionsResult, answersResult, usersResult } = useSearch()
		return {
			searchTerm, loading, error,
			questionsResult, answersResult, usersResult,
			extractTextFromHTML
		}
	}
})
</script>

<style lang="scss" scoped>
	form {
		flex-grow: 1;
		border: 1px solid $color-line;
		background-color: $color-tags;
		border-radius: 40px;
		font-size: 14px;
		color: $color-sub;

		.search-container {
			display: flex;
			align-items: center;

			input.form-control {
				font-size: 1em;
				line-height: 1em;
				color: inherit;
				border: none;
				outline: none;
				box-shadow: none;
				min-height: unset;
				padding: 0.5em;
			}

			input.form-control:focus {
				color: inherit;
				box-shadow: none;
			}
		}
	}

	.results {
		position: absolute;
		border-radius: 0.75rem;
		background: $color-white;
		color: $color-dark;
		z-index: 3;
		white-space: normal;
		min-width: 250px;
		max-width: vw(90);
		box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
		right: 0.25rem;
		@media (min-width: 500px) {
			max-width: vw(75);
			right: unset;
		}
		@media (min-width: $lg) {
			max-width: vw(60);
		}

		& > * > * {
			border-bottom: 1px solid $color-line;
			padding: 0.5rem 0;
		}
	}
</style>
