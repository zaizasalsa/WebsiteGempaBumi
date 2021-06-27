function readTextFile(file) {
  return new Promise((resolve, reject) => {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;
          resolve(allText);
          return;
        }
      }
      reject(null);
      return;
    };
    rawFile.send(null);
  });
}

const tableDataKorban = document.querySelector(".tabel-data-korban");

readTextFile("assets/doc/gempa_csv.csv").then((res) => {
  const dataList = res.split("\r\n");
  let th = "";
  const trHead = document.createElement("tr");
  for (const data of dataList[0].split(",")) {
    th += `<th>${data}</th>`;
  }
  trHead.innerHTML = th;
  tableDataKorban.append(trHead);
  for (let i = 1; i < dataList.length; i++) {
    const dataItemList = dataList[i].split(",");
    if (dataItemList.length < 5) break;
    console.log(dataItemList);
    const trNode = document.createElement("tr");
    let td = "";
    for (const item of dataItemList) {
      td += `<td>${item}</td>`;
    }
    trNode.innerHTML = td;
    tableDataKorban.append(trNode);
  }
});
