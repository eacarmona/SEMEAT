import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Info,
} from '@nestjs/graphql';

import { Prisma, ExerciseData } from '../../../generated/prisma';
import { GraphQLResolveInfo } from 'graphql';
import { ApolloError } from 'apollo-server-core';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@Resolver('ExerciseData')
export class ExerciseDataResolver {
  constructor(
    private readonly prisma: Prisma,
  ) {}

  @Query('exerciseDatas')
  @Roles('Estudiante')
  @UseGuards(RolesGuard)
  async exerciseDatas(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ExerciseData[]> {
    return await this.prisma.query.exerciseDatas(args, info);
  }

  @Query('exerciseData')
  @Roles('Estudiante')
  @UseGuards(RolesGuard)
  async exerciseData(
    @Args('id') id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ExerciseData> {
    return await this.prisma.query.exerciseData({ where: { id } }, info);
  }

  @Query('exerciseDataConnection')
  @Roles('Estudiante')
  @UseGuards(RolesGuard)
  async exerciseDataConnection(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.query.exerciseDatasConnection({ ...args }, info);
  }

  @Mutation('createExerciseData')
  @Roles('Estudiante')
  @UseGuards(RolesGuard)
  async createExerciseData(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.mutation.createExerciseData(
      {
        data: { ...args.data },
      },
      info,
    );
  }

  @Mutation('updateExerciseData')
  @Roles('Estudiante')
  @UseGuards(RolesGuard)
  async updateExerciseData(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    const exerciseDataExist = await this.prisma.exists.ExerciseData({ id: args.where.id });

    if (!exerciseDataExist) {
      throw new ApolloError(`ExerciseData not found`);
    }

    return await this.prisma.mutation.updateExerciseData(
      {
        where: { ...args.where },
        data: { ...args.data },
      },
      info,
    );
  }

  @Mutation('deleteExerciseData')
  @Roles('Estudiante')
  @UseGuards(RolesGuard)
  async deleteExerciseData(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    const exerciseDataExist = await this.prisma.exists.ExerciseData({ id: args.where.id });

    if (!exerciseDataExist) {
      throw new ApolloError(`ExerciseData not found`);
    }

    return await this.prisma.mutation.deleteExerciseData(
      {
        where: { ...args.where },
      },
      info,
    );
  }

  @Mutation('deleteManyExerciseDatas')
  @Roles('Estudiante')
  @UseGuards(RolesGuard)
  async deleteManyExerciseDatas(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.mutation.deleteManyExerciseDatas(
      {
        where: { ...args.where },
      },
      info,
    );
  }
}
