/* eslint-disable @typescript-eslint/ban-types */
import * as trpc from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import ws from 'ws';
import { z } from 'zod';
import pg from './db/db';

type Context = {};

export const appRouter = trpc
    .router<Context>()
    // Users
    .mutation('createUser', {
        input: z.object({ username: z.string().min(32) }),
        async resolve(req) {
            const id = await pg('chat_user')
                .insert({username: req.input.username})
                .returning('id');
            return id;
        }
    });

export type AppRouter = typeof appRouter;

// http server
const {server, listen } = createHTTPServer({
    router: appRouter,
    createContext() {
        return {};
    },
});

// ws server
const wss = new ws.Server({ server });
applyWSSHandler<AppRouter>({
    wss,
    router: appRouter,
    createContext() {
        return {};
    },
});

listen(2022);