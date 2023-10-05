import { useAccount } from "@starknet-react/core";
import useUIStore from "../hooks/useUIStore";
import { Button } from "./buttons/Button";
import { useConnectors } from "@starknet-react/core";
import Storage from "../lib/storage";
import { BurnerStorage } from "../types";
import { useBurner } from "../lib/burner";

export const TopUpDialog = () => {
  const { account: walletAccount, address, connector } = useAccount();
  const { connect, connectors } = useConnectors();
  const showTopUpDialog = useUIStore((state) => state.showTopUpDialog);
  const topUpAccount = useUIStore((state) => state.topUpAccount);
  const setTopUpAccount = useUIStore((state) => state.setTopUpAccount);
  const { topUp, isToppingUp } = useBurner();

  const arcadeConnectors = () =>
    connectors.filter(
      (connector) =>
        typeof connector.id === "string" && connector.id.includes("0x")
    );

  const walletConnectors = () =>
    connectors.filter(
      (connector) =>
        typeof connector.id !== "string" || !connector.id.includes("0x")
    );

  let storage: BurnerStorage = Storage.get("burners") || {};
  const masterConnected = address === storage[topUpAccount]?.masterAccount;

  const arcadeConnector = arcadeConnectors().find(
    (connector) => connector.name === topUpAccount
  );

  console.log(arcadeConnector);
  console.log(masterConnected);

  return (
    <>
      <div className="fixed inset-0 opacity-80 bg-terminal-black z-40" />
      <div className="fixed text-center sm:top-1/8 sm:left-1/8 sm:left-1/4 sm:w-3/4 sm:w-1/2 h-3/4 border-4 bg-terminal-black z-50 border-terminal-green p-4 overflow-y-auto">
        <h3 className="mt-4">Top Up Required</h3>
        <p className="m-2 text-sm xl:text-xl 2xl:text-2xl">
          You have run out of ETH to pay for gas in your Arcade Account, connect
          to the master account and top it up!
        </p>
        <div className="flex flex-col items-center gap-5">
          <p className="m-2 text-sm xl:text-xl 2xl:text-2xl">Connect Master</p>
          {walletConnectors().map((connector, index) => (
            <Button
              disabled={masterConnected}
              onClick={() => connect(connector)}
              key={index}
            >
              {connector.id === "braavos" || connector.id === "argentX"
                ? `Connect ${connector.id}`
                : "Login With Email"}
            </Button>
          ))}
          <p className="m-2 text-sm xl:text-xl 2xl:text-2xl">
            Top Up (0.001ETH)
          </p>
          <Button
            disabled={!masterConnected || isToppingUp}
            onClick={async () => {
              await topUp(topUpAccount, walletAccount!);
              setTopUpAccount("");
              connect(arcadeConnector!);
              showTopUpDialog(false);
            }}
          >
            {masterConnected ? (
              isToppingUp ? (
                <span className="loading-ellipsis">Topping Up</span>
              ) : (
                "Top Up"
              )
            ) : (
              "Connect Master"
            )}
          </Button>
          <Button onClick={() => showTopUpDialog(false)}>Close</Button>
        </div>
      </div>
    </>
  );
};