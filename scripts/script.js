(function () {
  const API_SERVER = "https://api.github.com/users/",
    search = document.getElementById("search_bar"),
    form = document.getElementById("form"),
    result = document.getElementById("results"),
    favicon = document.getElementById("favicon"),
    document_title = document.getElementById("document_title");

  const getUser = async (username) => {
    try {
      const { data } = await axios(API_SERVER + username)

      createUserCard(data)
    } catch (err) {
      if (err.response.status == 404) {
        setTimeout(() => {
          errBlock("404, no user found 😟", "./img/404.png")
        }, 150);
      } else {
        errBlock("Uh, oh! 😥 We've encountered an error...", "./img/error.svg")
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
            <div class="userid">@${user.login}</div>
            <div class="user_about" id="user_about">${user.bio}</div>
          </div>
        </div>
      </div>
      <div class="bottom_container">
        <div class="box">
          <div class="repositories" id="repositories">${calcRepo()}</div>
          <div class="user_followers" id="user_followers">${calcFlw()}</div>
          <div class="user_follow" id="user_follow">${user.following} Following</div>
        </div>
      </div>
    `

    favicon.setAttribute("href", `${user.avatar_url}`);
    document_title.innerHTML = `${user.name} • Github User Finder`;

    function calcRepo() {
      let output;
      if (user.public_repos < 2) {
        output = user.public_repos + " Repository";
      } else {
        output = user.public_repos + " Repositories";
      }
      return output;
    }
    function calcFlw() {
      let output;
      if (user.followers < 2) {
        output = user.followers + " Follower";
      } else if (user.followers === 0) {
        output = "No followers";
      } else {
        output = user.followers + " Followers";
      }
      return output;
    }

    result.innerHTML = card
    console.log(user);
    setTimeout(() => {
      result.classList.add("result_found");
    }, 100);
    setTimeout(() => {
      result.classList.add("result_found");
    }, 350);
  }

  function errBlock(specification, source) {
    const illustration = document.querySelector("#illustration"),
      sadness = document.querySelector("#sadness"),
      error_container = document.querySelector("#error");

    illustration.setAttribute("src", source);
    sadness.innerHTML = specification;
    error_container.classList.add("error_occured");
    favicon.setAttribute("href", "./img/something_went_wrong.svg");
    document_title.innerHTML = "Uh oh, errors cought you...";
    error_container.addEventListener("mousedown", e => {
      e.target.classList.remove("error_occured");
      favicon.setAttribute("href", "./img/github.svg");
      document_title.innerHTML = "Github User Finder";
    })
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value

    if (user) {
      getUser(user)
      result.classList.remove("result_found")
    }
  })

  //! scollbar
  document.addEventListener("DOMContentLoaded", function () {
    OverlayScrollbars(document.querySelectorAll('body'), {
      className: "os-theme-light",
      scrollbars: {
        autoHide: "leave",
        autoHideDelay: 1000
      }
    });
    OverlayScrollbars(result, {
      className: "os-theme-light",
      scrollbars: {
        autoHide: "leave",
        autoHideDelay: 1000
      }
    });
  });
})();