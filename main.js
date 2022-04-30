$(document).ready(function () {
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
      let ypiresies = xmlData.getElementsByTagName("ipiresia");
      let details = xmlData.getElementsByTagName("stoixeia");
      let adeies = xmlData.getElementsByTagName("adeia");
      let poreia = xmlData.getElementsByTagName("poreia");
      let simioseis = xmlData.getElementsByTagName("simioseis");
      let personDetails = Array.from(details);
      personDetails = personDetails[0];
      let arrayServices = Array.from(ypiresies);
      let arrayAdeies = Array.from(adeies);
      let poreies = Array.from(poreia);
      simioseis = simioseis[0].childNodes;
      let asm = simioseis[5].innerText;
      let personName = personDetails.childNodes[0];
      let startYear = personDetails.childNodes[1];
      let startMonth = personDetails.childNodes[2];
      let startDay = personDetails.childNodes[3];
      let endYear = personDetails.childNodes[4];
      let endMonth = personDetails.childNodes[5];
      let endDay = personDetails.childNodes[6];
      let soma = personDetails.childNodes[7];
      // ARMY = 0; NAVY = 1; HAF = 2;
      let oplo_stratou = personDetails.childNodes[8]; // It returns value only on ξηρά..
      let seira = personDetails.childNodes[9];
      let esso = personDetails.childNodes[10];
      let prison = personDetails.childNodes[11];
      let notLetMeOut = personDetails.childNodes[12];
      arrayServices.forEach((element) => {
        let yp_name = element.childNodes[0].innerText;
        let yp_year = element.childNodes[1].innerText;
        let yp_month = element.childNodes[2].innerText;
        let yp_day = element.childNodes[3].innerText;
        let number = element.childNodes[4].innerText;
      });
      arrayAdeies.forEach((element) => {
        let adeiaName = element.childNodes[0].innerText;
        console.log(adeiaName);
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
