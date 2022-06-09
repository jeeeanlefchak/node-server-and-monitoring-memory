const ul = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector("form");

async function load() {
  const res = await fetch("http://localhost:3000/").then((data) => data.json());

  res.urls.map(({ name, url }) => addElement({ name, url }));
}

async function del({ url, name }) {
  let urlR = "http://localhost:3000/?del=1&name=" + name + "&url=" + url;
  console.log("sss", urlR);
  return await fetch(urlR).then((data) => data.json());
}

async function create({ url, name }) {
  let urlR = "http://localhost:3000/?create=1&name=" + name + "&url=" + url;
  console.log("sss", urlR);
  return await fetch(urlR).then((data) => {
    return data.json();
  });
}

load();

function addElement({ name, url }) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const trash = document.createElement("span");

  a.href = url;
  a.innerHTML = name;
  a.target = "_blank";

  trash.innerHTML = "x";
  trash.onclick = () => removeElement(trash);

  li.append(a);
  li.append(trash);
  ul.append(li);
}

async function removeElement(el) {
  if (confirm("Tem certeza que deseja deletar?")) {
    await del({
      name: el.parentNode.textContent,
      url: el.parentNode.children[0].href,
    }).then((r) => {
      el.parentNode.remove();
    });
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let { value } = input;

  if (!value) return alert("Preencha o campo");

  const [name, url] = value.split(",");

  if (!url) return alert("formate o texto da maneira correta");

  if (!/^http/.test(url)) return alert("Digite a url da maneira correta");

  create({ name: name, url: url }).then((r) => {
    addElement({ name, url });
  });

  input.value = "";
});
