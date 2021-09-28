<template>
	<div class="col-span-12 grid grid-col-12">
		<CTA />
		<img alt="" src="@/application/assets/images/homepage/wave-top.svg" class="col-span-12 w-full -mb-1">
		<IGStat />
		<img alt="" src="@/application/assets/images/homepage/wave-bottom.svg" class="col-span-12 w-full -mt-1">
		<HowItWorks id="how-it-works" />
		<img alt="" src="@/application/assets/images/homepage/wave-top.svg" class="col-span-12 w-full -mb-1">
		<Connect />
		<img alt="" src="@/application/assets/images/homepage/wave-bottom.svg" class="col-span-12 w-full -mt-1">
		<ContactUs id="contact-us" />
		<img alt="" src="@/application/assets/images/homepage/wave-footer.svg" class="col-span-12 w-full -mb-1">
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CTA from '@app/components/home/CTA.vue'
import IGStat from '@app/components/home/IGStat.vue'
import HowItWorks from '@app/components/home/HowItWorks.vue'
import Connect from '@app/components/home/Connect.vue'
import ContactUs from '@app/components/home/ContactUs.vue'

export default defineComponent({
	name: 'IndexPage',
	components: { CTA, IGStat, HowItWorks, Connect, ContactUs },
	layout: 'home'
})
</script>
