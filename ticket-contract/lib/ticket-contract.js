/*
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Contract } = require("fabric-contract-api");
const { event } = require("./event");

class TicketContract extends Contract {
    async ticketExists(ctx, ticketId) {
        const buffer = await ctx.stub.getState(ticketId);
        return !!buffer && buffer.length > 0;
    }

    async createTicket(ctx, ticketId, value) {
        const exists = await this.ticketExists(ctx, ticketId);
        if (exists) {
            throw new Error(`The ticket ${ticketId} already exists`);
        }

        console.log(ctx);

        const newOwner = value;

        value = {
            issueTimeStamp: new Date.toISOString(),
            owner: newOwner,
            event,
        };

        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(ticketId, buffer);
    }

    async readTicket(ctx, ticketId) {
        const exists = await this.ticketExists(ctx, ticketId);
        if (!exists) {
            throw new Error(`The ticket ${ticketId} does not exist`);
        }
        const buffer = await ctx.stub.getState(ticketId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateTicket(ctx, ticketId, newOwner) {
        const exists = await this.ticketExists(ctx, ticketId);
        if (!exists) {
            throw new Error(`The ticket ${ticketId} does not exist`);
        }

        const ticket = ctx.stub.getState(ticketId);

        ticket.transferTimeStamp = new Date.toISOString();
        ticket.newOwner = newOwner;

        const asset = { value: ticket };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(ticketId, buffer);
    }

    async deleteTicket(ctx, ticketId) {
        const exists = await this.ticketExists(ctx, ticketId);
        if (!exists) {
            throw new Error(`The ticket ${ticketId} does not exist`);
        }
        await ctx.stub.deleteState(ticketId);
    }
}

module.exports = TicketContract;
