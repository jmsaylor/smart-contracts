/*
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Contract } = require("fabric-contract-api");

class BobaContract extends Contract {
    async bobaExists(ctx, bobaId) {
        const buffer = await ctx.stub.getState(bobaId);
        return !!buffer && buffer.length > 0;
    }

    async createBoba(ctx, bobaId, value) {
        const exists = await this.bobaExists(ctx, bobaId);
        if (exists) {
            throw new Error(`The boba ${bobaId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(bobaId, buffer);
    }

    async readBoba(ctx, bobaId) {
        const exists = await this.bobaExists(ctx, bobaId);
        if (!exists) {
            throw new Error(`The boba ${bobaId} does not exist`);
        }
        const buffer = await ctx.stub.getState(bobaId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateBoba(ctx, bobaId, newValue) {
        const exists = await this.bobaExists(ctx, bobaId);
        if (!exists) {
            throw new Error(`The boba ${bobaId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(bobaId, buffer);
    }

    async deleteBoba(ctx, bobaId) {
        const exists = await this.bobaExists(ctx, bobaId);
        if (!exists) {
            throw new Error(`The boba ${bobaId} does not exist`);
        }
        await ctx.stub.deleteState(bobaId);
    }
}

module.exports = BobaContract;
// Invoke a smart contract that has been instantiated or committed on your channels￼
// You can download your connection profile from the IBM Blockchain Platform console to build a gateway in the Fabric Gateways pane. You can then use the gateway to invoke the smart contracts that were deployed on your channel.

// Open the IBM Blockchain Platform console that is associated with your instance of the IBM Blockchain Platform. Navigate to the Organizations tab and click the Organization MSP tile for the organization that your client application will interact with. Click Create connection profile to open a side panel that allows you to build and download your connection profile to your local file system. Then, create an application identity by using your CA and save the enrollID and secret. Use the following steps to connect to the IBM Blockchain Platform from VS Code.

// Open the IBM Blockchain Platform tab.
// Hover your mouse over the Fabric Gateways pane and click +.
// Choose Create a gateway from a connection profile.
// Enter a name for the connection.
// Enter the fully qualified file path of your connection profile. Your connection should now appear in the connections list underneath 1 Org Local Fabric.Invoke a smart contract that has been instantiated or committed on your channels￼
// You can download your connection profile from the IBM Blockchain Platform console to build a gateway in the Fabric Gateways pane. You can then use the gateway to invoke the smart contracts that were deployed on your channel.

// Open the IBM Blockchain Platform console that is associated with your instance of the IBM Blockchain Platform. Navigate to the Organizations tab and click the Organization MSP tile for the organization that your client application will interact with. Click Create connection profile to open a side panel that allows you to build and download your connection profile to your local file system. Then, create an application identity by using your CA and save the enrollID and secret. Use the following steps to connect to the IBM Blockchain Platform from VS Code.

// Open the IBM Blockchain Platform tab.
// Hover your mouse over the Fabric Gateways pane and click +.
// Choose Create a gateway from a connection profile.
// Enter a name for the connection.
// Enter the fully qualified file path of your connection profile. Your connection should now appear in the connections list underneath 1 Org Local Fabric.
