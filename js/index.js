document.addEventListener("DOMContentLoaded", () => {



    const form = document.getElementById("github-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        // data we want to pass from form
        // event.target[0].value;

        fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
        .then(response => response.json())
        .then(response => {
            //login, avatar_url, url
            response.items.map(item => {
                const userList = document.getElementById("user-list")
                const reposList = document.getElementById("repos-list")
                userList.textContent = ""
                reposList.textContent = ""

                const li = document.createElement("li")

                const h2 = document.createElement("h2")
                h2.textContent = item.login

                h2.addEventListener("click", e => showUserRepos(item.login))

                const img = document.createElement("img")
                img.src = item.avatar_url;

                // const a = document.createElement("a")
                // a.href = item.url
                // a.textContent = "Profile"

                li.append(h2, img)
                userList.append(li)
            })
        })

        form.reset();

    });
    
    function showUserRepos(username, e) {
        const reposList = document.getElementById("repos-list")
        reposList.textContent = ""
        fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => data.map(repo => {
            const li = document.createElement("li")
            const h1 = document.createElement("h1")
            h1.textContent = repo.name
            li.append(h1)
            reposList.append(li)
        }))
    
        

}})
