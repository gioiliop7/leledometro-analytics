$(document).ready(function () {
  function formatDateString(day, month, year) {
    month = parseInt(month) + 1; // We add one because the value of xml starts of 0. For example January is in zero position.
    const d = new Date(`${year}-${month}-${day}`);
    const years = d.getFullYear();
    const date = d.getDate();
    const months = d.getMonth() + 1;
    const formattedDate = `${date}/${months}/${years}`;
    return formattedDate;
  }

  function maxElement(array) {
    //https://stackoverflow.com/questions/1053843/get-the-element-with-the-highest-occurrence-in-an-array
    if (array.length == 0) return null;
    var modeMap = {};
    var maxEl = array[0],
      maxCount = 1;
    for (var i = 0; i < array.length; i++) {
      var el = array[i];
      if (modeMap[el] == null) modeMap[el] = 1;
      else modeMap[el]++;
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  }

  function dateToTimestamp(date) {
    date = date.split("/");
    let newDate = new Date(date[2], date[1] - 1, date[0]);
    newDate = newDate.getTime();
    return newDate;
  }

  function findDifferenceOfDays(end, start) {
    const endTimestamp = dateToTimestamp(end);
    const startTimestamp = dateToTimestamp(start);
    let difDaysTS = endTimestamp - startTimestamp;
    let diffDays = difDaysTS / (1000 * 3600 * 24);
    diffDays = parseInt(diffDays);
    diffDays = Math.abs(diffDays);
    return diffDays;
  }

  function todayDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  }

  $("#xmlupload").change(function () {
    var file = document.getElementById("xmlupload").files[0];
    //You could insert a check here to ensure proper file type
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = function () {
      var xmlData = $(reader.result);
      // console.log(xmlData);
      xmlData = xmlData[1];
      //   console.log(xmlData);
      const ypiresies = xmlData.getElementsByTagName("ipiresia");
      const details = xmlData.getElementsByTagName("stoixeia");
      const adeies = xmlData.getElementsByTagName("adeia");
      const poreia = xmlData.getElementsByTagName("poreia");
      let simioseis = xmlData.getElementsByTagName("simioseis");

      let personDetails = Array.from(details);
      personDetails = personDetails[0];
      const arrayServices = Array.from(ypiresies);
      const arrayAdeies = Array.from(adeies);
      const poreies = Array.from(poreia);
      simioseis = simioseis[0].childNodes;
      const asm = simioseis[5].innerText;

      const personName = personDetails.childNodes[0].innerText;
      const startYear = personDetails.childNodes[1].innerText;
      const startMonth = personDetails.childNodes[2].innerText;
      const startDay = personDetails.childNodes[3].innerText;
      const endYear = personDetails.childNodes[4].innerText;
      const endMonth = personDetails.childNodes[5].innerText;
      const endDay = personDetails.childNodes[6].innerText;
      const soma = personDetails.childNodes[7].innerText;
      // ARMY = 0; NAVY = 1; HAF = 2;
      const oplo_stratou = personDetails.childNodes[8]; // It returns value only on ξηρά..
      const seira = personDetails.childNodes[9];
      const esso = personDetails.childNodes[10];
      const prison = personDetails.childNodes[11];
      const notLetMeOut = personDetails.childNodes[12];

      const startDate = formatDateString(startDay, startMonth, startYear);
      const endDate = formatDateString(endDay, endMonth, endYear);
      const todayDateString = todayDate();

      const apolele = findDifferenceOfDays(endDate, todayDateString); // How many days for leaving army and be again citizen
      const daysInArmy = findDifferenceOfDays(todayDateString, startDate); // How many days in army

      let yp_names = [];
      let adeies_names = [];

      arrayServices.forEach((element) => {
        let yp_name = element.childNodes[0].innerText;
        let yp_year = element.childNodes[1].innerText;
        let yp_month = element.childNodes[2].innerText;
        let yp_day = element.childNodes[3].innerText;
        let number = element.childNodes[4].innerText;
        yp_names.push(yp_name);
      });

      arrayAdeies.forEach((element) => {
        let adeiaName = element.childNodes[0].innerText;
        let adeiaYear = element.childNodes[1].innerText;
        let adeiaMonth = element.childNodes[2].innerText;
        let adeiaDay = element.childNodes[3].innerText;
        adeies_names.push(adeiaName);
      });

      poreies.forEach((element) => {
        let poreiaName = element.childNodes[0].innerText;
        let poreiaYear = element.childNodes[1].innerText;
        let poreiaMonth = element.childNodes[2].innerText;
        let adeiaDay = element.childNodes[3].innerText;
      });

      const mfYpiresia = maxElement(yp_names);
      const mfAdeia = maxElement(adeies_names);
    };
  });
});
