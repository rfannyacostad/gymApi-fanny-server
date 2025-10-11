import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import {CreateUser, UpdateUser } from './dto';
import { PubSub } from 'graphql-subscriptions';
import { Get } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';
import { WebsocketsGateway } from 'src/socket/gateway';
import { AppGateway } from 'src/app.gateway';
import { AutoTouchVersion } from 'src/update-version/decorators/auto-touch-version.decorator';

const pubSub = new PubSub();

@Resolver()
export class UserResolver {
    constructor(private readonly _socketService: WebsocketsGateway,
        private readonly _user:UserService,
          private readonly gateway: AppGateway // ✅ inyección del WebSocket gateway

      )
    {

    }

    @Query(() => [User], { name: 'usersByGymId' })
    async findAll(
        @Args('gymId', { type: () => Number }) gymId: number,
        @Args('userId', { nullable: true }) userId?: number

    ) {
        
        return this._user.findAllByGymId(gymId,userId); // Aquí asumes que tienes un método que filtra por gymId
    }

  
@Mutation(() => User, { name: 'loginGoogle', nullable: true })
async loginGoogle(@Args('email') email: string) {
  console.log('📩 Login con Google (solo email):', email);

  const user = await this._user.findOneByEmail(email);

  if (!user) {
    console.warn('⚠️ Usuario no encontrado:', email);
    return null;
  }

  console.log('✅ Usuario encontrado:', user.username, 'Admin:', user.isAdmin);
  return user;
}





@AutoTouchVersion('members') // ✅
@Mutation(() => User, { name: "updateUserByDS" })
async updateInput(@Args('updateUser') updateUser: UpdateUser) {
  const updated = await this._user.update(updateUser);



  return updated;
}




@Subscription(() => User)
newUser() {
    return pubSub.asyncIterator('newUser'); // Maneja la suscripción para el evento newUser
}




  
}
