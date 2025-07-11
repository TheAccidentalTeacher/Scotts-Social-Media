#!/bin/bash

# Start script for The Accidental Teacher Social Media Empire

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print header
echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}  The Accidental Teacher - Start Script  ${NC}"
echo -e "${BLUE}=========================================${NC}"

# Parse command line arguments
MODE="dev"
PORT=3000

for arg in "$@"
do
  case $arg in
    --prod)
      MODE="prod"
      shift
      ;;
    --port=*)
      PORT="${arg#*=}"
      shift
      ;;
    *)
      # Unknown option
      ;;
  esac
done

# Function to check if a port is in use
port_in_use() {
  lsof -i:"$1" >/dev/null 2>&1
}

# Check if port is in use and find an available one if needed
if port_in_use "$PORT"; then
  echo -e "${YELLOW}Port $PORT is already in use. Trying to find an available port...${NC}"
  
  # Try ports from PORT+1 to PORT+10
  for ((i=PORT+1; i<=PORT+10; i++)); do
    if ! port_in_use "$i"; then
      PORT=$i
      echo -e "${GREEN}Found available port: $PORT${NC}"
      break
    fi
    
    # If we've tried all ports and none are available
    if [ "$i" -eq $((PORT+10)) ]; then
      echo -e "${RED}Error: Could not find an available port. Please free up port $PORT or specify a different port with --port=XXXX${NC}"
      exit 1
    fi
  done
fi

# Set environment variables
export PORT=$PORT

# Start the application based on mode
if [ "$MODE" = "prod" ]; then
  echo -e "\n${YELLOW}Starting in production mode on port $PORT...${NC}"
  
  # Check if build directory exists
  if [ ! -d "build" ]; then
    echo -e "${YELLOW}Build directory not found. Running build script...${NC}"
    ./build.sh --production
    
    if [ $? -ne 0 ]; then
      echo -e "${RED}Error: Build failed.${NC}"
      exit 1
    fi
  fi
  
  # Start the production server
  echo -e "${GREEN}Starting production server...${NC}"
  node server.js
else
  echo -e "\n${YELLOW}Starting in development mode on port $PORT...${NC}"
  
  # Check if node_modules directory exists
  if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Node modules not found. Installing dependencies...${NC}"
    npm install
    
    if [ $? -ne 0 ]; then
      echo -e "${RED}Error: Failed to install dependencies.${NC}"
      exit 1
    fi
  fi
  
  # Start the development server
  echo -e "${GREEN}Starting development server...${NC}"
  npm start
fi

# This part will only execute if the server crashes or is stopped
echo -e "\n${RED}Server stopped.${NC}"