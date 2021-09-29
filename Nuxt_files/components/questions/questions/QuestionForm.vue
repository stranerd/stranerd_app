<template>
	<form @submit.prevent="submit">
		<div class="form-group">
			<BodyText class="title" variant="large">
				Body
			</BodyText>
			<BodyText class="sub-title" variant="normal">
				Explain your question in full detail
			</BodyText>
			<QuestionEditor :error="factory.errors.body" v-model:model="factory.body" :valid="factory.isValid('body')" />
		</div>

		<div class="form-group">
			<BodyText class="title" variant="large">
				Subject
			</BodyText>
			<BodyText class="sub-title" variant="normal">
				Select the subject of the question you asked
			</BodyText>
			<SelectSubject
				:show-all="false"
				v-model:subject-id="factory.subjectId"
				class="border border-line p-0-25 rounded-3"
				style="min-height: 3rem;"
			/>
			<DynamicText v-if="factory.errors.subjectId" class="text-danger small">
				{{ factory.errors.subjectId }}
			</DynamicText>
		</div>

		<div class="form-group">
			<BodyText class="title" variant="large">
				Tags
			</BodyText>
			<BodyText class="sub-title" variant="normal">
				Add up to 3 tags to describe your question
			</BodyText>
			<input
				v-model="tag"
				class="form-control"
				placeholder="Example: Algebra, quadratic-equation, linear-equation"
				type="text"
			>
			<p class="my-0-5 d-flex gap-0-5 flex-wrap">
				<span
					v-for="qTag in factory.tags"
					:key="qTag"
					class="p-0-5 d-flex gap-0-5 cursor-pointer btn-dark rounded-3"
					@click="removeTag(qTag)"
				>
					<DynamicText class="text-white">
						{{ qTag }}
					</DynamicText>
					<span class="text-danger">&times;</span>
				</span>
			</p>
			<DynamicText v-if="factory.errors.tags" class="text-danger small">
				{{ factory.errors.tags }}
			</DynamicText>
		</div>

		<div class="form-group">
			<BodyText class="title" variant="large">
				Reward
			</BodyText>
			<BodyText class="sub-title" variant="normal">
				Choose how much bronze coins to give the Nerd with the best answer. Consider the question's difficulty
			</BodyText>
			<select v-model="factory.coins" class="form-select">
				<option disabled value="0">
					Bronze Coins Quotas
				</option>
				<option v-for="coin in coins" :key="coin" :value="coin">
					{{ coin }}
				</option>
			</select>
			<DynamicText v-if="factory.errors.coins" class="text-danger small mt-0-5">
				{{ factory.errors.coins }}
			</DynamicText>
			<div class="text-end mt-0-5">
				<span>Out of coins?&nbsp;</span>
				<a class="fw-bold text-decoration-underline" @click="openBuyCoins">Buy more coins</a>
			</div>
		</div>

		<button :disabled="loading || !factory.valid" class="btn btn-primary px-2 py-1" type="submit">
			<slot name="buttonText">
				Submit
			</slot>
		</button>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { QuestionFactory } from '@/modules/questions'
import QuestionEditor from '@app/components/core/editor/QuestionEditor.vue'
import { useAccountModal } from '@/application/hooks/core/modals'
import { useTags } from '@/application/hooks/core/forms'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'

export default defineComponent({
	name: 'QuestionForm',
	components: { QuestionEditor, SelectSubject },
	props: {
		factory: {
			type: Object as PropType<QuestionFactory>,
			required: true
		},
		coins: {
			type: Array,
			required: true
		},
		submit: {
			type: Function,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		error: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { openBuyCoins } = useAccountModal()
		const { tag, removeTag } = useTags(
			(tag: string) => props.factory.addTag(tag),
			(tag: string) => props.factory.removeTag(tag)
		)
		return { openBuyCoins, tag, removeTag }
	}
})
</script>

<style lang="scss" scoped>
	.form-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 1.5rem;

		.title {
			color: $color-dark;
			font-weight: 600;
			margin-bottom: 8px;
		}

		.sub-title {
			color: $color-dark;
			font-weight: 500;
			margin-bottom: 8px;
		}

		input {
			box-sizing: border-box;
			background: $color-white;
			border: 1px solid $color-line;
			border-radius: 6px;
			padding: 16px 24px;

			&::placeholder {
				color: $color-dark;
			}
		}

		select {
			min-height: 3rem;
		}
	}
</style>
