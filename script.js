const url = "https://jsonplaceholder.typicode.com/users"

const userCardTemplate = document.querySelector("[data-user-template]")
const userCardWrapper = document.querySelector("[user-card-wrapper]")
const search = document.querySelector("[data-search]")
const loading = document.querySelector("[data-loading]")

let users = []


search.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    users.map(user => {
        const isVisible = user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)
        user.element.classList.toggle("hide", !isVisible)
    })
})


fetch(url).then(res => res.json()).then(data => {

    if (data.length === 0) {
        userCardWrapper.append(loading)
    }
    users = data.map((user) => {
        loading.classList.add("hide")

        const card = userCardTemplate.content.cloneNode(true).children[0]

        const name = card.querySelector("[data-name]")
        const email = card.querySelector("[data-email]")

        name.textContent = user.name
        email.textContent = user.email

        userCardWrapper.append(card)

        return { name: user.name, email: user.email, element: card }
    })
}).catch(err => console.log(err))


