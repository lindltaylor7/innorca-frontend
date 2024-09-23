import axios from "axios";

export default function ({ store, redirect }) {
  if (!store.state.session.loggedIn) {
    return redirect("/login");
  } else {
    console.log("loggedIn", store.state.session.loggedIn);

    axios
      .get(`${process.env.API_URL}/account`, {
        headers: { "x-access-token": store.state.session.token },
      })
      .then(({ data }) => {
        //console.log('valid token?', data);
      })
      .catch((e) => {});
  }
}
