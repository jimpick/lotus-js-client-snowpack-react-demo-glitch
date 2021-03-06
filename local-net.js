import ReactDOM from "/web_modules/react-dom.js";
import { Suspense } from "/web_modules/react.js";
import { html } from "/web_modules/htm/react.js";
import useLotusClient from "./use-lotus-client.js";
import MinerPanel from "./miner-panel.js";

function LocalNet(props) {
  const node0 = useLotusClient(0, "node");
  const miner0 = useLotusClient(0, "miner");
  const node1 = useLotusClient(1, "node");
  const miner1 = useLotusClient(1, "miner");
  const node2 = useLotusClient(2, "node");
  const miner2 = useLotusClient(2, "miner");

  const nodes = [];
  if (node0 && miner0) nodes.push([node0, miner0]);
  if (node1 && miner1) nodes.push([node1, miner1]);
  if (node2 && miner2) nodes.push([node2, miner2]);

  return html`
    <div>
      <h1>Websocket Prototype</h1>
      <div
        style=${{
          display: "grid",
          gridTemplateRows: `repeat(${nodes.length}, auto)`
        }}
      >
        ${nodes.map(
          ([node, miner], i) => html`
            <div key=${i} style=${{ gridColumn: i + 1 }}>
              <${Suspense}
                fallback=${html`
                  Loading...
                `}
              >
                <${MinerPanel} node=${node} miner=${miner} />
              <//>
            </div>
          `
        )}
      </div>
    </div>
  `;
}

const appEl = document.getElementById("app");
ReactDOM.createRoot(appEl).render(
  html`
    <${LocalNet} />
  `
);
