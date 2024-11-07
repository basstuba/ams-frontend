<template>
	<div class="main">
		<Time />
		<div class="user-message">{{ $auth.user.name }}さんお疲れ様です</div>
		<Button
		:work="work"
		:rest="rest"
		@update-work="updateWork"
		@update-break="updateBreak"
		/>
	</div>
</template>

<script>
export default {
	data() {
		return {
			work: {
				work_start: '',
				work_end: ''
			},
			rest: {
				break_start: '',
				break_end: ''
			},
		};
	},
	methods: {
		async getWorkData() {
			const { data } = await this.$axios.post('http://localhost/api/auth/work_index', {
				user_id: this.$auth.user.id,
			});
			this.work = data.work;
		},
		async getRestData() {
			const { data } = await this.$axios.post('http://localhost/api/auth/break_index', {
				user_id: this.$auth.user.id,
			});
			this.rest = data.rest;
		},
		updateWork(newWork) {
			this.work = newWork;
		},
		updateBreak(newBreak) {
			this.rest = newBreak;
		},
	},
	created() {
		this.getWorkData();
		this.getRestData();
	}
};
</script>

<style scoped>
.main {
	text-align: center;
}

.user-message {
	font-size: xx-large;
	margin-bottom: 1rem;
}
</style>
