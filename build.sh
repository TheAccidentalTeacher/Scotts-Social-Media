#!/bin/bash

# Build script for The Accidental Teacher Social Media Empire

# Set environment variables
export NODE_ENV=development

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print header
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  The Accidental Teacher - Build Script  ${NC}"
echo -e "${GREEN}=========================================${NC}"

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check for required tools
echo -e "\n${YELLOW}Checking for required tools...${NC}"

if ! command_exists node; then
  echo -e "${RED}Error: Node.js is not installed.${NC}"
  exit 1
else
  NODE_VERSION=$(node -v)
  echo -e "${GREEN}✓ Node.js ${NODE_VERSION} is installed.${NC}"
fi

if ! command_exists npm; then
  echo -e "${RED}Error: npm is not installed.${NC}"
  exit 1
else
  NPM_VERSION=$(npm -v)
  echo -e "${GREEN}✓ npm ${NPM_VERSION} is installed.${NC}"
fi

# Parse command line arguments
SKIP_INSTALL=false
SKIP_TESTS=false
PRODUCTION=false

for arg in "$@"
do
  case $arg in
    --skip-install)
      SKIP_INSTALL=true
      shift
      ;;
    --skip-tests)
      SKIP_TESTS=true
      shift
      ;;
    --production)
      PRODUCTION=true
      export NODE_ENV=production
      shift
      ;;
    *)
      # Unknown option
      ;;
  esac
done

# Install dependencies if not skipped
if [ "$SKIP_INSTALL" = false ]; then
  echo -e "\n${YELLOW}Installing dependencies...${NC}"
  npm install
  if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to install dependencies.${NC}"
    exit 1
  fi
  echo -e "${GREEN}✓ Dependencies installed successfully.${NC}"
else
  echo -e "\n${YELLOW}Skipping dependency installation.${NC}"
fi

# Create necessary directories
echo -e "\n${YELLOW}Creating necessary directories...${NC}"
mkdir -p build
mkdir -p public/images
echo -e "${GREEN}✓ Directories created.${NC}"

# Run tests if not skipped
if [ "$SKIP_TESTS" = false ]; then
  echo -e "\n${YELLOW}Running tests...${NC}"
  npm test -- --passWithNoTests
  if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Tests failed.${NC}"
    exit 1
  fi
  echo -e "${GREEN}✓ Tests passed.${NC}"
else
  echo -e "\n${YELLOW}Skipping tests.${NC}"
fi

# Build the application
echo -e "\n${YELLOW}Building the application...${NC}"
if [ "$PRODUCTION" = true ]; then
  echo -e "${YELLOW}Building for production...${NC}"
  npm run build
else
  echo -e "${YELLOW}Building for development...${NC}"
  npm run build
fi

if [ $? -ne 0 ]; then
  echo -e "${RED}Error: Build failed.${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Build completed successfully.${NC}"

# Create Netlify functions directory if it doesn't exist
echo -e "\n${YELLOW}Setting up Netlify functions...${NC}"
mkdir -p build/functions
cp -r functions/* build/functions/
echo -e "${GREEN}✓ Netlify functions set up.${NC}"

# Create a _redirects file for Netlify
echo -e "\n${YELLOW}Creating Netlify configuration files...${NC}"
echo "/* /index.html 200" > build/_redirects
echo -e "${GREEN}✓ Netlify configuration files created.${NC}"

# Print success message
echo -e "\n${GREEN}=========================================${NC}"
echo -e "${GREEN}  Build completed successfully!  ${NC}"
echo -e "${GREEN}=========================================${NC}"

if [ "$PRODUCTION" = true ]; then
  echo -e "\n${YELLOW}The application is ready for production deployment.${NC}"
  echo -e "${YELLOW}To deploy to Netlify, run:${NC}"
  echo -e "  netlify deploy --prod"
else
  echo -e "\n${YELLOW}To start the development server, run:${NC}"
  echo -e "  npm start"
  echo -e "\n${YELLOW}To preview the production build, run:${NC}"
  echo -e "  npm run server"
fi

echo -e "\n${GREEN}Happy coding!${NC}"