import React, { useState } from "react";
import Web3 from "web3";

const ConnectToMetaMask = () => {
  const [account, setAccount] = useState("");

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Erreur lors de la connexion à MetaMask:", error);
      }
    } else {
      alert("Veuillez installer MetaMask pour utiliser cette fonctionnalité.");
    }
  };

  return (
    <div>
      <button onClick={connectToMetaMask}>
        {account ? `Connecté: ${account}` : "Se connecter à MetaMask"}
      </button>
    </div>
  );
};

export default ConnectToMetaMask;
