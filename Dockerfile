FROM --platform=linux/amd64 node:18.19.0 AS base

FROM base AS deps

WORKDIR /app/frontend
COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile


FROM base AS builder
WORKDIR /app/frontend
COPY --from=deps /app/frontend/node_modules ./node_modules
COPY ./ /app/frontend
run yarn build


FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/frontend/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/static ./.next/static
USER nextjs
EXPOSE 8080
ENV PORT 8080
ENV HOSTNAME "0.0.0.0"
CMD ["node", "server.js"]