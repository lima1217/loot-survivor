"use client";
import { useAccount, useConnectors } from "@starknet-react/core";
import { useState, useEffect } from "react";
import { Button } from "./components/Button";
import HorizontalKeyboardControl from "./components/HorizontalMenu";
import Actions from "./components/Actions";
import Marketplace from "./components/Marketplace";
import Adventurer from "./components/Adventurer";
import Beast from "./components/Beast";
import { displayAddress, padAddress } from "./lib/utils";
import Inventory from "./components/Inventory";
import TransactionHistory from "./components/TransactionHistory";
import TransactionCart from "./components/TransactionCart";
import Upgrade from "./components/Upgrade";
import Intro from "./components/Intro";
import {
  AddDevnetEthButton,
  MintEthButton,
} from "./components/DevnetConnectors";
import Leaderboard from "./components/Leaderboard";
import { TxActivity } from "./components/TxActivity";
import useLoadingStore from "./hooks/useLoadingStore";
import useAdventurerStore from "./hooks/useAdventurerStore";
import usePrevious from "use-previous";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  getAdventurerById,
  getBattleByTxHash,
  getLastDiscovery,
  getDiscoveryByTxHash,
  getAdventurersByOwner,
  getLatestMarketItems,
  getLatestMarketItemsNumber,
} from "./hooks/graphql/queries";
import useUIStore from "./hooks/useUIStore";
import useIndexerStore from "./hooks/useIndexerStore";
import useTransactionCartStore from "./hooks/useTransactionCartStore";
import SpriteAnimation from "./components/SpriteAnimation";
import { CSSTransition } from "react-transition-group";
import { NotificationDisplay } from "./components/NotificationDisplay";
import { useMusic, musicSelector } from "./hooks/useMusic";
import { testnet_addr } from "./lib/constants";
import { NullAdventurer } from "./types";
import useCustomQuery from "./hooks/useCustomQuery";
import { useQueriesStore } from "./hooks/useQueryStore";

export default function Home() {
  const { disconnect } = useConnectors();
  const { account } = useAccount();
  const [isMuted, setIsMuted] = useState(false);

  const hash = useLoadingStore((state) => state.hash);
  const loading = useLoadingStore((state) => state.loading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);
  const loadingQuery = useLoadingStore((state) => state.loadingQuery);
  const type = useLoadingStore((state) => state.type);
  const notificationData = useLoadingStore((state) => state.notificationData);
  const showNotification = useLoadingStore((state) => state.showNotification);
  const adventurer = useAdventurerStore((state) => state.adventurer);
  const setAdventurer = useAdventurerStore((state) => state.setAdventurer);
  const calls = useTransactionCartStore((state) => state.calls);
  const onboarded = useUIStore((state) => state.onboarded);
  const setOnboarded = useUIStore((state) => state.setOnboarded);
  const setIndexer = useIndexerStore((state) => state.setIndexer);

  const upgrade = adventurer?.upgrading;

  const { data, isDataUpdated, refetch } = useQueriesStore();

  useCustomQuery("adventurersByOwnerQuery", getAdventurersByOwner, {
    owner: padAddress(account?.address ?? ""),
  });
  useCustomQuery("adventurerByIdQuery", getAdventurerById, {
    id: padAddress(account?.address ?? ""),
  });
  useCustomQuery("adventurersByGoldQuery", getAdventurerById);

  useCustomQuery("latestMarketItemsNumberQuery", getLatestMarketItemsNumber);

  const latestMarketItemsNumber = data.latestMarketItemsNumberQuery
    ? data.latestMarketItemsNumberQuery.market[0]?.itemsNumber
    : [];

  useCustomQuery("latestMarketItemsQuery", getLatestMarketItems, {
    itemsNumber: latestMarketItemsNumber,
  });

  useCustomQuery("battlesByTxHashQuery", getBattleByTxHash, {
    txHash: padAddress(hash),
  });

  useCustomQuery("discoveryByTxHashQuery", getDiscoveryByTxHash, {
    txHash: padAddress(hash),
  });

  const { play, stop } = useMusic(musicSelector.backgroundMusic, {
    volume: 0.5,
    loop: true,
    isMuted: isMuted,
  });

  useEffect(() => {
    // play();

    return () => {
      stop();
    };
  }, [play, stop]);

  const [menu, setMenu] = useState([
    {
      id: 1,
      label: "Start",
      value: "start",
    },
  ]);

  const [selected, setSelected] = useState(menu[0].value);

  useEffect(() => {
    if (!adventurer || adventurer?.health == 0) {
      setSelected(menu[0].value);
    }
  }, [adventurer]);

  useEffect(() => {
    if (!account?.address) {
      setOnboarded(false);
    }
  }, [account]);

  useEffect(() => {
    setIndexer(
      (account as any)?.baseUrl == testnet_addr ||
        (account as any)?.provider?.baseUrl == "https://alpha4.starknet.io"
        ? "https://survivor-indexer.bibliothecadao.xyz:8080/devnet-graphql"
        : "https://survivor-indexer.bibliothecadao.xyz:8080/goerli-graphql"
    );
  }, [account]);

  useEffect(() => {
    let newMenu = [
      {
        id: 1,
        label: "Start",
        value: "start",
      },
    ];

    if (adventurer && adventurer.health > 0) {
      newMenu = [
        ...newMenu,
        {
          id: 2,
          label: "Actions",
          value: "actions",
        },
        {
          id: 3,
          label: "Market",
          value: "market",
        },
        {
          id: 4,
          label: "Inventory",
          value: "inventory",
        },
        {
          id: 5,
          label: "Beast",
          value: "beast",
        },
        {
          id: 6,
          label: "Leaderboard",
          value: "leaderboard",
        },
      ];
    }

    setMenu(newMenu);
  }, [adventurer, account]);

  const updatedAdventurer = data.adventurerByIdQuery
    ? data.adventurerByIdQuery.adventurers[0]
    : NullAdventurer;

  console.log(data);
  console.log(loading);

  useEffect(() => {
    setAdventurer(updatedAdventurer);
  }, [updatedAdventurer]);

  console.log(
    loadingQuery && isDataUpdated[loadingQuery],
    data.discoveryByTxHashQuery
  );

  useEffect(() => {
    if (loading && loadingQuery && isDataUpdated[loadingQuery]) {
      if (type == "Attack" || type == "Flee") {
        console.log("here");
        refetch("battlesByTxHashQuery");
        if (data?.battlesByTxHashQuery) {
          stopLoading({
            data: data.battlesByTxHashQuery.battles,
            beastName: notificationData.beastName,
          });
        }
      } else if (type == "Explore") {
        refetch("discoveryByTxHashQuery");
        stopLoading(data.discoveryByTxHashQuery);
      } else {
        stopLoading(notificationData);
      }
    }
  }, [loading, loadingQuery, stopLoading, data]);

  return (
    <main className={`min-h-screen container mx-auto flex flex-col p-10`}>
      {onboarded ? (
        <>
          <div className="flex justify-between w-full ">
            <h1 className="glitch">Loot Survivors</h1>
            <div className="flex flex-row self-end gap-2">
              <TxActivity />
              <Button onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? "Unmute" : "Mute"}
              </Button>
              {account && calls.length > 0 && <TransactionCart />}
              {account && <TransactionHistory />}
              {(account as any)?.baseUrl == testnet_addr && (
                <AddDevnetEthButton />
              )}
              {(account as any)?.baseUrl == testnet_addr && <MintEthButton />}
              {account && (
                <Button onClick={() => disconnect()}>
                  {displayAddress(account.address)}
                </Button>
              )}
            </div>
          </div>
          <div className="w-full h-6 my-2 bg-terminal-green" />
          <CSSTransition
            in={showNotification}
            timeout={500}
            classNames="notification"
            unmountOnExit
          >
            <div className="fixed flex flex-row border rounded-lg border-terminal-green w-1/4 bg-terminal-black p-2 top-5 gap-5">
              <NotificationDisplay
                type={type}
                notificationData={notificationData}
              />
            </div>
          </CSSTransition>

          {account ? (
            <div className="flex-grow w-full">
              {!upgrade ? (
                <>
                  <div className="gap-10 pb-2">
                    <HorizontalKeyboardControl
                      buttonsData={menu}
                      onButtonClick={(value) => {
                        setSelected(value);
                      }}
                    />
                  </div>

                  {selected === "start" && <Adventurer />}
                  {selected === "actions" && <Actions />}
                  {selected === "market" && <Marketplace />}
                  {selected === "inventory" && <Inventory />}
                  {selected === "beast" && <Beast />}
                  {selected === "leaderboard" && <Leaderboard />}
                </>
              ) : (
                <Upgrade />
              )}
            </div>
          ) : null}
        </>
      ) : (
        <Intro />
      )}
    </main>
  );
}
