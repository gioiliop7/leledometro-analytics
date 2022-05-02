$(document).ready(function () {
  let location = window.location.href;
  let directoryPath = location.substring(0, location.lastIndexOf("/") + 1);

  function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
  }

  function formatDateString(day, month, year) {
    month = parseInt(month) + 1; // We add one because the value of xml starts of 0. For example January is in zero position.
    const d = new Date(`${year}-${month}-${day}`);
    const years = d.getFullYear();
    const date = d.getDate();
    const months = d.getMonth() + 1;
    const formattedDate = `${date}/${months}/${years}`;
    return formattedDate;
  }

  function fadeOutElement(el) {
    el.style.opacity = 1;
    (function fade() {
      if ((el.style.opacity -= 0.1) < 0) {
        el.style.display = "none";
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }

  function fadeInElement(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
      var val = parseFloat(el.style.opacity);
      if (!((val += 0.1) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
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
    if (file.type != "text/xml") {
      alert("Please select JSON files only!");
      this.value = "";
      return;
    }

    const haf_logo = directoryPath + "assets/images/air.png";
    const army_logo = directoryPath + "assets/images/seal.png";
    const navy_logo = directoryPath + "assets/images/navy.png";

    const dashboard = document.getElementById("dashboard");
    const uploadform = document.getElementById("uploadform");

    fadeOutElement(uploadform);
    fadeInElement(dashboard);

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
      let asm = simioseis[5].innerText;
      if (asm.length == 0 || !asm.includes("/")) {
        asm = "Δεν υπάρχει αποθηκευμένος ορθός στρατιωτικός αριθμός";
      }

      const countYp = arrayServices.length;
      const countAdeies = arrayAdeies.length;

      const personName = personDetails.childNodes[0].innerText;
      const startYear = personDetails.childNodes[1].innerText;
      const startMonth = personDetails.childNodes[2].innerText;
      const startDay = personDetails.childNodes[3].innerText;
      const endYear = personDetails.childNodes[4].innerText;
      const endMonth = personDetails.childNodes[5].innerText;
      const endDay = personDetails.childNodes[6].innerText;
      let soma = personDetails.childNodes[7].innerText;

      let logo;
      let somaColor;
      // ARMY = 0; NAVY = 1; HAF = 2;
      switch (soma) {
        case "0":
          soma = "Στρατός Ξηράς";
          logo = army_logo;
          somaColor = '#fde81a';
          break;
        case "1":
          soma = "Πολεμικό Ναυτικό";
          logo = navy_logo;
          somaColor = '#1b4279';
          break;
        case "2":
          soma = "Πολεμική Αεροπορία";
          logo = haf_logo;
          somaColor = '#008bd0';
          break;
        default:
          break;
      }

      const oplo_stratou = personDetails.childNodes[8].innerText; // It returns value only on ξηρά..
      const seira = personDetails.childNodes[9].innerText;
      const esso = personDetails.childNodes[10].innerText;
      const prison = personDetails.childNodes[11].innerText;
      const notLetMeOut = personDetails.childNodes[12].innerText;

      const startDate = formatDateString(startDay, startMonth, startYear);
      const endDate = formatDateString(endDay, endMonth, endYear);
      const todayDateString = todayDate();

      const apolele = findDifferenceOfDays(endDate, todayDateString); // How many days for leaving army and be citizen again.
      const daysInArmy = findDifferenceOfDays(todayDateString, startDate); // How many days in army

      const thiteia = findDifferenceOfDays(endDate, startDate);
      let p = percentage(daysInArmy, thiteia);
      p = p.toFixed(2);

      const htmlPercentage = `<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100" style="width:${p}%"></div>`;
      $("#pr").append(htmlPercentage);
      document.getElementById('the-percentage').innerText = ` ${p}%`;
      document.querySelector('.progress-bar').style.backgroundColor = somaColor;

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

      document.getElementById("person-name").innerText = personName;
      document.getElementById(
        "esso-seira"
      ).innerText = `${esso} ΕΣΣΟ/${startYear} - Σειρά:${seira}`;
      document.getElementById("asm").innerText = asm;
      document.getElementById("soma").innerText = soma;
      document.getElementById("somaimg").src = logo;
      document.getElementById("done").setAttribute("num", daysInArmy);
      document.getElementById("todo").setAttribute("num", apolele);
      document.getElementById("services").setAttribute("num", countYp);
      document.getElementById("adeies").setAttribute("num", countAdeies);
      document.getElementById("sex").setAttribute("num", notLetMeOut);
      document.getElementById("jail").setAttribute("num", prison);

      const counters = document.querySelectorAll(".box-number");
      const speed = 800;

      counters.forEach((counter) => {
        const animate = () => {
          const value = +counter.getAttribute("num");
          const data = +counter.innerText;

          const time = value / speed;
          if (data < value) {
            counter.innerText = Math.ceil(data + time);
            setTimeout(animate, 1);
          } else {
            counter.innerText = value;
          }
        };

        animate();
      });
    };
  });
});
