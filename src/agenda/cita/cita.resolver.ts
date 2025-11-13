import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CitaService } from './cita.service';
import { Cita } from './cita.entity';
import { CreateCitaInput } from './dto/create-cita.input';
import { UpdateCitaInput } from './dto/update-cita.input';


@Resolver(() => Cita)
export class CitaResolver {
  constructor(private readonly citaService: CitaService) {}

  @Mutation(() => Cita)
async crearCita(@Args('data') data: CreateCitaInput) {
  const citaData = {
    ...data,
    // 🔹 Si viene como Date, conviértela; si ya es string, déjala igual
    fecha: data.fecha
      ? new Date(data.fecha).toISOString().split('T')[0]
      : null,
  };
  return this.citaService.crearCita(citaData);
}

@Mutation(() => Cita)
async actualizarCita(
  @Args('id', { type: () => Int }) id: number,
  @Args('data') data: UpdateCitaInput,
) {
  const citaData = {
    ...data,
    fecha: data.fecha
      ? new Date(data.fecha).toISOString().split('T')[0]
      : null,
  };
  return this.citaService.actualizarCita(id, citaData);
}


  // 🔹 Read all
  @Query(() => [Cita], { name: 'citas' })
  obtenerCitas(): Promise<Cita[]> {
    return this.citaService.obtenerCitas();
  }

  // 🔹 Read one
  @Query(() => Cita, { name: 'cita', nullable: true })
  obtenerCitaPorId(@Args('id', { type: () => Int }) id: number): Promise<Cita | null> {
    return this.citaService.obtenerCitaPorId(id);
  }



  // 🔹 Delete
  @Mutation(() => Boolean)
  async eliminarCita(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    await this.citaService.eliminarCita(id);
    return true;
  }
}
