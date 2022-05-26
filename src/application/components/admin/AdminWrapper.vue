<template>
	<Justified>
		<div>
			<div class="nav-scroll">
				<router-link to="/admin/users/admins">Admins</router-link>
				<router-link to="/admin/questions/tags">Question Tags</router-link>
				<router-link to="/admin/school/institutions">Institutions</router-link>
				<router-link to="/admin/study/preps">Preps</router-link>
				<router-link to="/admin/school/questions">Test Questions</router-link>
			</div>
			<div class="py-4">
				<slot />
			</div>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { cogOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'AdminWrapper',
	components: { Justified },
	setup () {
		return { cogOutline }
	}
})
</script>
