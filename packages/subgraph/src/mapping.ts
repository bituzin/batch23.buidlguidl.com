import { BigInt } from "@graphprotocol/graph-ts";
import { CheckedIn } from "../generated/BatchRegistry/BatchRegistry";
import { Builder, CheckIn } from "../generated/schema";

export function handleCheckedIn(event: CheckedIn): void {
    let builderId = event.params.builder.toHexString();
    let builder = Builder.load(builderId);

    if (builder == null) {
        builder = new Builder(builderId);
        builder.address = event.params.builder;
        builder.firstCheckIn = event.block.timestamp;
        builder.checkInCount = BigInt.fromI32(0);
    }

    builder.lastCheckIn = event.block.timestamp;
    builder.checkInCount = builder.checkInCount.plus(BigInt.fromI32(1));
    builder.save();

    let checkInId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
    let checkIn = new CheckIn(checkInId);
    checkIn.builder = builderId;
    checkIn.checkInContract = event.params.checkInContract;
    checkIn.blockNumber = event.block.number;
    checkIn.blockTimestamp = event.block.timestamp;
    checkIn.transactionHash = event.transaction.hash;
    checkIn.save();
}
