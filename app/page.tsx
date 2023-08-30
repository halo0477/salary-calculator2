"use client";
import { useState } from "react";
import CalculationForm from "./CalculationForm";
import ResultsDisplay from "./ResultsDisplay";

export default function Home() {
  const [inputs, setInputs] = useState({
    bruttoeinkommen: "",
    abrechnungszeitraum: "jaehrlich",
    kirchensteuer: "ja",
    krankenversicherung: "gesetzlich",
    krankenversicherungsbeitrag: "",
  });

  const [results, setResults] = useState({
    bruttoErgebnis: 0,
    kstBeitrag: 0,
    estBeitrag: 0,
    summeSteuern: 0,
    kvpvBeitrag: 0,
    nettoErgebnis: 0,
    monatlichesNettoErgebnis: 0,
    kvpvNachzahlung: 0,
  });

  return (
    <div className="container mx-auto w-full overflow-hidden">
      <div className="flex flex-col p-4 md:p-5">
        <h1 className="justify-center">Einkommenssteuerrechner 2023</h1>
        <br></br>
        <p className="text-lg md:text-base justify-center">
          Dieser Rechner gibt dir einen groben Anhaltspunkt zu deinen Steuern und Abgaben. Der Rechner geht davon aus, dass du kinderlos und
          über 23 Jahre alt bist. Es wird ein Krankenversicherungssatz ohne Anspruch auf Krankengeld von 15,2% und ein
          Pflegeversicherungssatz mit Zuschlag von gesamt 4,0% zur Berechnung verwendet. Weiter wird angenommen, dass du für deine Rente mit
          Kapitalanlageprodukten vorsorgst und nicht in die gesetzliche Rentenkasse einzahlst. Reichensteuer wird ebenfalls nicht berechnet.
          Kirchensteuer wird mit 8% angenommen.
        </p>
      </div>
      <br></br>
      <div className="flex flex-col md:flex-row">
        <div className="w-1/2 p-5">
          <CalculationForm inputs={inputs} setInputs={setInputs} setResults={setResults} />
        </div>
        <div className="w-1/2 p-5">
          <ResultsDisplay results={results} />
        </div>
      </div>
    </div>
  );
}
