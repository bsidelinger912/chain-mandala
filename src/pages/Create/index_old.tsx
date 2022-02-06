/**
 * @class Create
 * @description
 */

import React from 'react';
import Mandala from './Mandala';
import Palette from './Palette';

const Create: React.FC = () => {
  const [birthDate, setBirthDate] = React.useState(24);

  return (
    <div className="App-main">
      <div><Mandala birthDate={birthDate} /></div>

      <div className="App-main-right">
        <form>
          <label htmlFor="birthday">
            What day of the month were you born?
            <select
              name="birthday"
              id="birthday"
              onChange={(e) => {
                const stringValue = e.target.value;
                const numberValue = parseInt(stringValue, 10);
                setBirthDate(numberValue);
              }}
            >
              {Array.from(Array(31).keys()).map((key) => <option key={key + 1} value={key + 1}>{key + 1}</option>)}
            </select>
          </label>
        </form>
        <span>Your colors:</span>
        <Palette birthDate={birthDate} />
      </div>
    </div>
  );
};

export default Create;
