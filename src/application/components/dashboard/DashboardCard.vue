<template>
	<div class="bg-white rounded-xl p-4 md:px-7 md:py-6 flex flex-col items-start gap-3">
		<IonIcon
			:icon="icon" :class="iconClass"
		/>
		<ion-text class="font-bold text-main_dark text-heading">
			{{title}}
		</ion-text>
		<ion-text class="text-gray">
			{{subtitle}}
		</ion-text>
	</div>
</template>

<script>
export default {
	name:'DashboardCard',
	props:{
		icon:{
			required:true,
		},
		title:{
			required:true
		},
		subtitle:{
			reuired:true
		},
		iconClass:{
			reuired:false,
			default:'text-orange text-heading2'
		}

	}
}
</script>

