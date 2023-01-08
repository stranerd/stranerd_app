<template>
	<DefaultLayout>
		<div>
			<div class="nav-scroll">
				<router-link to="/admin/users/admins">Admins</router-link>
				<router-link to="/admin/users/tutors">Tutors</router-link>
				<router-link to="/admin/interactions/tags">Tags</router-link>
				<router-link to="/admin/school/institutions">Institutions</router-link>
				<router-link to="/admin/study/preps">Preps</router-link>
				<router-link to="/admin/school/questions">Test Questions</router-link>
			</div>
			<div class="page-padding">
				<slot />
			</div>
		</div>
	</DefaultLayout>
</template>
