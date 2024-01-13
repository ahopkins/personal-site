function doCopy (event) {
    event.preventDefault()
    const copyTarget = event.target.getAttribute("data-copy-target")
    const target = document.querySelector(`pre[data-copy-id=${copyTarget}]`)
    navigator.clipboard.writeText(target?.textContent)
    const orig = event.target?.innerText
    event.target.innerText = "Copied"
    setTimeout(() => {
        event.target.innerText = orig
    }, 2000);
}

function addCopy () {
    const pre = document.querySelectorAll("pre")
	pre.forEach((element, idx) => {
        const wrapper = document.createElement("div")
        const button = document.createElement("button")
        wrapper.className = "pre-wrapper"
        element.setAttribute("data-copy-id", `copy-${idx}`)
        button.className = "copy-snippet"
        button.innerText = "Copy"
        button.setAttribute("data-copy-target", `copy-${idx}`)
        button.addEventListener("click", doCopy)
        element.replaceWith(wrapper)
        wrapper.appendChild(element)
        wrapper.appendChild(button)
    })
}

export {addCopy}
