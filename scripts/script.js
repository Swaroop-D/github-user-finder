(function () {
  const API_SERVER = "https://api.github.com/users/",
    search = document.getElementById("search_bar"),
    form = document.getElementById("form"),
    result = document.getElementById("results"),
    body = document.querySelector("body");

  const getUser = async (username) => {
    try {
      const { data } = await axios(API_SERVER + username)

      createUserCard(data)
    } catch (err) {
      if (err.response.status == 404) {
        errBlock("404, no user found 😟", "/img/404.png")
      } else {
        errBlock("Uh, oh! 😥 We've encountered an error...", "/img/error.svg")
      }
    }
  }

  const createUserCard = (user) => {
    const card = `
    <div class="top_container">
        <div class="github_user_pic">
          <img src="${user.avatar_url}" alt="${user.name}" id="user_pic">
        </div>
        <div class="right">
          <div class="github_user_info">
            <a href="https://www.github.com/${user.login}" target="_blank" class="username" id="username">${user.name}</a>
            <div class="userid">${user.login}</div>
            <div class="user_about" id="user_about">${user.bio}</div>
          </div>
        </div>
      </div>
      <div class="bottom_container">
        <div class="box">
          <div class="repositories" id="repositories">${user.public_repos} Repositories</div>
          <div class="user_followers" id="user_followers">${user.followers} Followers</div>
          <div class="user_follow" id="user_follow">${user.following} Following</div>
        </div>
      </div>
    `

    result.innerHTML = card
    console.log(user)
  }

  function errBlock(specification, source) {
    const illustration = document.querySelector("#illustration"),
      sadness = document.querySelector("#sadness"),
      error_container = document.querySelector("#error");

    illustration.setAttribute("src", source);
    sadness.innerHTML = specification;
    error_container.classList.add("error_occured");
    error_container.addEventListener("mousedown", e => {
      e.target.classList.remove("error_occured")
    })
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value

    if (user) {
      getUser(user)
    }
  })

  //! scollbar
  document.addEventListener("DOMContentLoaded", function () {
    OverlayScrollbars(document.querySelectorAll('body'), {
      className: "os-theme-light",
      scrollbars: {
        autoHide: "scroll",
        autoHideDelay: 1000
      }
    });
    OverlayScrollbars(result, {
      className: "os-theme-light",
      scrollbars: {
        autoHide: "scroll",
        autoHideDelay: 1000
      }
    });
  });
})();