import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Info,
} from '@nestjs/graphql';

import { Prisma, Section } from '../../../generated/prisma';
import { GraphQLResolveInfo } from 'graphql';
import { ApolloError } from 'apollo-server-core';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@Resolver('Section')
export class SectionResolver {
  constructor(
    private readonly prisma: Prisma,
  ) {}

  @Query('sections')
  @Roles('Especialista')
  @UseGuards(RolesGuard)
  async sections(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Section[]> {
    return await this.prisma.query.sections(args, info);
  }

  @Query('section')
  @Roles('Especialista')
  @UseGuards(RolesGuard)
  async section(
    @Args('id') id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Section> {
    return await this.prisma.query.section({ where: { id } }, info);
  }

  @Query('sectionsConnection')
  @Roles('Especialista')
  @UseGuards(RolesGuard)
  async sectionsConnection(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.query.sectionsConnection({ ...args }, info);
  }

  @Mutation('createSection')
  @Roles('Especialista')
  @UseGuards(RolesGuard)
  async createSection(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.mutation.createSection(
      {
        data: { ...args.data },
      },
      info,
    );
  }

  @Mutation('updateSection')
  @Roles('Especialista')
  @UseGuards(RolesGuard)
  async updateSection(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    const sectionExist = await this.prisma.exists.Section({ id: args.where.id });

    if (!sectionExist) {
      throw new ApolloError(`Section not found`);
    }

    return await this.prisma.mutation.updateSection(
      {
        where: { ...args.where },
        data: { ...args.data },
      },
      info,
    );
  }

  @Mutation('deleteSection')
  @Roles('Especialista')
  @UseGuards(RolesGuard)
  async deleteSection(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    const sectionExist = await this.prisma.exists.Section({ id: args.where.id });

    if (!sectionExist) {
      throw new ApolloError(`Section not found`);
    }

    return await this.prisma.mutation.deleteSection(
      {
        where: { ...args.where },
      },
      info,
    );
  }

  @Mutation('deleteManySections')
  @Roles('Especialista')
  @UseGuards(RolesGuard)
  async deleteManySections(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.mutation.deleteManySections(
      {
        where: { ...args.where },
      },
      info,
    );
  }
}
