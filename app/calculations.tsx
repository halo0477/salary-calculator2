export const calculateResults = (data: {
  bruttoeinkommen: string;
  abrechnungszeitraum: string;
  kirchensteuer: string;
  krankenversicherung: string;
  krankenversicherungsbeitrag: string;
}) => {
  let bruttoErgebnis = 0;
  let kstBeitrag = 0;
  let estBeitrag = 0;
  let summeSteuern = 0;
  let kvpvBeitrag = 0;
  let nettoErgebnis = 0;
  let monatlichesNettoErgebnis = 0;
  let kvpvNachzahlung = 0;

  let kvpvVorauszahlung = Number(data.krankenversicherungsbeitrag) * 12;

  if (data.abrechnungszeitraum === "jaehrlich") {
    bruttoErgebnis = Number(data.bruttoeinkommen);
  } else {
    bruttoErgebnis = Number(data.bruttoeinkommen) * 12;
  }

  if (data.krankenversicherung === "gesetzlich") {
    kvpvBeitrag = 0.192 * bruttoErgebnis;

    if (kvpvBeitrag > 4987.5) {
      kvpvBeitrag = 4987.5;
    }
    if (kvpvBeitrag < 1131.67) {
      kvpvBeitrag = 1131.67;
    }

    kvpvNachzahlung = kvpvBeitrag - kvpvVorauszahlung;
  } else {
    kvpvBeitrag = Number(data.krankenversicherungsbeitrag) * 12;
  }

  const einkommen = bruttoErgebnis - kvpvBeitrag;

  if (einkommen <= 10908) {
    // Keine Steuer in dieser Zone
  } else if (einkommen <= 15999) {
    // Steuersatz steigt linear von 14% bei 10909€ bis 24% bei 15999€
    const steuerInDieserZone = 0.14 * (einkommen - 10909) + (0.1 * (einkommen - 10909) * (einkommen - 10909)) / (2 * (15999 - 10909));
    estBeitrag += steuerInDieserZone;
  } else if (einkommen <= 62809) {
    // Zuerst den vollen Betrag für Tarifzone 2 hinzufügen
    estBeitrag += 0.14 * (15999 - 10909) + (0.1 * (15999 - 10909) * (15999 - 10909)) / (2 * (15999 - 10909));
    // Steuersatz steigt linear von 24% bei 16000€ bis 42% bei 62809€
    const steuerInDieserZone = 0.24 * (einkommen - 16000) + (0.18 * (einkommen - 16000) * (einkommen - 16000)) / (2 * (62809 - 16000));
    estBeitrag += steuerInDieserZone;
  } else if (einkommen <= 277825) {
    // Fügen Sie den vollen Betrag für die vorherigen Zonen hinzu
    estBeitrag += 0.14 * (15999 - 10909) + (0.1 * (15999 - 10909) * (15999 - 10909)) / (2 * (15999 - 10909));
    estBeitrag += 0.24 * (62809 - 16000) + (0.18 * (62809 - 16000) * (62809 - 16000)) / (2 * (62809 - 16000));
    // 42% für Einkommen in dieser Zone
    estBeitrag += 0.42 * (einkommen - 62809);
  } else {
    // Fügen Sie den vollen Betrag für die vorherigen Zonen hinzu
    estBeitrag += 0.14 * (15999 - 10909) + (0.1 * (15999 - 10909) * (15999 - 10909)) / (2 * (15999 - 10909));
    estBeitrag += 0.24 * (62809 - 16000) + (0.18 * (62809 - 16000) * (62809 - 16000)) / (2 * (62809 - 16000));
    estBeitrag += 0.42 * (277825 - 62809);
    // 45% für Einkommen in dieser Zone
    estBeitrag += 0.45 * (einkommen - 277825);
  }

  if (data.kirchensteuer === "ja") {
    // 8% der Einkommenssteuer
    kstBeitrag = 0.08 * estBeitrag;
  }

  summeSteuern = estBeitrag + kstBeitrag;

  nettoErgebnis = einkommen - summeSteuern;

  monatlichesNettoErgebnis = nettoErgebnis / 12;

  const calculatedResults = {
    bruttoErgebnis,
    kstBeitrag,
    estBeitrag,
    summeSteuern,
    kvpvBeitrag,
    nettoErgebnis,
    monatlichesNettoErgebnis,
    kvpvNachzahlung,
  };

  return calculatedResults;
};
