<template>
	<div class="flex md:gap-4 font-bold px-4 md:px-0">
		<div class="flex items-center justify-center bg-primary text-white rounded-xl md:px-8 px-4 md:py-3 py-1.5 cursor-pointer">
			UTME
		</div>
		<div class="flex items-center justify-center bg-white rounded-xl px-8 py-3 text-gray cursor-pointer">
			WAEC
		</div>
		<div class="flex items-center justify-center bg-white rounded-xl px-8 py-3 text-gray cursor-pointer">
			General
		</div>
	</div>
</template>

<script>
export default {
	name:'ExamTab',
	props:{
		active:{
			default:'',
			required:true
		}
	}
}
</script>

<style>

</style>