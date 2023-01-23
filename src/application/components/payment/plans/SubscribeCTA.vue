<template>
	<div class="p-6 gap-2 flex rounded-xl flex-col bg-primaryBg text-primaryText">
		<span class="text-xl font-bold">{{ title }}</span>
		<span class="text-lg">{{ sub }}</span>
		<router-link class="w-full mt-2" to="/account/subscription/plans">
			<IonButton class="btn-primary w-full">Get Started</IonButton>
		</router-link>
	</div>
</template>

<script lang="ts" setup>
defineProps({
	title: {
		type: String,
		required: false,
		default: 'Use Stranerd Premium'
	},
	sub: {
		type: String,
		required: false,
		default: 'Ask a question and get expert tutor answers, and view answers to questions you find.'
	}
})
</script>

<style lang="scss" scoped>
ion-button.btn-primary {
	--background: #{$color-primaryText};
	--color: #{$color-primaryBg};
	--border-color: #{$color-primaryText};
}
</style>
