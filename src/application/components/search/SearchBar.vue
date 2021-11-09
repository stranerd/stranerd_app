<template>
	<div>
		<form class="gap-1 d-flex">
			<div class="search-container gap-0-25">
				<ion-searchbar
					v-model.trim="searchTerm"
					class="form-control"
					placeholder="Search for anything..."
					cancel-button-icon="never"
					clear-icon="undefined"
				></ion-searchbar>
			</div>
		</form>
		<div v-if="searchTerm" class="flex flex-col results p-6 gap-6 mt-6">
			<div v-if="questionsResult.length > 0">
				<h2 variant="2">
					Questions
				</h2>
				<div v-for="question in questionsResult" :key="question.hash">
					<router-link :to="`/questions/${question.id}`">
						<DynamicText :truncate="true" class="lead">
							{{ extractTextFromHTML(question.body) }}
						</DynamicText>
					</router-link>
				</div>
			</div>
			<div v-if="answersResult.length > 0">
				<h2 variant="2">
					Answers
				</h2>
				<div v-for="answer in answersResult" :key="answer.hash">,
					<router-link :to="`/questions/${answer.questionId}#${answer.id}`">
						<DynamicText class="lead d-block">
							{{ extractTextFromHTML(answer.title) }}
						</DynamicText>
						<DynamicText v-if="answer.body" :truncate="true">
							{{ extractTextFromHTML(answer.body) }}
						</DynamicText>
					</router-link>
				</div>
			</div>
			<div v-if="usersResult.length > 0">
				<h2 variant="2">
					Users
				</h2>
				<div v-for="user in usersResult" :key="user.hash">
					<router-link :to="`/profile/${user.id}#dashboard`" class="d-flex align-items-center gap-0-5">
						<Avatar :size="45" :src="user.avatar" />
						<DynamicText :truncate="true">
							{{ user.fullName }}
						</DynamicText>
					</router-link>
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
import { useSearch } from '@app/composable/meta/search'
import { extractTextFromHTML } from '@utils/commons'
import { IonSearchbar } from '@ionic/vue'
import Avatar from '../core/Avatar.vue'

export default defineComponent({
	name: 'SearchBar',
	components: { IonSearchbar, Avatar },
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
	ion-searchbar {
		--background: #F7F7FC;
		--box-shadow: none;
		--border-radius: .75rem;
		border-radius: .75rem;
		--icon-color: #8B9EB1;
		--color: #8B9EB1;
		min-width: 26vw;
		--padding-bottom: 4em;
		@media (max-width: 1024px) {
			min-width: 92vw;
		}

	}

	form {
		flex-grow: 1;

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
		max-width: 90vw;
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
