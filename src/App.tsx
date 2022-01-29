import React from 'react';

import './App.css';
// import CanvasDraw from './CanvasDraw';
import Mandala from './Mandala';
// import SVG from './SVG';

const web3 = (window as any).AlchemyWeb3.createAlchemyWeb3(process.env.API_URL);
const contract = require("./OnChainNFT.json");
const contractAddress = "0x8272a54660b9ffb18d93e591d2d88c4e7ef27cd5";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

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

  // React.useEffect(() => {
  //   (async function getURI() {
  //     // const tokenURI = await nftContract.methods.tokenURI(1).call();
  //     // console.log(tokenURI);

  //     var canvas = document.getElementById("canvas") as any;
  //     var ctx = canvas.getContext("2d");
  //     var img = new Image();

  //     img.crossOrigin = "anonymous";

  //     img.onload = function () {

  //         // set size proportional to image
  //         canvas.height = canvas.width * (img.height / img.width);

  //         // step 1 - resize to 50%
  //         var oc = document.createElement('canvas'),
  //             octx = oc.getContext('2d') as any;

  //         oc.width = img.width * 0.5;
  //         oc.height = img.height * 0.5;
  //         octx.drawImage(img, 0, 0, oc.width, oc.height);

  //         // step 2
  //         octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

  //         // step 3, resize to final size
  //         ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5,
  //         0, 0, canvas.width, canvas.height);

  //         console.log(canvas.toDataURL("image/png"))
  //     }
  //     img.src = "//i.imgur.com/SHo6Fub.jpg";
  //   })();
  // });
  
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
        {/* <Canvas /> */}
        <Mandala />
      </div>
    </div>
  );
}

export default App;
