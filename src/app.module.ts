import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';

import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { PubSub } from 'graphql-subscriptions';
import { APP_INTERCEPTOR, Reflector } from '@nestjs/core';

import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { GymModule } from './gym/gym.module';
import { CashiersModule } from './point-of-sale/cashiers/cashiers.module';
import { PointOfSaleModule } from './point-of-sale/point-of-sale.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { ExpenseModule } from './exponse/exponse.module';
import { UpdateVersionModule } from './update-version/update-version.module';

import { SocketModule } from './socket/gateway.module';
import { WebsocketsGateway } from './socket/gateway';
import { AutoTouchVersionGraphQLInterceptor } from './update-version/interceptors/auto-touch-version.interceptor';

// 👇 importa tus módulos de agenda
import { AdminModule } from './agenda/admin-agenda/admin.module';
import { EventoModule } from './agenda/evento/evento.module';
import { CitaModule } from './agenda/cita/cita.module';
import { ServicioModule } from './agenda/servicio/servicio.module';

@Module({
  imports: [
    AuthModule,
    MulterModule.register({
      storage: 'memory',
    }),
    CategoryModule,
    UserModule,
    ProductModule,
    ExpenseModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault()
          : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
      autoSchemaFile: true, // 👉 genera schema.graphql automáticamente
    }),

   TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['dist/**/*.entity.{ts,js}'],
  synchronize: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  autoLoadEntities: true,
}),


    SocketModule,
    GymModule,
    CashiersModule,
    PointOfSaleModule,
    UpdateVersionModule,

    // 👇 agrega módulos de agenda
    AdminModule,
    EventoModule,
    CitaModule,
    ServicioModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    WebsocketsGateway,
    Reflector,
    {
      provide: APP_INTERCEPTOR,
      useClass: AutoTouchVersionGraphQLInterceptor,
    },
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class AppModule {}
