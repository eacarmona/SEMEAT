import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Info,
} from '@nestjs/graphql';

import { Prisma, Test } from '../../../generated/prisma';
import { GraphQLResolveInfo } from 'graphql';
import { ApolloError } from 'apollo-server-core';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@Resolver('Test')
export class TestResolver {
  constructor(
    private readonly prisma: Prisma,
  ) {}

  @Query('tests')
  @Roles('Especialista', 'Estudiante')
  @UseGuards(RolesGuard)
  async tests(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Test[]> {
    return await this.prisma.query.tests(args, info);
  }

  @Query('test')
  @Roles('Especialista', 'Estudiante')
  @UseGuards(RolesGuard)
  async test(
    @Args('id') id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Test> {
    return await this.prisma.query.test({ where: { id } }, info);
  }

  @Query('testsConnection')
  @Roles('Especialista')
  @UseGuards(RolesGuard)
  async testsConnection(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.query.testsConnection({ ...args }, info);
  }

  @Mutation('createTest')
  @Roles('Especialista')
  @UseGuards(RolesGuard)
  async createTest(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.mutation.createTest(
      {
        data: { ...args.data },
      },
      info,
    );
  }

  @Mutation('updateTest')
  @Roles('Especialista')
  @UseGuards(RolesGuard)
  async updateTest(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    const testExist = await this.prisma.exists.Test({ id: args.where.id });

    if (!testExist) {
      throw new ApolloError(`Test not found`);
    }

    if (args.data.enable && args.data.type === 'INICIAL') {
      const enableTest = await this.prisma.exists.Test({id_not: args.where.id, type: 'INICIAL', enable: args.data.enable });

      if (enableTest) {
        throw new ApolloError(`Only one enable test`);
      }
    }

    return await this.prisma.mutation.updateTest(
      {
        where: { ...args.where },
        data: { ...args.data },
      },
      info,
    );
  }

  @Mutation('deleteTest')
  @Roles('Especialista')
  @UseGuards(RolesGuard)
  async deleteTest(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    const testExist = await this.prisma.exists.Test({ id: args.where.id });

    if (!testExist) {
      throw new ApolloError(`Test not found`);
    }

    return await this.prisma.mutation.deleteTest(
      {
        where: { ...args.where },
      },
      info,
    );
  }

  @Mutation('deleteManyTests')
  @Roles('Especialista')
  @UseGuards(RolesGuard)
  async deleteManyTests(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.mutation.deleteManyTests(
      {
        where: { ...args.where },
      },
      info,
    );
  }
}
