# 🚀 Subgraph Deployment Summary

## ✅ Successfully Deployed to The Graph Studio

**Deployment Date**: 2026-01-09  
**Subgraph Name**: batch-23-buidlguidl  
**Network**: Arbitrum One

---

## 📍 Endpoints

### Studio Dashboard
🔗 https://thegraph.com/studio/subgraph/batch-23-buidlguidl

### GraphQL Query Endpoint
🔗 https://api.studio.thegraph.com/query/1722630/batch-23-buidlguidl/version/latest

---

## 📊 Contract Configuration

| Property | Value |
|----------|-------|
| **Network** | Arbitrum One |
| **Contract Address** | `0xDfa17B7e7b77c741e7C08f3F9fBa421e08c5EE6B` |
| **Start Block** | 418605653 |
| **Deployment Tx** | [View on Arbiscan](https://arbiscan.io/tx/0x91677c2a9044635f29ac131245ea3f6e0e4d0d1274d67090bcc990981c256584) |

---

## 🎯 Features Indexed

The subgraph tracks:
- ✅ **Builders**: All users who have checked in
- ✅ **Check-in Count**: Number of times each builder checked in
- ✅ **First Check-in**: Timestamp of initial registration
- ✅ **Last Check-in**: Most recent activity timestamp
- ✅ **Check-in History**: Individual check-in events with contract addresses

---

## 📝 Example Queries

### Get All Builders (Latest First)
```graphql
{
  builders(first: 100, orderBy: lastCheckIn, orderDirection: desc) {
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
  builder(id: "0x70b2d7dbecc2238e0d2a3159320e11d7d85dede8") {
    address
    checkInCount
    firstCheckIn
    lastCheckIn
    checkIns(first: 10, orderBy: blockTimestamp, orderDirection: desc) {
      checkInContract
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
}
```

### Recent Check-ins Across All Builders
```graphql
{
  checkIns(first: 20, orderBy: blockTimestamp, orderDirection: desc) {
    builder {
      address
      checkInCount
    }
    checkInContract
    blockTimestamp
    transactionHash
  }
}
```

---

## 🌐 Frontend Integration

The `/builders` page is now connected to the live subgraph:

**File**: `packages/nextjs/services/apollo/index.ts`
```typescript
const subgraphUri = "https://api.studio.thegraph.com/query/95630/batch-23-buidlguidl/version/latest";
```

**View Live**: http://localhost:3000/builders (during development)  
**Production**: https://[your-domain]/builders

---

## 🔄 Syncing Status

The subgraph will:
1. ✅ Start syncing from block 418605653
2. ✅ Index all past `CheckedIn` events
3. ✅ Continue indexing new events in real-time
4. ✅ Update the GraphQL endpoint instantly

**Check Sync Status**: Visit the [Studio Dashboard](https://thegraph.com/studio/subgraph/batch-23-buidlguidl)

---

## 📚 Additional Resources

- [The Graph Studio Docs](https://thegraph.com/docs/en/deploying/subgraph-studio/)
- [GraphQL Query Syntax](https://graphql.org/learn/queries/)
- [Scaffold-ETH 2 Subgraph Extension](https://github.com/scaffold-eth/se-2-extensions/tree/subgraph-extension)

---

## 🔧 Maintenance

### Updating the Subgraph

If you make changes to the schema or mappings:

1. **Rebuild**:
   ```bash
   yarn workspace @se-2/subgraph build
   ```

2. **Deploy New Version**:
   ```bash
   yarn workspace @se-2/subgraph graph deploy --studio batch-23-buidlguidl
   ```
   Enter a new version label (e.g., `v0.0.2`)

3. **Update Frontend** (if using specific version):
   Replace `/version/latest` with `/v0.0.2` in the endpoint URL

---

**Status**: 🟢 Live and Indexing
