import { calculateResults } from "./calculations";

interface CalculationFormProbs {
  inputs: {
    bruttoeinkommen: string;
    abrechnungszeitraum: string;
    kirchensteuer: string;
    krankenversicherung: string;
    krankenversicherungsbeitrag: string;
  };
  setInputs: {
    (prevState: any): void;
  };
  setResults: {
    (prevState: any): void;
  };
}

const CalculationForm: React.FC<CalculationFormProbs> = ({ inputs, setInputs, setResults }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isRadioChecked = (inputName: keyof typeof inputs, inputValue: string): boolean => {
    return inputs[inputName] === inputValue;
  };

  const handleSubmit = () => {
    const results = calculateResults(inputs);
    setResults(results);
  };

  return (
    <form className="space-y-4">
      <h3>Berechnung</h3>
      <div>
        <label htmlFor="bruttoeinkommen" className="block text-sm font-medium text-gray-700">
          Dein zu versteuerndes Einkommen:
        </label>
        <input
          type="text"
          id="bruttoeinkommen"
          name="bruttoeinkommen"
          className="mt-1 p-2 w-full border rounded-md"
          value={inputs.bruttoeinkommen}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <span className="block text-sm font-medium text-gray-700">Abrechnungszeitraum:</span>

        <label htmlFor="abrechnungszeitraum" className="inline-flex items-center ml-2">
          <input
            type="radio"
            id="abrechnungszeitraum1"
            name="abrechnungszeitraum"
            className="form-radio"
            value="monatlich"
            defaultChecked={isRadioChecked("abrechnungszeitraum", "monatlich")}
            onChange={handleInputChange}
          />
          <span className="ml-2">Monatlich</span>
        </label>

        <label htmlFor="abrechnungszeitraum2" className="inline-flex items-center ml-4">
          <input
            type="radio"
            id="abrechnungszeitraum2"
            name="abrechnungszeitraum"
            className="form-radio"
            value="jaehrlich"
            defaultChecked={isRadioChecked("abrechnungszeitraum", "jaehrlich")}
            onChange={handleInputChange}
          />
          <span className="ml-2">Jährlich</span>
        </label>
      </div>
      <div>
        <span className="block text-sm font-medium text-gray-700">Kirchensteuer:</span>

        <label htmlFor="kirchensteuer1" className="inline-flex items-center ml-2">
          <input
            type="radio"
            id="kirchensteuer1"
            name="kirchensteuer"
            className="form-radio"
            value="ja"
            defaultChecked={isRadioChecked("kirchensteuer", "ja")}
            onChange={handleInputChange}
          />
          <span className="ml-2">Ja</span>
        </label>

        <label htmlFor="kirchensteuer2" className="inline-flex items-center ml-4">
          <input
            type="radio"
            id="kirchensteuer2"
            name="kirchensteuer"
            className="form-radio"
            value="nein"
            defaultChecked={isRadioChecked("kirchensteuer", "nein")}
            onChange={handleInputChange}
          />
          <span className="ml-2">Nein</span>
        </label>
      </div>
      <div>
        <span className="block text-sm font-medium text-gray-700">Deine Krankenversicherung:</span>

        <label htmlFor="krankenversicherung1" className="inline-flex items-center ml-2">
          <input
            type="radio"
            id="krankenversicherung1"
            name="krankenversicherung"
            className="form-radio"
            value="gesetzlich"
            defaultChecked={isRadioChecked("krankenversicherung", "gesetzlich")}
            onChange={handleInputChange}
          />
          <span className="ml-2">Gesetzlich</span>
        </label>

        <label htmlFor="krankenversicherung2" className="inline-flex items-center ml-4">
          <input
            type="radio"
            id="krankenversicherung2"
            name="krankenversicherung"
            className="form-radio"
            value="privat"
            defaultChecked={isRadioChecked("krankenversicherung", "privat")}
            onChange={handleInputChange}
          />
          <span className="ml-2">Privat</span>
        </label>
      </div>
      <div>
        <label htmlFor="krankenversicherungsbeitrag" className="block text-sm font-medium text-gray-700">
          Dein monatlicher Beitrag zur Krankenkasse:
        </label>
        <input
          type="text"
          id="krankenversicherungsbeitrag"
          name="krankenversicherungsbeitrag"
          className="mt-1 p-2 w-full border rounded-md"
          value={inputs.krankenversicherungsbeitrag}
          onChange={handleInputChange}
        />
      </div>
      <button type="button" className="mt-5 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>
        Berechnen
      </button>
    </form>
  );
};

export default CalculationForm;
