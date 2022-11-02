
<template>
	<div id="solutions" class="w-full h-auto flex flex-col bg-primaryText py-2">
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col md:flex-row gap-6 lg:gap-16 md:items-center justify-center product mt-6">
			
			<img src="@/assets/images/newLanding/flashcards.png" alt="hero" class="w-auto md:w-[50%] rounded-2xl">
			<div class="flex flex-col md:gap-5 gap-3 md:w-[50%] ">
				<h2 class="md:text-4xl text-xl font-bold text-bodyText ">Flashcards</h2>
				<div class="ml-3">
					<li>Create your own flashcards.</li>
					<li>Find and use flashcards created by others</li>
					<li>Unlimited access</li>
				</div>
				
				<router-link to="/" class="btn bg-primaryBg text-primaryText">
					Use for free
				</router-link>
			</div>
		</div>

		<div
			class="container mx-auto text-bodyText p-6 flex flex-col md:flex-row gap-6 lg:gap-16 md:items-center justify-center product mt-6">
			<img src="@/assets/images/newLanding/assignment.png" alt="hero" class="w-auto md:w-[50%] rounded-2xl">
			<div class="flex flex-col md:gap-5 gap-3 md:w-[50%]">
				<h2 class="md:text-4xl text-xl font-bold  text-bodyText ">Assignent help</h2>
				<div class="ml-3">
					<li>Asking and answering questions.</li>
					<li>Only 10 questions to ask per month</li>
					<li>Expert answers for all questions you ask</li>
					<li>Unlimited access to all questions answer</li>
				</div>
				
				<router-link to="/" class="btn bg-primaryBg text-primaryText">
					Get Stranerd Premium
				</router-link>
			</div>
		</div>
		
	</div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
a {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs
}
@media screen and (min-width: $md) {
	.product:nth-child(odd) {
		flex-direction: row-reverse;
	}
}

.btn {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs
}
</style>
