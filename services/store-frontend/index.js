import { DaprServer, HttpMethod } from '@dapr/dapr';

const CREATE_ORDER_METHOD_NAME = "newOrder";
const ORDERS_PUBSUB = "redis-pubsub";
const ORDERS_PUBSUB_TOPIC = "orders";
const ORDER_KEY = "order-id";
const SERVER_PORT = 50002;

// Create a new Dapr server
const server = new DaprServer({ serverPort: SERVER_PORT });

// Listen for incoming requests
server.invoker.listen(CREATE_ORDER_METHOD_NAME, async (req) => {
    const order = JSON.stringify(req.body);

    // Publish the order to the orders topic
    console.log("Sending order: " + order + " to " + ORDERS_PUBSUB);
    const res = await server.client.pubsub.publish(ORDERS_PUBSUB, ORDERS_PUBSUB_TOPIC, { key: ORDER_KEY, value: order.id })

    // Return the result
    if (res.error) {
        return { status: "error" }
    } else {
        return { status: "OK" };
    }
}, { method: HttpMethod.POST });

await server.start();