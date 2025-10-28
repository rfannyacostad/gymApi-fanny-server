import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { UpdateUser,CreateUser } from './dto';
import { DeepPartial, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WebsocketsGateway } from 'src/socket/gateway';
import { writeFileSync } from 'fs';
import { join } from 'path';

@Injectable() 
export class UserService {

  private zideBicep:string="25s"

    constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>,
      private readonly websocketsGateway: WebsocketsGateway
    ){

    }
    
    async create(data: CreateUser): Promise<User> {
   
    
      const newUser = new User();
      
      newUser.name = data.name;
      newUser.actived = data.actived;
      newUser.huella = data.huella; 
      newUser.img = data.img; 
      newUser.available_days = 666;

      newUser.username = data.username;
    
      const user = await this.userRepository.save(newUser);
  
      return user;
    }
    
    async findAll(): Promise<User[]> {
      return await this.userRepository.find();
      }


    async findAllByGymId(gymId: number, userId?: number): Promise<User[]> {
        const whereCondition: any = { gymId: gymId }; // Filtrar por gymId
    
        if (userId) {
            whereCondition.id = userId; // Agregar filtro por userId si existe
        }
    
        return await this.userRepository.find({
            where: whereCondition,
        });
    }
  
async findOneByEmail(email: string): Promise<User> {
  return this.userRepository.findOne({
    where: { username: email },
  });
}

  

    async update({ id, name, actived, img }: UpdateUser) {
        const user = await this.userRepository.findOneBy({id:id});
          if (!user) {
              throw new Error(`User with ID ${id} not found`);
          }
          console.log("llega a actualizar");    user.name = name;
          user.actived = actived;
          user.img = img;
      
          return await this.userRepository.save(user);
    }


    
    
    async getStatus(id: number) {
      const user = await this.userRepository.findOneBy({id:id});
      if (!user) {
          throw new Error(`User with ID ${id} not found`);
      }
  
    
  
      return user
  }

  async deleteUser(id: number) {
    
    const user = await this.userRepository.findOneBy({id:id});
    if (!user) {
        throw new Error(`User with ID ${id} not found`);
    }

     await this.userRepository.delete({id:user.id});
    return     true
}

async updateAvailableDays(
  updateData: { id: number, available_days: number },
  manager?: EntityManager
): Promise<User> {
  console.log(`📌 Actualizando días disponibles para userId=${updateData.id} con ${updateData.available_days} días.`);

  if (!updateData.id || updateData.available_days == null) {
    console.warn(`⚠️ Datos inválidos:`, updateData);
    throw new Error('Datos inválidos');
  }

  const repo = manager ? manager.getRepository(User) : this.userRepository;

  await repo.createQueryBuilder()
    .update(User)
    .set({ available_days: () => `available_days + ${updateData.available_days}` })
    .where("id = :id", { id: updateData.id })
    .execute();

  return repo.findOneBy({ id: updateData.id });
}





async createFirstClientIfNoneExists(email: string): Promise<User | null> {


  const newUser = this.userRepository.create({
    name: 'Cliente inicial',
    username: email,
    actived: true,
    available_days: 0,
    isAdmin: false,
    img: '',
  });

  const savedUser = await this.userRepository.save(newUser);

  console.log('✅ Cliente creado automáticamente:', savedUser.username);
  return savedUser;
}

}
