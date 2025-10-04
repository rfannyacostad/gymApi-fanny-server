import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ServicioService } from './servicio.service';
import { Servicio } from './servicio.entity';
import { CreateServicioInput, UpdateServicioInput } from './servicio.input';

@Resolver(() => Servicio)
export class ServicioResolver {
  constructor(private readonly servicioService: ServicioService) {}

  // 🔹 Obtener servicios por admin
  @Query(() => [Servicio], { name: 'serviciosByAdmin' })
  findByAdmin(@Args('adminId', { type: () => Int }) adminId: number) {
    return this.servicioService.findByAdmin(adminId);
  }

  // 🔹 Obtener un servicio por ID
  @Query(() => Servicio, { name: 'servicio' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.servicioService.findOne(id);
  }

  // 🔹 Crear un servicio
  @Mutation(() => Servicio)
  createServicio(@Args('data') data: CreateServicioInput) {
    return this.servicioService.create(data);
  }

  // 🔹 Actualizar un servicio
  @Mutation(() => Servicio)
  updateServicio(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateServicioInput,
  ) {
    return this.servicioService.update(id, data);
  }

  // 🔹 Eliminar un servicio
  @Mutation(() => Boolean)
  removeServicio(@Args('id', { type: () => Int }) id: number) {
    return this.servicioService.remove(id);
  }
}
