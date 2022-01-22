import React from 'react';
import './App.css';

const web3 = (window as any).AlchemyWeb3.createAlchemyWeb3('https://eth-ropsten.alchemyapi.io/v2/key');
const contract = require("./MyNFT.json")
const contractAddress = ""
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

function App() {
  const [accounts, setAccounts] = React.useState<any[]>();
  const [metaData, setMetaData] = React.useState<string>();

  const connectWallet = async () => {
    const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
    setAccounts(accounts);
  }

  const changeText: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMetaData(e.currentTarget.value.trim())
  }

  const submit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!accounts) {
      throw new Error('accounts lost')
    }

    const nonce: number = await web3.eth.getTransactionCount(accounts[0], 'latest');

    //the transaction
    const tx = {
      'from': accounts[0],
      'to': contractAddress,
      'nonce': nonce.toString(),
      'gas': '20000000',
      'data': nftContract.methods.mintNFT(accounts[0], metaData).encodeABI()
    };

    const gasEstimate = await web3.eth.estimateGas(tx);

    console.log(gasEstimate);

    console.log('making request....');

    const txHash = await (window as any).ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx],
    });

    console.log('***** Success, hash is: ', txHash);
  }
  
  return (
    <div className="App">
      <div className="App-body">
        <header className="App-header">
          <h1 className="App-header-title">On-chain NFT</h1>
          <div className="App-header-right">
            {accounts ? <span>you connected</span> : <button className="button" onClick={connectWallet}>Connect wallet</button>}
          </div>
        </header>
        {accounts && (
          <form onSubmit={submit}>
            <textarea className="input" onChange={changeText} rows={20} />
            <button type="submit" className="button">Mint my NFT</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
