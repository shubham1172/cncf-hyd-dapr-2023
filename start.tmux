tmux new-session -d -s cncf_demo

tmux rename-window -t cncf_demo:0 'start-store-backend'
tmux send-keys -t cncf_demo:0 "make start-store-backend" C-m
tmux new-window -t cncf_demo:1 -n 'start-store-frontend' 'make start-store-frontend'
tmux new-window -t cncf_demo:2 -n 'start-consistent-shopper' 'make start-consistent-shopper'

# Attach to the session
tmux select-window -t cncf_demo:0
tmux attach-session -t cncf_demo
