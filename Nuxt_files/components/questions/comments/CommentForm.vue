<template>
	<form @submit.prevent="submitComment">
		<div class="form-group">
			<div class="flex items-center gap-0-5 gap-md-1">
				<Avatar :size="35" :src="isLoggedIn ? user.avatar : null" />
				<input
					v-model="factory.body"
					:class="{'is-invalid': factory.errors.body, 'is-valid': factory.isValid('body') }"
					class="form-control p-0 flex-grow-1"
					placeholder="Add a comment..."
				>
				<button class="btn custom-btn ms-auto" type="submit">
					send
				</button>
			</div>
			<DynamicText v-if="factory.errors.body" class="small text-danger d-block">
				{{ factory.errors.body }}
			</DynamicText>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { CommentFactory } from '@/modules/questions'
import { useAuth } from '@/application/hooks/auth/auth'
import { useRedirectToAuth } from '@/application/hooks/auth/session'

export default defineComponent({
	name: 'CommentForm',
	props: {
		factory: {
			type: Object as PropType<CommentFactory>,
			required: true
		},
		submit: {
			type: Function as PropType<() => void>,
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
		const { isLoggedIn, user } = useAuth()
		const { redirect } = useRedirectToAuth()
		const submitComment = () => {
			if (isLoggedIn.value) props.submit()
			else redirect()
		}
		return { isLoggedIn, user, submitComment }
	}
})
</script>

<style lang="scss" scoped>
	.form-control {
		font-size: 0.9rem;
		border: none !important;
		box-shadow: none !important;
	}

	.custom-btn {
		border: 1px solid $color-line;
		color: $color-primary;
		border-radius: 5px;
		padding: 0.5rem 1.5rem;
	}
</style>
