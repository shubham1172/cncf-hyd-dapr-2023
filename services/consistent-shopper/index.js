import { DaprServer, HttpMethod } from '@dapr/dapr';

const CRON_BINDING_NAME = "order-trigger-cron";
const STORE_FRONTEND_SERVICE_NAME = "store-frontend";
const STORE_FRONTEND_SERVICE_METHOD = "newOrder";
const SERVER_PORT = 50001;

// Create a new Dapr server
const server = new DaprServer({ serverPort: SERVER_PORT });

let orderId = 1;

// Bind to the cron binding
server.binding.receive(CRON_BINDING_NAME, async (_) => {
    // Create a new order
    const order = { id: orderId++ };
    console.log("Placing order: ", order)

    // Invoke the store-frontend service
    const res = await server.client.invoker.invoke(STORE_FRONTEND_SERVICE_NAME, STORE_FRONTEND_SERVICE_METHOD,
        HttpMethod.POST, order);
    // TODO: remove
    console.log("Order placed: ", res);
});

await server.start();