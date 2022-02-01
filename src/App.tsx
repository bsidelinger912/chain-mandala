import React from 'react';

import './App.css';

import Mandala from './Mandala';
import Palette from './Palette';
// import { WindowWithWeb3 } from './types';

// const web3 = (window as unknown as WindowWithWeb3).AlchemyWeb3.createAlchemyWeb3(process.env.API_URL as string);

// // eslint-disable-next-line @typescript-eslint/no-var-requires, import/extensions
// const contract = require('./OnChainNFT.json');

// const contractAddress = '0x8272a54660b9ffb18d93e591d2d88c4e7ef27cd5';
// const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

const App: React.FC = () => {
  const [accounts, setAccounts] = React.useState<any[]>();
  // const [metaData, setMetaData] = React.useState<string>();

  const [birthDate, setBirthDate] = React.useState(24);

  const connectWallet = async (): Promise<void> => {
    const updatedAccounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    setAccounts(updatedAccounts);
  };

  // const submit: React.FormEventHandler<HTMLFormElement> = async (e) => {
  //   e.preventDefault();

  //   if (!accounts) {
  //     throw new Error('accounts lost');
  //   }

  //   const nonce: number = await web3.eth.getTransactionCount(accounts[0], 'latest');

  //   // the transaction
  //   const tx = {
  //     from: accounts[0],
  //     to: contractAddress,
  //     nonce: nonce.toString() as unknown as number, // TODO: why are the types wrong???
  //     gas: '20000000',
  //     data: nftContract.methods.mintNFT(accounts[0], metaData).encodeABI(),
  //   };

  //   const gasEstimate = await web3.eth.estimateGas(tx);

  //   console.log(gasEstimate);

  //   console.log('making request....');

  //   const txHash = await (window as any).ethereum.request({
  //     method: 'eth_sendTransaction',
  //     params: [tx],
  //   });

  //   console.log('***** Success, hash is: ', txHash);
  // };

  return (
    <div className="App">
      <div className="App-body">
        <header className="App-header">
          <h1 className="App-header-title">On-chain NFT</h1>
          <div className="App-header-right">
            {accounts ? <span>you connected</span> : <button type="button" className="button" onClick={connectWallet}>Connect wallet</button>}
          </div>
        </header>
        <div className="App-main">
          <div><Mandala birthDate={birthDate} account={accounts?.[0]} /></div>

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
                  {Array.from(Array(31).keys()).map((key) => <option value={key + 1}>{key + 1}</option>)}
                </select>
              </label>
            </form>
            <span>Your colors:</span>
            <Palette birthDate={birthDate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
