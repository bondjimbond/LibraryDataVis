

//Values to change!

FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdLLaOEiSCgDeuPAfGkf5k1A01PdrGCCiqPnow0flw4Ns8IlQ/viewform";
CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQYn5XNiBjF83Dz3kr6oCgcjGYj-0fXG4oVSogotg1O6YQ7UdATW7ugcUWCER0Hxyok4h1aomSfif9q/pub?output=csv";

function loadGoogleSpreadsheet(CSV_URL) {

	d3.csv(CSV_URL);

}


