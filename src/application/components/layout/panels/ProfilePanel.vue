<template>
	<div class="flex flex-col gap-4">
		<IonText class="font-bold text-2xl card-padding !py-0">Profile</IonText>
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
