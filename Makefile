.PHONY: start-consistent-shopper
start-consistent-shopper: 
	dapr run --app-id consistent-shopper --app-port 50001 --app-protocol http --resources-path ./services/consistent-shopper/.dapr/resources -- node ./services/consistent-shopper/index.js

.PHONY: start-store-frontend
start-store-frontend: 
	dapr run --app-id store-frontend --app-port 50002 --app-protocol http --resources-path ./services/store-frontend/.dapr/resources -- node ./services/store-frontend/index.js