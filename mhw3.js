function onJsonImage(json) {
  const vetrina = document.querySelector('#immagine');
  vetrina.innerHTML = '';
  if(k>=0){
      const cont = document.createElement('div');
      cont.classList.add('cont');
      const img = document.createElement('img');
      img.classList.add("immagine_jsn");
      img.src = json.results[k].urls.small;
      cont.appendChild(img);
      vetrina.appendChild(cont);
      k++;
  }
  if(k>=10){
    k=0;
  }
}

function onJsonText(json) {
  const txt = document.querySelector('#testo');
  txt.innerHTML = '';
  let totale = json.meta.results.total;
  for(i=0; i<totale; i++){
      const doc = json.results[i].patient.drug[i];
      const nome_farmaco = doc.medicinalproduct;
      const div_f = document.createElement('div');
      div_f.classList.add('div_f');
      const name = document.createElement('span');
      name.textContent = nome_farmaco;
      div_f.appendChild(name);
      txt.appendChild(div_f);
  }

}

function onResponse(response) {
  return response.json();
}

function ricerca(event){
event.preventDefault();
const sintomo = document.querySelector('#sintomo');
const valore_sintomo = encodeURIComponent(sintomo.value);
fetch(
  'https://api.fda.gov/drug/event.json?search=patient.drug.drugindication:' + valore_sintomo
).then(onResponse).then(onJsonText);
fetch('https://api.unsplash.com/search/photos?query=medications&client_id=' + client_id
  ).then(onResponse).then(onJsonImage);
}

function onTokenJson(json)
{
  console.log(json);
  token = json.access_token;
}

function onTokenResponse(response)
{
  console.log('ricevuto!');
  return response.json();
}

let i;
let k=0;
const client_id = 'o8GRo090AGEbLqSt416oQ4xaTwNl4gAirYD55PPeGC8';
const client_secret = 'B9QCHAqRmbADh06P8uCFyghDI5BV2fqMJFq2fnCHbUE';
let token;

fetch("https://unsplash.com/oauth/token",
    {
   method: "POST",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
   }
  }
).then(onTokenResponse).then(onTokenJson);

const form = document.querySelector('form');
form.addEventListener('submit', ricerca);