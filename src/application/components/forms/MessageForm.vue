<template>
	<form class="rounded-lg bg-white md:py-6 py-3 md:px-8 px-4 flex flex-col md:w-11/12 w-full shadow-2xl" @submit.prevent="createMessage">
		<div class="grid grid-cols-2 gap-2 mt-7">
			<div class="col-span-2 md:col-span-1 flex flex-col justify-center">
				<span class="mb-1 md:text-base text-sm font-medium text-gray-800">
					First Name
				</span>
				<input
					id="first_name"
					v-model="factory.firstName"
					:class="{'is-invalid': factory.errors.firstName, 'is-valid': factory.isValid('firstName')}"
					class="focus:outline-none rounded-xl py-3 px-3 md:text-base text-sm border-2 border-gray-500"
					placeholder="John"
				>
				<small v-if="factory.errors.firstName" class="block text-sm text-red-600">
					<DynamicText>{{ factory.errors.firstName }}</DynamicText>
				</small>
			</div>
			<div class="col-span-2 md:col-span-1 flex flex-col justify-center">
				<span class="mb-1 md:text-base text-sm font-medium text-gray-800">
					Last Name
				</span>
				<input
					id="last_name"
					v-model="factory.lastName"
					:class="{'is-invalid': factory.errors.lastName, 'is-valid': factory.isValid('lastName')}"
					class="focus:outline-none rounded-xl py-3 px-3 md:text-base text-sm border-2 border-gray-500"
					placeholder="Smith"
				>
				<small v-if="factory.errors.lastName" class="block text-sm text-red-600">
					<DynamicText>{{ factory.errors.lastName }}</DynamicText>
				</small>
			</div>

			<div class="col-span-2  flex flex-col justify-center mt-5">
				<span class="mb-1 md:text-base text-sm font-medium text-gray-800">
					Email
				</span>
				<input
					id="email"
					v-model="factory.email"
					type="email"
					:class="{'is-invalid': factory.errors.email, 'is-valid': factory.isValid('email')}"
					class="focus:outline-none rounded-xl py-3 px-3 md:text-base text-sm border-2 border-gray-500"
					placeholder="voodooschmidt@gmail.com"
				>
				<small v-if="factory.errors.email" class="block text-sm text-red-600">
					<DynamicText>{{ factory.errors.email }}</DynamicText>
				</small>
			</div>

			<div class="col-span-2  flex flex-col justify-center mt-5">
				<span class="mb-1 md:text-base text-sm font-medium text-gray-800">
					Message
				</span>
				<textarea
					id="message"
					v-model="factory.message"
					:class="{'is-invalid': factory.errors.message, 'is-valid': factory.isValid('message')}"
					class="focus:outline-none rounded-xl py-3 px-3 md:text-base text-sm border-2 border-gray-500"
					placeholder="I would love to partner with you."
					rows="4"
				/>
				<small v-if="factory.errors.message" class="block text-sm text-red-600">
					<DynamicText>{{ factory.errors.message }}</DynamicText>
				</small>
			</div>
			<button :disabled="loading || !factory.valid" class="mt-5 rounded-xl bg-primary col-span-2 text-white font-bold py-3 md:text-lg text-sm" type="submit">
				Send Message
			</button>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateMessage } from '@app/hooks/forms/messages'

export default defineComponent({
	name: 'MessageForm',
	setup () {
		const { factory, loading, error, createMessage } = useCreateMessage()
		return { factory, loading, error, createMessage }
	}
})
</script>
