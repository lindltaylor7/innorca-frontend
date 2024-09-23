export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    console.log("Making request to " + config.url);
  });

  $axios.onError((error) => {
    console.log("Making request to " + error);
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
      redirect("/400");
    } else if (code === 401) {
      // Unauthorized
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
  });
}
