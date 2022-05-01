$(document).ready(function () {
  function formatDateString(day, month, year) {
    month = parseInt(month) + 1; // We add one because the value of xml starts of 0. For example January is in zero position.
    const d = new Date(`${year}-${month}-${day}`);
    console.log(d);
    const years = d.getFullYear();
    const date = d.getDate();
    const months = d.getMonth() + 1;
    console.log(months);
    const formattedDate = `${date}/${months}/${years}`;
    return formattedDate;
  }
  // Handler for .ready() called.
  $("#xmlupload").change(function () {
    var file = document.getElementById("xmlupload").files[0];
    //You could insert a check here to ensure proper file type
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = function () {
      var xmlData = $(reader.result);
      console.log(xmlData);
      //   console.log(xmlData);
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
      const personName = personDetails.childNodes[0];
      const startYear = personDetails.childNodes[1];
      const startMonth = personDetails.childNodes[2];
      const startDay = personDetails.childNodes[3];
      const endYear = personDetails.childNodes[4];
      const endMonth = personDetails.childNodes[5];
      const endDay = personDetails.childNodes[6];
      const soma = personDetails.childNodes[7];
      // ARMY = 0; NAVY = 1; HAF = 2;
      const oplo_stratou = personDetails.childNodes[8]; // It returns value only on ξηρά..
      const seira = personDetails.childNodes[9];
      const esso = personDetails.childNodes[10];
      const prison = personDetails.childNodes[11];
      const notLetMeOut = personDetails.childNodes[12];
      arrayServices.forEach((element) => {
        let yp_name = element.childNodes[0].innerText;
        let yp_year = element.childNodes[1].innerText;
        let yp_month = element.childNodes[2].innerText;
        let yp_day = element.childNodes[3].innerText;
        let number = element.childNodes[4].innerText;
      });
      arrayAdeies.forEach((element) => {
        let adeiaName = element.childNodes[0].innerText;
        let adeiaYear = element.childNodes[1].innerText;
        let adeiaMonth = element.childNodes[2].innerText;
        let adeiaDay = element.childNodes[3].innerText;
      });
      poreies.forEach((element) => {
        let poreiaName = element.childNodes[0].innerText;
        let poreiaYear = element.childNodes[1].innerText;
        let poreiaMonth = element.childNodes[2].innerText;
        let adeiaDay = element.childNodes[3].innerText;
      });
    };
  });
});
