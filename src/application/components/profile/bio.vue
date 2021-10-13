<template>
	<div class="col-span-12 flex flex-col px-3 normalText mb-14">
		<div class="flex flex-col gap-3 border-2 py-10 px-4 border-faded_gray rounded-lg">
			<div class="flex flex-col gap-2 text-icon_inactive pb-3 border-b-2 border-faded_gray">
				<h1 class="headings text-dark_gray font-bold">About me</h1>
				<p class="leading-relaxed">
					I've always loved the Victorian period in English literature. Even as a kid, Dickens captured my imagination more thoroughly than
					the Harry Potter stories or anything else. As an undergraduate at Northwestern University, I studied English with a concentration on
					Victorian fiction. Now, I hope to continue exploring this fundamentally important literary period as a member on stranerd.
				</p>
			</div>

			<div class="flex flex-col gap-2 text-icon_inactive pb-3 border-b-2 border-faded_gray">
				<h1 class="headings text-dark_gray font-bold">Level</h1>
				<p class="leading-relaxed">
					University - 1st year
				</p>
			</div>

			<div class="flex flex-col gap-2 text-icon_inactive pb-3 border-b-2 border-faded_gray">
				<h1 class="headings text-dark_gray font-bold">School</h1>
				<p class="leading-relaxed">
					Northwestern  University
				</p>
			</div>

			<div class="flex flex-col gap-2 text-icon_inactive pb-3 border-b-2 border-faded_gray">
				<h1 class="headings text-dark_gray font-bold">Course</h1>
				<p class="leading-relaxed">
					Literature
				</p>
			</div>

			<div class="flex flex-col gap-2 text-icon_inactive pb-3 border-b-2 border-faded_gray">
				<h1 class="headings text-dark_gray font-bold">Best Subject</h1>
				<p class="leading-relaxed">
					English
				</p>
			</div>

		</div>
	</div>
</template>

<script lang="ts">

import { star } from 'ionicons/icons'

export default  {
	name: 'profileBio',

	setup() {
		
		return {
			star
		}
	}
}
</script>
<style scoped>
ion-toolbar {
	--background: #F7F7FC;
}

</style>