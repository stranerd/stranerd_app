<template>
	<Modal :modal="$attrs.modal">
		<template slot="title">
			Rate Session
		</template>
		<p class="text-center my-0">
			<span v-if="session && session.wasCancelled">The session was cancelled.</span>
			<span>Time to leave a rating for the session</span>
		</p>
		<div class="text-center my-1">
			<SelectRating :rating="rating" :set-rating="(val) => rating = val" />
		</div>
		<div class="form-group my-1">
			<textarea v-model="review" class="form-control" placeholder="Please leave a review ..." rows="5" />
		</div>
		<div class="flex justify-content-end my-1">
			<button class="btn btn-dark" @click="rateSession">
				Submit
			</button>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</Modal>
</template>

<script>
import { useCurrentSession } from '@/application/hooks/sessions/session'
import { useRateSession } from '@/application/hooks/sessions/sessions'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'SessionRatings',
	setup () {
		const { previousSession: session } = useCurrentSession()
		const { loading, error, rating, review, rateSession } = useRateSession()
		return { loading, error, rating, review, rateSession, session }
	}
})
</script>

<style lang="scss" scoped>
	/deep/ i {
		margin: 0 0.15rem;
		font-size: 3rem;
	}
</style>
