<template>
	<Modal :modal="$attrs.modal">
		<template slot="title">
			Request Session
		</template>
		<form @submit.prevent="createSession">
			<!-- <SessionEditor :model.sync="factory.message" :error="factory.errors.message" :valid="factory.isValid('message')" /> -->
			<!-- Add editor and check if text is for editor in chat cards -->
			<div>
				<textarea
					id="email"
					v-model="factory.message"
					class="form-control"
					placeholder="Leave a message for the nerd"
					required
				/>
				<DynamicText v-if="factory.errors.message" class="small text-danger d-block">
					{{ factory.errors.message }}
				</DynamicText>
			</div>
			<div class="form-group my-1">
				<select v-model="factory.duration" class="form-select">
					<option :value="0" disabled>
						Select Session Duration
					</option>
					<option v-for="option in factory.prices" :key="option.duration" :value="option.duration">
						{{ option.duration }} minutes - {{ option.price }} gold coins
					</option>
				</select>
				<template v-if="!hasEnoughCoins" class="small">
					<span class="text-danger">You don't have enough gold coins to continue.</span>
					<a class="ml-half" @click.prevent="buy">Buy More Coins</a>
				</template>
			</div>
			<button
				:disabled="loading || !factory.valid || !hasEnoughCoins"
				class="btn btn-dark my-1 w-100"
				type="submit"
			>
				Request Session
			</button>
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
		</form>
	</Modal>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useAccountModal } from '@app/hooks/core/modals'
import { useCreateSession } from '@app/hooks/sessions/sessions'
import { analytics } from '@modules/core'
// import SessionEditor from '@app/components/core/editor/SessionEditor.vue'
export default defineComponent({
	name: 'SessionCreateSession',
	// components: { SessionEditor },
	setup () {
		const buy = useAccountModal().openBuyCoins
		const { factory, loading, error, hasEnoughCoins, createSession } = useCreateSession()
		onMounted(() => {
			analytics.logEvent('view_session_request')
		})
		return {
			buy, hasEnoughCoins,
			factory, loading, error, createSession
		}
	}
})
</script>
