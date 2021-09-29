<template>
	<div class="flex-grow-1 flex gap-0-25">
		<ContactList class="contact-list" />
		<div class="contact-messages">
			<span class="lead p-0-5 rounded-3 bg-line">Select a contact to message</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContactList from '@app/components/sessions/chats/ContactList.vue'

export default defineComponent({
	name: 'SessionsPage',
	components: { ContactList },
	layout: 'chat',
	middleware: ['isAuthenticated'],
	setup () {
		// useMeta(() => ({
		// 	title: 'Your Sessions | Stranerd'
		// }))
		return {}
	},
	head: {}
})
</script>

<style lang="scss" scoped>
	.contact-messages {
		background: url("~@app/assets/images/doodle.png") $color-white;
		display: none;
		justify-content: center;
		align-items: center;
		width: 70%;
		flex-grow: 1;
		@media (min-width: $lg) {
			display: flex;
		}
	}

	.contact-list {
		width: 30%;
		flex-grow: 1;
	}
</style>
