# Batch 23 Subgraph Deployment Guide

## 📋 Prerequisites

1. **Subgraph Studio Account**: Create an account at [https://thegraph.com/studio](https://thegraph.com/studio)
2. **Install Graph CLI**: Already installed in the project

## 🚀 Deployment to Subgraph Studio

### Step 1: Create Your Subgraph on Studio

1. Visit [https://thegraph.com/studio](https://thegraph.com/studio)
2. Click **"Create a Subgraph"**
3. Give it a name (e.g., `batch23-builders`)
4. Copy the **"SUBGRAPH SLUG"** (e.g., `batch23-builders`)
5. Copy your **"DEPLOY KEY"**

### Step 2: Authenticate with The Graph CLI

```bash
yarn graph auth --studio <YOUR_DEPLOY_KEY>
```

### Step 3: Deploy Your Subgraph

```bash
yarn graph deploy --studio <YOUR_SUBGRAPH_SLUG>
```

Example:
```bash
yarn graph deploy --studio batch23-builders
```

### Step 4: Update Frontend Configuration

Once deployed, you'll receive a public GraphQL endpoint that looks like:
```
https://api.studio.thegraph.com/query/<ACCOUNT_ID>/<SUBGRAPH_SLUG>/v0.0.1
```

Update `packages/nextjs/services/apollo/index.ts`:

```typescript
const subgraphUri = "https://api.studio.thegraph.com/query/<ACCOUNT_ID>/<SUBGRAPH_SLUG>/version/latest";
```

## 📝 Subgraph Configuration

**Network**: Arbitrum One  
**Contract**: `0xDfa17B7e7b77c741e7C08f3F9fBa421e08c5EE6B`  
**Start Block**: `418605653`

## 🔍 GraphQL Queries

### Get All Builders
```graphql
{
  builders(orderBy: lastCheckIn, orderDirection: desc) {
    id
    address
    checkInCount
    firstCheckIn
    lastCheckIn
  }
}
```

### Get Specific Builder
```graphql
{
  builder(id: "0x...") {
    address
    checkInCount
    firstCheckIn
    lastCheckIn
    checkIns {
      checkInContract
      blockTimestamp
    }
  }
}
```

## ✅ Testing Your Subgraph

After deployment, visit:
```
https://thegraph.com/studio/subgraphs/<YOUR_SUBGRAPH_SLUG>
```

Use the **Playground** to test queries before integrating into your frontend.

## 🔄 Updating Your Subgraph

When you make changes:

1. Rebuild the subgraph:
   ```bash
   yarn workspace @se-2/subgraph build
   ```

2. Redeploy (increment version):
   ```bash
   yarn graph deploy --studio <YOUR_SUBGRAPH_SLUG> --version-label v0.0.2
   ```

## 🎯 Local Testing (Optional)

For local testing with a hardhat node:

1. Update `subgraph.yaml`:
   - Change `network: arbitrum-one` to `network: localhost`
   - Set `startBlock: 0`
   - Update contract address to your local deployment

2. Start services:
   ```bash
   yarn chain            # Terminal 1
   yarn deploy          # Terminal 2 (once)
   yarn subgraph:run-node  # Terminal 3
   ```

3. Deploy locally:
   ```bash
   yarn workspace @se-2/subgraph local-create
   yarn subgraph:local-ship
   ```

## 📚 Resources

- [The Graph Studio Docs](https://thegraph.com/docs/en/deploying/subgraph-studio/)
- [Scaffold-ETH 2 Subgraph Extension](https://github.com/scaffold-eth/se-2-extensions/tree/subgraph-extension)
- [GraphQL Query Syntax](https://graphql.org/learn/queries/)
