<template>
	<div>
		<IonText class="font-bold text-2xl px-4 mb-4">Profile</IonText>
		<ProfileView />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProfileView from '@app/components/users/users/ProfileView.vue'

export default defineComponent({
	name: 'ProfilePanel',
	components: { ProfileView }
})
</script>
