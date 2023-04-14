import { useState, useEffect } from "react";
import OBSWebSocket from "obs-websocket-js";

const obs = new OBSWebSocket();

function OBS() {
  const [connected, setConnected] = useState(false);
  const [currentScene, setCurrentScene] = useState("");

  const connectToOBS = async () => {
    try {
      const {
        obsWebSocketVersion,
        negotiatedRpcVersion,
      } = await obs.connect("ws://localhost:4455", "F0nuxD0RWCqTJCU1", {
        rpcVersion: 1,
      });
      console.log(
        `Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`
      );
      setConnected(true);
    } catch (error) {
      console.error("Failed to connect", error.code, error.message);
    }
  }; 
  
  const liveOnAction = () => {
    console.log("Live ON action triggered");
    // Add your logic for the liveOnAction here
  };
  
  const anotherAction = () => {
    console.log("Another action triggered");
    // Add your logic for the anotherAction here
  };

  const handleCustomEvent = (broadcast) => {
    if (broadcast.realm === "kruiz-control" && typeof broadcast.data.message !== "undefined") {
      console.log("Received custom event:", broadcast.data.message, broadcast.data.data);

      if (broadcast.data.message === "Electron") {
        liveOnAction();
      } else if (broadcast.data.message === "anotherMessage") {
        anotherAction();
      }
      // Trigger any desired actions based on the received custom event
    }
  };

  const handleSceneSwitch = async (data) => {
    console.log("Scene changed", data);
    setCurrentScene(data["scene-name"]);
  };
  
  

  const getCurrentScene = async () => {
    try {
      const data = await obs.call("GetCurrentProgramScene");
      setCurrentScene(data.currentProgramSceneName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (connected) {
      getCurrentScene();
      
      obs.on("CustomEvent", handleCustomEvent);
      obs.on("CurrentSceneChanged", getCurrentScene);
      return () => {
        obs.off("CustomEvent", handleCustomEvent);
        obs.off("CurrentSceneChanged", getCurrentScene);
      };
    }
  }, [connected]);
  

  const sendBroadcastMessage = async () => {
    try {
      await obs.call("BroadcastCustomEvent", {
        eventData: {
          realm: "kruiz-control",
          data: {
            message: "Electron",
            data: "Test Message", // Add any additional data you want to send here
          },
        },
      });
      console.log("Message sent!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!connected ? (
        <button onClick={connectToOBS}>Connect to OBS</button>
      ) : (
        <div>
          <p>Connected to OBS</p>
          <p>Current scene: {currentScene}</p>
          <button onClick={sendBroadcastMessage}>
            Send Broadcast Message
          </button>
        </div>
      )}
    </div>
  );
}

export default OBS;
