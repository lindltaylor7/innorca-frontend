export default function ({ store, redirect }) {

	if (store.state.session.loggedIn) {
		return redirect('/mi-perfil')
	}
    
}