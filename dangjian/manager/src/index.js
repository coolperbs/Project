define( 'index', function( require ){
	require( 'common/basestyle/base.css' );

	const Projects = require( 'pages/projects/projects' );
	const Project = require( 'pages/project/project' );
	//const Detail = require( 'pages/detail/detail' );

	const routes = [
	 	{ path: '/', component: Projects },
	 	{ path: '/projects', component: Projects },
	 	{ path: '/project', component: Project }
	 	//{ path: '/detail', component: Detail }
	]

	const router = new VueRouter({
	  routes
	})

	const app = new Vue({
	  router
	}).$mount('#app');
} );


