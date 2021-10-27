<template>
<div class="flex flex-row items-center px-3 py-4 border-b-[1px] border-light_gray text-icon_inactive">
	 <avatar :size="'41'" :has-dot="true"/>
	 <div class="flex flex-col justify-center gap-1 px-3  flex-grow">
		<h3 class="text-dark_gray heading font-bold">Timmy Neutron</h3>
		<span>I’m sure I will! Thank you...</span>
		</div>
		<div class="flex flex-row-reverse justify-start h-full">
		<span>00:12pm</span>
	</div>
</div>

</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
const Avatar = defineAsyncComponent(() => import('@/application/components/core/AvatarUser.vue'))

export default defineComponent({
	setup() {
		return { }
	},
	components: { Avatar }
})
</script>
