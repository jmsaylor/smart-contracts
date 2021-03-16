/*
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Contract } = require("fabric-contract-api");

class CreditContract extends Contract {
    async creditExists(ctx, creditId) {
        const buffer = await ctx.stub.getState(creditId);
        return !!buffer && buffer.length > 0;
    }

    async issueCredit(ctx, creditId, value) {
        const exists = await this.creditExists(ctx, creditId);
        if (exists) {
            throw new Error(`The credit ${creditId} already exists`);
        }

        const currentOwner = value;

        value = {
            time: new Date().toISOString(),
            currentOwner,
            status: "ISSUED",

            //monitoringReport: "RF-232"
        };

        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(creditId, buffer);
    }

    async readCredit(ctx, creditId) {
        const exists = await this.creditExists(ctx, creditId);
        if (!exists) {
            throw new Error(`The credit ${creditId} does not exist`);
        }
        const buffer = await ctx.stub.getState(creditId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async purchaseCredit(ctx, creditId, newValue) {
        const exists = await this.creditExists(ctx, creditId);
        if (!exists) {
            throw new Error(`The credit ${creditId} does not exist`);
        }

        const newOwner = newValue;

        newValue = {
            time: new Date().toISOString(),
            currentOwner: newOwner,
            status: "PURCHASED",
        };

        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(creditId, buffer);
    }

    async deleteCredit(ctx, creditId) {
        const exists = await this.creditExists(ctx, creditId);
        if (!exists) {
            throw new Error(`The credit ${creditId} does not exist`);
        }
        await ctx.stub.deleteState(creditId);
    }
}

module.exports = CreditContract;
