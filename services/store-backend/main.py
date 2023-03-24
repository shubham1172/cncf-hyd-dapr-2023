from cloudevents.sdk.event import v1
from dapr.ext.grpc import App
from dapr.clients.grpc._response import TopicEventResponse
from dapr.clients import DaprClient

ORDERS_PUBSUB = "redis-pubsub"
ORDERS_PUBSUB_TOPIC = "orders"
ORDERS_DATABASE = "redis-db"
ORDER_ID_KEY = "order-id"
SERVER_PORT = 50003

app = App()
dapr = DaprClient()


@app.subscribe(pubsub_name=ORDERS_PUBSUB, topic=ORDERS_PUBSUB_TOPIC)
def process_order(event: v1.Event):
    """Process order and save it to the database."""
    print(f"Saving order: {event.data}!", flush=True)
    dapr.save_state(ORDERS_DATABASE, ORDER_ID_KEY, str(event.data))
    return TopicEventResponse("success")


app.run(SERVER_PORT)
dapr.close()
