const url = "https://api.coincap.io/v2";

// const getAssets = async () => {
//   try {
//     const link = await fetch(`${url}/assets?limit=20`);
//     const respuestaJson = await link.json();
//     const data = await respuestaJson.data;
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }
function getAssets() {
    return fetch(`${url}/assets?limit=20`)
      .then(response => response.json())
      .then(response => response.data);
}
function getAsset (coin) {
    return fetch(`${url}/assets/${coin}`)
      .then(response => response.json())
      .then(response => response.data);
}
function getAssetHistory(coin) {
  const now = new Date();
  const end = now.getTime();
  now.setDate(now.getDate() - 1);
  const start = now.getTime();

  return fetch(
    `${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`
  )
    .then(response => response.json())
    .then(response => response.data);
}

function getMarkets(coin) {
  //Obtiene la listas de mercados
  return fetch(`${url}/assets/${coin}/markets?limit=5`)
    .then(response => response.json())
    .then(response => response.data);
}
function getExchange(id) {
  return fetch(`${url}/exchanges/${id}`)
    .then(response => response.json())
    .then(response => response.data);
}

// function getAssets() {
//     return fetch(`${url}/assets?limit=20`)
//         .then(res => res.json())
//         .then(res => res.data)
// }

export default { getAssets, getAsset, getAssetHistory, getMarkets, getExchange };
