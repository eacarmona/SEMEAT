import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Info,
} from '@nestjs/graphql';

import { Prisma, Exercise } from '../../../generated/prisma';
import { GraphQLResolveInfo } from 'graphql';
import { ApolloError } from 'apollo-server-core';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@Resolver('Exercise')
export class ExerciseResolver {
  constructor(
    private readonly prisma: Prisma,
  ) {}

  @Query('exercises')
  @Roles('Especialista', 'Estudiante')
  @UseGuards(RolesGuard)
  async exercises(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Exercise[]> {
    return await this.prisma.query.exercises(args, info);
  }

  @Query('exercise')
  @Roles('Especialista', 'Estudiante')
  @UseGuards(RolesGuard)
  async exercise(
    @Args('id') id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Exercise> {
    return await this.prisma.query.exercise({ where: { id } }, info);
  }

  @Query('exercisesConnection')
  @Roles('Especialista')
  @UseGuards(RolesGuard)
  async exercisesConnection(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.query.exercisesConnection({ ...args }, info);
  }

  @Mutation('createExercise')
  @Roles('Especialista')
  @UseGuards(RolesGuard)
  async createExercise(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.mutation.createExercise(
      {
        data: { ...args.data },
      },
      info,
    );
  }

  @Mutation('updateExercise')
  @Roles('Especialista')
  @UseGuards(RolesGuard)
  async updateExercise(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    const exerciseExist = await this.prisma.exists.Exercise({ id: args.where.id });

    if (!exerciseExist) {
      throw new ApolloError(`Exercise not found`);
    }

    return await this.prisma.mutation.updateExercise(
      {
        where: { ...args.where },
        data: { ...args.data },
      },
      info,
    );
  }

  @Mutation('deleteExercise')
  @Roles('Especialista')
  @UseGuards(RolesGuard)
  async deleteExercise(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    const exerciseExist = await this.prisma.exists.Exercise({ id: args.where.id });

    if (!exerciseExist) {
      throw new ApolloError(`Exercise not found`);
    }

    return await this.prisma.mutation.deleteExercise(
      {
        where: { ...args.where },
      },
      info,
    );
  }

  @Mutation('deleteManyExercises')
  @Roles('Especialista')
  @UseGuards(RolesGuard)
  async deleteManyExercises(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.mutation.deleteManyExercises(
      {
        where: { ...args.where },
      },
      info,
    );
  }
}
