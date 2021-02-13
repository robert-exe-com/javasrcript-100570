function kosztykredytu() {

    const szczegoly = document.getElementById("szczegoly_kredytu");
    const opis = document.getElementById("opis_rat");
    opis.innerHTML = "";
    szczegoly.innerHTML = "";

    let kwota = parseFloat(document.getElementById("kwota_pole_id").value);
    let okres = parseFloat(document.getElementById("okres_pole_id").value);
    let opr = parseFloat(document.getElementById("oprocentowanie_pole_id").value);
    let prow = parseFloat(document.getElementById("prowizja_pole_id").value);

    let prowizja = kwota * (prow / 100);
    let kwota_z_prowizja = kwota + prowizja;
    let z_kwota_z_prowizja = kwota_z_prowizja.toFixed(8);
    let oprocentowanie_miesieczne = (opr / 100) / 12;
    let q = 1 + oprocentowanie_miesieczne;
    let z_q = q.toFixed(8);

    // q^okres 
    let q_okres = Math.pow(q, okres);
    let z_q_okres = q_okres.toFixed(16);

    //      WZÓR
    //
    // q = [1 + oprocentowanie_miesieczne]
    //  RATA = kwota_z_prowizja * q^okres * [(q - 1) / (q^okres - 1)]

    let rata = z_kwota_z_prowizja * z_q_okres * (z_q - 1) / (z_q_okres - 1);
    let z_rata = rata.toFixed(2);

    let kwota_brutto = z_rata * okres;  
    let kwota_calkowita = (rata * okres).toFixed(2);

    if ((kwota >= 300 && kwota <= 1800000) && (okres >= 3 && okres <= 180) && (opr >= 0 && opr <= 7.2) && (prow >= 0 && prow <= 25)) {

        let tablica = [
            ['Kwota kredytu: ', kwota + ' PLN','Rata kredytu: ', z_rata + ' PLN'],
            ['Okres kredytowania: ', okres + ' MSC','Kwota prowizji: ',prow + ' PLN'],
            ['Oprocentowanie:',opr + '%','Kwota brutto kredytu: ',kwota_z_prowizja + ' PLN'],
            ['Prowizja:',prow + '%','Całkowity kosz kredytu: ', kwota_calkowita + ' PLN']  
        ]

        szczegoly.style.display = "block";
        let html_tabela = '<table class="tabela">';

        for(let i=0;i<tablica.length;i++)
        {
            html_tabela += '<tr>';
            for(let j=0;j<tablica[i].length;j++)
            {
                html_tabela += '<td>' + tablica[i][j]  + '</td>';
            }
            html_tabela += '</tr>';
        }
        html_tabela += '</table>';
        szczegoly.innerHTML=html_tabela;
    }

    let nowa_rata = rata;
    let nowa_kwota = kwota_z_prowizja;
    let czesc_odsetkowa = (nowa_kwota * oprocentowanie_miesieczne).toFixed(2);
    let czesc_kapitalowa = (nowa_rata - czesc_odsetkowa).toFixed(2);
    const doc = opis;

    for (let i = 1; i <= okres; i++) {
        doc.innerHTML = doc.innerHTML +
            '<table class="tabela" id="tabela_raty">' +
            '<tr>' +
            '<td>' + i + '. ' + '</td>' + '<td>' + 'Kwota kapitału: ' + nowa_kwota + '</td>' + '<td>' + ' Część kapitałowa: ' + czesc_kapitalowa + '</td>' + '<td>' + ' Część: odsetkowa ' + czesc_odsetkowa + '</td>' + '<td>' + ' Rata: ' + z_rata + '</td>' +
            '</tr>' +
            '</table>';

        nowa_kwota = (nowa_kwota - czesc_kapitalowa).toFixed(2);
        czesc_odsetkowa = (nowa_kwota * oprocentowanie_miesieczne).toFixed(2);
        czesc_kapitalowa = (nowa_rata - czesc_odsetkowa).toFixed(2);
    }
}
