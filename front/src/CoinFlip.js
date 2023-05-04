import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Web3 from "web3";
import CoinFlipContract from './contract.json';
import detectEthereumProvider from '@metamask/detect-provider';
import ConnectMetamask from "./ConnectMetamask";

const CoinFlip = () => {
  const [userChoice, setUserChoice] = useState("");
  const [coinSide, setCoinSide] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  const contractAddress = "0xA911FEAf35e10F840c027d3B6Affc42Ebc783Ce0";
  const CoinFlipABI = CoinFlipContract.abi;

  useEffect(() => {
    async function initWeb3() {
      const provider = await detectEthereumProvider();

      if (provider) {
        const web3Instance = new Web3(provider);
        setWeb3(web3Instance);

        const contractInstance = new web3Instance.eth.Contract(
          CoinFlipABI,
          contractAddress
        );
        setContract(contractInstance);
      } else {
        console.error("Please install MetaMask or another compatible wallet.");
      }
    }

    initWeb3();
  }, []);

  const flipCoin = async (choice) => {
    try {
      setIsFlipping(true);
  
      const provider = await detectEthereumProvider();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(CoinFlipABI, contractAddress);
  
      const tx = await contract.methods.flip(choice).send({
        from: accounts[0],
        value: web3.utils.toWei("0.001", "ether")
      });
  
      contract.events.CoinFlipRequest({}, (error, event) => {
        if (error) {
          console.error("Error in CoinFlipRequest event:", error);
        } else {
          console.log("CoinFlipRequest event received, requestId:", event.returnValues.requestId.toString());
        }
      });
  
      contract.events.CoinFlipResult({}, (error, event) => {
        if (error) {
          console.error("Error in CoinFlipResult event:", error);
        } else {
          const { requestId, didWin } = event.returnValues;
          setCoinSide(didWin ? "Pile" : "Face");
          setIsFlipping(false);
          console.log("CoinFlipResult event received, requestId:", requestId.toString(), "didWin:", didWin);
        }
      });
  
    } catch (error) {
      console.error("Error flipping coin:", error.message);
      setIsFlipping(false);
    }
  };

  return (
    <div className="container">
      <ConnectMetamask />

      <h1>Pile ou Face</h1>
      <div className="coin-container">
        <motion.div
          className={`coin ${isFlipping ? "flipping" : ""}`}
          animate={{
            rotate: isFlipping ? 360 * 3 : 0,
          }}
          transition={{ duration: 1 }}
        >
          {coinSide}
        </motion.div>
      </div>
      <div className="user-choice">
        <button onClick={() => flipCoin(0)}>Heads</button>
        <button onClick={() => flipCoin(1)}>Tails</button>
      </div>
      {/* <button onClick={flipCoin} disabled={!userChoice}>
        Lancer la pièce
      </button> */}
    </div>
  );
};

export default CoinFlip;
