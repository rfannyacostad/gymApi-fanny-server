import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UpdateUser } from './dto';
import { AutoTouchVersion } from 'src/update-version/decorators/auto-touch-version.decorator';
import { PhoneCodeResponse } from './dto/phone-code-response';
import { PhoneVerifyResponse } from './dto/args/phone-verify-response';

@Resolver()
export class UserResolver {
  constructor(
    private readonly _user: UserService,
  ) {}

  @Query(() => [User], { name: 'usersByGymId' })
  async findAll(
    @Args('gymId', { type: () => Number }) gymId: number,
    @Args('userId', { nullable: true }) userId?: number
  ) {
    return this._user.findAllByGymId(gymId, userId);
  }

@Mutation(() => User, { name: 'loginGoogle', nullable: true })
async loginGoogle(@Args('email') email: string) {
  console.log('📩 Login con Google (solo email):', email);

  // Buscar usuario
  const user = await this._user.findOneByEmail(email);

  // Si existe, devolverlo
  if (user) {
    console.log('✅ Usuario encontrado:', user.username);
    return user;
  }

  // Si no existe, intentar crear el primero como cliente
  const created = await this._user.createFirstClientIfNoneExists(email);

  if (created) {
    console.log('🆕 Cliente creado automáticamente:', created.username);
    return created;
  }

 console.warn('⚠️ Usuario no encontrado y no se creó porque ya existen usuarios.');
  return null; 
}
  @AutoTouchVersion('members')
  @Mutation(() => User, { name: "updateUserByDS" })
  async updateInput(@Args('updateUser') updateUser: UpdateUser) {
    return this._user.update(updateUser);
  }
@Mutation(() => PhoneCodeResponse)
async sendPhoneCode(@Args('phone') phone: string) {

  console.log("📩 [Resolver] sendPhoneCode() llamado con phone:", phone);

  const result = await this._user.sendPhoneCode(phone);

  console.log("📤 [Resolver] Respuesta enviada desde UserService:", result);

  return result;
}


  @Mutation(() => PhoneVerifyResponse)
  async verifyPhoneCode(
    @Args('phone') phone: string,
    @Args('code') code: string,
  ) {
    return this._user.verifyPhoneCode(phone, code);
  }
}
