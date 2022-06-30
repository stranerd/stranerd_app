<template>
	<router-link :to="`/users/${user.id}`" class="flex card card-padding items-center">
		<Avatar :id="user.id" :name="user.bio.fullName" :size="40" :src="user.bio.photo" />
		<div class="flex flex-col gap-1">
			<IonText class="font-bold flex gap-1 items-center">
				<span>{{ user.bio.fullName }}</span>
				<Verified :verified="user.isVerified" />
			</IonText>
			<template v-if="user.isCollege(user)">
				<Institution :institutionId="user.school.institutionId" />
				<Department :departmentId="user.school.departmentId" :facultyId="user.school.facultyId" />
			</template>
		</div>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UserEntity } from '@modules/users'
import Department from '@app/components/school/departments/Department.vue'
import Institution from '@app/components/school/institutions/Institution.vue'

export default defineComponent({
	name: 'UserListCard',
	components: { Institution, Department },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	}
})
</script>
