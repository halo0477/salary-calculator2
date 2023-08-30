interface ResultsDisplayProbs {
  results: {
    bruttoErgebnis: number;
    kstBeitrag: number;
    estBeitrag: number;
    summeSteuern: number;
    kvpvBeitrag: number;
    nettoErgebnis: number;
    monatlichesNettoErgebnis: number;
    kvpvNachzahlung: number;
  };
}

const ResultsDisplay: React.FC<ResultsDisplayProbs> = ({ results }) => {
  return (
    <>
      <h3>Ergebnisse</h3>
      <br></br>
      <ul>
        <li>Bruttoeinkommen: {Math.floor(results.bruttoErgebnis)} Euro</li>
        <br></br>
        <li>Kirchensteuer: {Math.floor(results.kstBeitrag)} Euro</li>
        <li>Einkommenssteuer: {Math.floor(results.estBeitrag)} Euro</li>
        <br></br>
        <li>Summe Steuern: {Math.floor(results.summeSteuern)} Euro</li>
        <br></br>
        <li>Kranken- & Pflegeversicherung: {Math.floor(results.kvpvBeitrag)} Euro</li>
        <br></br>
        <li>Nettoeinkommen: {Math.floor(results.nettoErgebnis)} Euro</li>
        <li>Monatliches Nettoeinkommen: {Math.floor(results.monatlichesNettoErgebnis)} Euro</li>
        <br></br>
        <br></br>
        <h3>Offene Zahlungen</h3>
        <br></br>
        <li>Nachzahlung Kranken- & Pflegeversicherung: {Math.floor(results.kvpvNachzahlung)} Euro</li>
        <li>Zahlung Einkommenssteuer: {Math.floor(results.estBeitrag)} Euro</li>
        <li>Zahlung Kirchensteuer: {Math.floor(results.kstBeitrag)} Euro</li>
      </ul>
    </>
  );
};

export default ResultsDisplay;
