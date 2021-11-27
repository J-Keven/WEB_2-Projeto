FROM nginx

# Arguments
# Aws configs args
# ARG AWS_ACCESS_KEY_ID
# ARG AWS_SECRET_ACCESS_KEY

# ARG AWS_DEFAULT_REGION=sa-east-1
# ARG aws_bucket=hub-api

# # # Postgres config
# ARG POSTGRES_HOST
# ARG POSTGRES_USERNAME
# ARG POSTGRES_PASSWORD
# ARG POSTGRES_PORT
# ARG POSTGRES_DB

# # Auth
# ARG SECRET_KEY
# ARG TOKEN_VALIDATOR

# #Queue
# ARG RABBITMQ_DEFAULT_URL

# # Envs

# # # Aws configs variables

# ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
# ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
# ENV AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION}
# ENV aws_bucket=${aws_bucket}

# # # Mail driver configs

# ENV MAIL_DRIVER=ses

# # # Storage driver configs

# ENV STORAGE_DRIVER=s3

# # # Queue congigs

# ENV RABBITMQ_DEFAULT_URL=${RABBITMQ_DEFAULT_URL}
# ENV RABBITMQ_DLX="dlx"
# ENV RABBITMQ_EVENT_DIR_EX="amq.direct"
# ENV RABBITMQ_EVENT_FAN_EX="amq.fanout"
# ENV RABBITMQ_TABLE_ROUTING_KEY="table"
# ENV RABBITMQ_MAIL_ROUTING_KEY="mail_routing_key"
# ENV RABBITMQ_RH_QUEUE="rh_orders"
# ENV RABBITMQ_EMPLOYEES_QUEUE="employees_hub"
# ENV RABBITMQ_NOTIFICATIONS_ROUTING_KEY="notifications_routing_key"

# # Postgres config

# ENV POSTGRES_HOST=${POSTGRES_HOST}
# ENV POSTGRES_USERNAME=${POSTGRES_USERNAME}
# ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
# ENV POSTGRES_PORT=${POSTGRES_PORT}
# ENV POSTGRES_DB=${POSTGRES_DB}

# Api configs

ENV PORT=3333
ENV ENVIRONMENT=production

# Install dependences

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs

RUN npm install -g npm@7.20.6
RUN npm install -g yarn

WORKDIR /home/node/app

COPY . .

COPY ./.docker/start.sh /entrypoint.sh

COPY ./nginx/ /etc/nginx/conf.d/

RUN chmod +x /entrypoint.sh

RUN yarn

EXPOSE 80

CMD [ "/entrypoint.sh" ]