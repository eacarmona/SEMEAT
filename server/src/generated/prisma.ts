import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    files: <T = File[]>(args: { where?: FileWhereInput, orderBy?: FileOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    testDatas: <T = TestData[]>(args: { where?: TestDataWhereInput, orderBy?: TestDataOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    exerciseDatas: <T = ExerciseData[]>(args: { where?: ExerciseDataWhereInput, orderBy?: ExerciseDataOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    roles: <T = Role[]>(args: { where?: RoleWhereInput, orderBy?: RoleOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    results: <T = Result[]>(args: { where?: ResultWhereInput, orderBy?: ResultOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    sections: <T = Section[]>(args: { where?: SectionWhereInput, orderBy?: SectionOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    exercises: <T = Exercise[]>(args: { where?: ExerciseWhereInput, orderBy?: ExerciseOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    users: <T = User[]>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    tests: <T = Test[]>(args: { where?: TestWhereInput, orderBy?: TestOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    file: <T = File | null>(args: { where: FileWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    testData: <T = TestData | null>(args: { where: TestDataWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    exerciseData: <T = ExerciseData | null>(args: { where: ExerciseDataWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    role: <T = Role | null>(args: { where: RoleWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    result: <T = Result | null>(args: { where: ResultWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    section: <T = Section | null>(args: { where: SectionWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    exercise: <T = Exercise | null>(args: { where: ExerciseWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    user: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    test: <T = Test | null>(args: { where: TestWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    filesConnection: <T = FileConnection>(args: { where?: FileWhereInput, orderBy?: FileOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    testDatasConnection: <T = TestDataConnection>(args: { where?: TestDataWhereInput, orderBy?: TestDataOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    exerciseDatasConnection: <T = ExerciseDataConnection>(args: { where?: ExerciseDataWhereInput, orderBy?: ExerciseDataOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    rolesConnection: <T = RoleConnection>(args: { where?: RoleWhereInput, orderBy?: RoleOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    resultsConnection: <T = ResultConnection>(args: { where?: ResultWhereInput, orderBy?: ResultOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    sectionsConnection: <T = SectionConnection>(args: { where?: SectionWhereInput, orderBy?: SectionOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    exercisesConnection: <T = ExerciseConnection>(args: { where?: ExerciseWhereInput, orderBy?: ExerciseOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    usersConnection: <T = UserConnection>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    testsConnection: <T = TestConnection>(args: { where?: TestWhereInput, orderBy?: TestOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {
    createFile: <T = File>(args: { data: FileCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createTestData: <T = TestData>(args: { data: TestDataCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createExerciseData: <T = ExerciseData>(args: { data: ExerciseDataCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createRole: <T = Role>(args: { data: RoleCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createResult: <T = Result>(args: { data: ResultCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createSection: <T = Section>(args: { data: SectionCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createExercise: <T = Exercise>(args: { data: ExerciseCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createUser: <T = User>(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createTest: <T = Test>(args: { data: TestCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateFile: <T = File | null>(args: { data: FileUpdateInput, where: FileWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateTestData: <T = TestData | null>(args: { data: TestDataUpdateInput, where: TestDataWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateExerciseData: <T = ExerciseData | null>(args: { data: ExerciseDataUpdateInput, where: ExerciseDataWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateRole: <T = Role | null>(args: { data: RoleUpdateInput, where: RoleWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateResult: <T = Result | null>(args: { data: ResultUpdateInput, where: ResultWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateSection: <T = Section | null>(args: { data: SectionUpdateInput, where: SectionWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateExercise: <T = Exercise | null>(args: { data: ExerciseUpdateInput, where: ExerciseWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateUser: <T = User | null>(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateTest: <T = Test | null>(args: { data: TestUpdateInput, where: TestWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteFile: <T = File | null>(args: { where: FileWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteTestData: <T = TestData | null>(args: { where: TestDataWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteExerciseData: <T = ExerciseData | null>(args: { where: ExerciseDataWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteRole: <T = Role | null>(args: { where: RoleWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteResult: <T = Result | null>(args: { where: ResultWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteSection: <T = Section | null>(args: { where: SectionWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteExercise: <T = Exercise | null>(args: { where: ExerciseWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteUser: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteTest: <T = Test | null>(args: { where: TestWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertFile: <T = File>(args: { where: FileWhereUniqueInput, create: FileCreateInput, update: FileUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertTestData: <T = TestData>(args: { where: TestDataWhereUniqueInput, create: TestDataCreateInput, update: TestDataUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertExerciseData: <T = ExerciseData>(args: { where: ExerciseDataWhereUniqueInput, create: ExerciseDataCreateInput, update: ExerciseDataUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertRole: <T = Role>(args: { where: RoleWhereUniqueInput, create: RoleCreateInput, update: RoleUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertResult: <T = Result>(args: { where: ResultWhereUniqueInput, create: ResultCreateInput, update: ResultUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertSection: <T = Section>(args: { where: SectionWhereUniqueInput, create: SectionCreateInput, update: SectionUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertExercise: <T = Exercise>(args: { where: ExerciseWhereUniqueInput, create: ExerciseCreateInput, update: ExerciseUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertUser: <T = User>(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertTest: <T = Test>(args: { where: TestWhereUniqueInput, create: TestCreateInput, update: TestUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyFiles: <T = BatchPayload>(args: { data: FileUpdateInput, where?: FileWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyTestDatas: <T = BatchPayload>(args: { data: TestDataUpdateInput, where?: TestDataWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyExerciseDatas: <T = BatchPayload>(args: { data: ExerciseDataUpdateInput, where?: ExerciseDataWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyRoles: <T = BatchPayload>(args: { data: RoleUpdateInput, where?: RoleWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyResults: <T = BatchPayload>(args: { data: ResultUpdateInput, where?: ResultWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManySections: <T = BatchPayload>(args: { data: SectionUpdateInput, where?: SectionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyExercises: <T = BatchPayload>(args: { data: ExerciseUpdateInput, where?: ExerciseWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyUsers: <T = BatchPayload>(args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyTests: <T = BatchPayload>(args: { data: TestUpdateInput, where?: TestWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyFiles: <T = BatchPayload>(args: { where?: FileWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyTestDatas: <T = BatchPayload>(args: { where?: TestDataWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyExerciseDatas: <T = BatchPayload>(args: { where?: ExerciseDataWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyRoles: <T = BatchPayload>(args: { where?: RoleWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyResults: <T = BatchPayload>(args: { where?: ResultWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManySections: <T = BatchPayload>(args: { where?: SectionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyExercises: <T = BatchPayload>(args: { where?: ExerciseWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyUsers: <T = BatchPayload>(args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyTests: <T = BatchPayload>(args: { where?: TestWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {
    file: <T = FileSubscriptionPayload | null>(args: { where?: FileSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    testData: <T = TestDataSubscriptionPayload | null>(args: { where?: TestDataSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    exerciseData: <T = ExerciseDataSubscriptionPayload | null>(args: { where?: ExerciseDataSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    role: <T = RoleSubscriptionPayload | null>(args: { where?: RoleSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    result: <T = ResultSubscriptionPayload | null>(args: { where?: ResultSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    section: <T = SectionSubscriptionPayload | null>(args: { where?: SectionSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    exercise: <T = ExerciseSubscriptionPayload | null>(args: { where?: ExerciseSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    user: <T = UserSubscriptionPayload | null>(args: { where?: UserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    test: <T = TestSubscriptionPayload | null>(args: { where?: TestSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  File: (where?: FileWhereInput) => Promise<boolean>
  TestData: (where?: TestDataWhereInput) => Promise<boolean>
  ExerciseData: (where?: ExerciseDataWhereInput) => Promise<boolean>
  Role: (where?: RoleWhereInput) => Promise<boolean>
  Result: (where?: ResultWhereInput) => Promise<boolean>
  Section: (where?: SectionWhereInput) => Promise<boolean>
  Exercise: (where?: ExerciseWhereInput) => Promise<boolean>
  User: (where?: UserWhereInput) => Promise<boolean>
  Test: (where?: TestWhereInput) => Promise<boolean>
}

export interface Prisma {
  query: Query
  mutation: Mutation
  subscription: Subscription
  exists: Exists
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
delegateSubscription(fieldName: string, args?: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(options: BasePrismaOptions): T
}
/**
 * Type Defs
*/

const typeDefs = `type AggregateExercise {
  count: Int!
}

type AggregateExerciseData {
  count: Int!
}

type AggregateFile {
  count: Int!
}

type AggregateResult {
  count: Int!
}

type AggregateRole {
  count: Int!
}

type AggregateSection {
  count: Int!
}

type AggregateTest {
  count: Int!
}

type AggregateTestData {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

enum Codes {
  A0
  A1
  A2
  A3
  A4
  A5
  A6
  A7
  A8
  A9
  B0
  B1
  B2
  B3
  B4
  B5
  B6
  B7
  B8
  B9
  C0
  C1
  C2
  C3
  C4
  C5
  C6
  C7
  C8
  C9
  D0
  D1
  D2
  D3
  D4
  D5
  D6
  D7
  D8
  D9
  E0
  E1
  E2
  E3
  E4
  E5
  E6
  E7
  E8
  E9
  H0
  H1
  H2
  H3
  H4
  H5
  H6
  H7
  H8
  H9
  G0
  G1
  G2
  G3
  G4
  G5
  G6
  G7
  G8
  G9
}

scalar DateTime

enum Dificulty {
  NINGUNO
  INICIAL
  MEDIA
  AVANZADA
}

type Exercise implements Node {
  id: ID!
  code: Codes!
  scale: Int!
  level: Levels!
  description: String
  sections(where: SectionWhereInput, orderBy: SectionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Section!]
}

"""A connection to a list of items."""
type ExerciseConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ExerciseEdge]!
  aggregate: AggregateExercise!
}

input ExerciseCreateInput {
  code: Codes!
  scale: Int
  level: Levels
  description: String
  sections: SectionCreateManyInput
}

input ExerciseCreateManyInput {
  create: [ExerciseCreateInput!]
  connect: [ExerciseWhereUniqueInput!]
}

input ExerciseCreateOneInput {
  create: ExerciseCreateInput
  connect: ExerciseWhereUniqueInput
}

type ExerciseData implements Node {
  id: ID!
  initAt: DateTime!
  finalAt: DateTime!
  createdBy(where: UserWhereInput): User!
  exercise(where: ExerciseWhereInput): Exercise!
  result(where: ResultWhereInput, orderBy: ResultOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Result!]
  dificulty: Dificulty!
  hit: Int
  fault: Int
  omit: Int
  error: Int
  point: Float
  score: Float
}

"""A connection to a list of items."""
type ExerciseDataConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ExerciseDataEdge]!
  aggregate: AggregateExerciseData!
}

input ExerciseDataCreateInput {
  initAt: DateTime!
  finalAt: DateTime!
  dificulty: Dificulty
  hit: Int
  fault: Int
  omit: Int
  error: Int
  point: Float
  score: Float
  createdBy: UserCreateOneInput!
  exercise: ExerciseCreateOneInput!
  result: ResultCreateManyInput
}

input ExerciseDataCreateManyInput {
  create: [ExerciseDataCreateInput!]
  connect: [ExerciseDataWhereUniqueInput!]
}

"""An edge in a connection."""
type ExerciseDataEdge {
  """The item at the end of the edge."""
  node: ExerciseData!

  """A cursor for use in pagination."""
  cursor: String!
}

enum ExerciseDataOrderByInput {
  id_ASC
  id_DESC
  initAt_ASC
  initAt_DESC
  finalAt_ASC
  finalAt_DESC
  dificulty_ASC
  dificulty_DESC
  hit_ASC
  hit_DESC
  fault_ASC
  fault_DESC
  omit_ASC
  omit_DESC
  error_ASC
  error_DESC
  point_ASC
  point_DESC
  score_ASC
  score_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ExerciseDataPreviousValues {
  id: ID!
  initAt: DateTime!
  finalAt: DateTime!
  dificulty: Dificulty!
  hit: Int
  fault: Int
  omit: Int
  error: Int
  point: Float
  score: Float
}

type ExerciseDataSubscriptionPayload {
  mutation: MutationType!
  node: ExerciseData
  updatedFields: [String!]
  previousValues: ExerciseDataPreviousValues
}

input ExerciseDataSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ExerciseDataSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ExerciseDataSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ExerciseDataSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ExerciseDataWhereInput
}

input ExerciseDataUpdateDataInput {
  initAt: DateTime
  finalAt: DateTime
  dificulty: Dificulty
  hit: Int
  fault: Int
  omit: Int
  error: Int
  point: Float
  score: Float
  createdBy: UserUpdateOneInput
  exercise: ExerciseUpdateOneInput
  result: ResultUpdateManyInput
}

input ExerciseDataUpdateInput {
  initAt: DateTime
  finalAt: DateTime
  dificulty: Dificulty
  hit: Int
  fault: Int
  omit: Int
  error: Int
  point: Float
  score: Float
  createdBy: UserUpdateOneInput
  exercise: ExerciseUpdateOneInput
  result: ResultUpdateManyInput
}

input ExerciseDataUpdateManyInput {
  create: [ExerciseDataCreateInput!]
  connect: [ExerciseDataWhereUniqueInput!]
  disconnect: [ExerciseDataWhereUniqueInput!]
  delete: [ExerciseDataWhereUniqueInput!]
  update: [ExerciseDataUpdateWithWhereUniqueNestedInput!]
  upsert: [ExerciseDataUpsertWithWhereUniqueNestedInput!]
}

input ExerciseDataUpdateWithWhereUniqueNestedInput {
  where: ExerciseDataWhereUniqueInput!
  data: ExerciseDataUpdateDataInput!
}

input ExerciseDataUpsertWithWhereUniqueNestedInput {
  where: ExerciseDataWhereUniqueInput!
  update: ExerciseDataUpdateDataInput!
  create: ExerciseDataCreateInput!
}

input ExerciseDataWhereInput {
  """Logical AND on all given filters."""
  AND: [ExerciseDataWhereInput!]

  """Logical OR on all given filters."""
  OR: [ExerciseDataWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ExerciseDataWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  initAt: DateTime

  """All values that are not equal to given value."""
  initAt_not: DateTime

  """All values that are contained in given list."""
  initAt_in: [DateTime!]

  """All values that are not contained in given list."""
  initAt_not_in: [DateTime!]

  """All values less than the given value."""
  initAt_lt: DateTime

  """All values less than or equal the given value."""
  initAt_lte: DateTime

  """All values greater than the given value."""
  initAt_gt: DateTime

  """All values greater than or equal the given value."""
  initAt_gte: DateTime
  finalAt: DateTime

  """All values that are not equal to given value."""
  finalAt_not: DateTime

  """All values that are contained in given list."""
  finalAt_in: [DateTime!]

  """All values that are not contained in given list."""
  finalAt_not_in: [DateTime!]

  """All values less than the given value."""
  finalAt_lt: DateTime

  """All values less than or equal the given value."""
  finalAt_lte: DateTime

  """All values greater than the given value."""
  finalAt_gt: DateTime

  """All values greater than or equal the given value."""
  finalAt_gte: DateTime
  dificulty: Dificulty

  """All values that are not equal to given value."""
  dificulty_not: Dificulty

  """All values that are contained in given list."""
  dificulty_in: [Dificulty!]

  """All values that are not contained in given list."""
  dificulty_not_in: [Dificulty!]
  hit: Int

  """All values that are not equal to given value."""
  hit_not: Int

  """All values that are contained in given list."""
  hit_in: [Int!]

  """All values that are not contained in given list."""
  hit_not_in: [Int!]

  """All values less than the given value."""
  hit_lt: Int

  """All values less than or equal the given value."""
  hit_lte: Int

  """All values greater than the given value."""
  hit_gt: Int

  """All values greater than or equal the given value."""
  hit_gte: Int
  fault: Int

  """All values that are not equal to given value."""
  fault_not: Int

  """All values that are contained in given list."""
  fault_in: [Int!]

  """All values that are not contained in given list."""
  fault_not_in: [Int!]

  """All values less than the given value."""
  fault_lt: Int

  """All values less than or equal the given value."""
  fault_lte: Int

  """All values greater than the given value."""
  fault_gt: Int

  """All values greater than or equal the given value."""
  fault_gte: Int
  omit: Int

  """All values that are not equal to given value."""
  omit_not: Int

  """All values that are contained in given list."""
  omit_in: [Int!]

  """All values that are not contained in given list."""
  omit_not_in: [Int!]

  """All values less than the given value."""
  omit_lt: Int

  """All values less than or equal the given value."""
  omit_lte: Int

  """All values greater than the given value."""
  omit_gt: Int

  """All values greater than or equal the given value."""
  omit_gte: Int
  error: Int

  """All values that are not equal to given value."""
  error_not: Int

  """All values that are contained in given list."""
  error_in: [Int!]

  """All values that are not contained in given list."""
  error_not_in: [Int!]

  """All values less than the given value."""
  error_lt: Int

  """All values less than or equal the given value."""
  error_lte: Int

  """All values greater than the given value."""
  error_gt: Int

  """All values greater than or equal the given value."""
  error_gte: Int
  point: Float

  """All values that are not equal to given value."""
  point_not: Float

  """All values that are contained in given list."""
  point_in: [Float!]

  """All values that are not contained in given list."""
  point_not_in: [Float!]

  """All values less than the given value."""
  point_lt: Float

  """All values less than or equal the given value."""
  point_lte: Float

  """All values greater than the given value."""
  point_gt: Float

  """All values greater than or equal the given value."""
  point_gte: Float
  score: Float

  """All values that are not equal to given value."""
  score_not: Float

  """All values that are contained in given list."""
  score_in: [Float!]

  """All values that are not contained in given list."""
  score_not_in: [Float!]

  """All values less than the given value."""
  score_lt: Float

  """All values less than or equal the given value."""
  score_lte: Float

  """All values greater than the given value."""
  score_gt: Float

  """All values greater than or equal the given value."""
  score_gte: Float
  createdBy: UserWhereInput
  exercise: ExerciseWhereInput
  result_every: ResultWhereInput
  result_some: ResultWhereInput
  result_none: ResultWhereInput
}

input ExerciseDataWhereUniqueInput {
  id: ID
}

"""An edge in a connection."""
type ExerciseEdge {
  """The item at the end of the edge."""
  node: Exercise!

  """A cursor for use in pagination."""
  cursor: String!
}

enum ExerciseOrderByInput {
  id_ASC
  id_DESC
  code_ASC
  code_DESC
  scale_ASC
  scale_DESC
  level_ASC
  level_DESC
  description_ASC
  description_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ExercisePreviousValues {
  id: ID!
  code: Codes!
  scale: Int!
  level: Levels!
  description: String
}

type ExerciseSubscriptionPayload {
  mutation: MutationType!
  node: Exercise
  updatedFields: [String!]
  previousValues: ExercisePreviousValues
}

input ExerciseSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ExerciseSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ExerciseSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ExerciseSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ExerciseWhereInput
}

input ExerciseUpdateDataInput {
  code: Codes
  scale: Int
  level: Levels
  description: String
  sections: SectionUpdateManyInput
}

input ExerciseUpdateInput {
  code: Codes
  scale: Int
  level: Levels
  description: String
  sections: SectionUpdateManyInput
}

input ExerciseUpdateManyInput {
  create: [ExerciseCreateInput!]
  connect: [ExerciseWhereUniqueInput!]
  disconnect: [ExerciseWhereUniqueInput!]
  delete: [ExerciseWhereUniqueInput!]
  update: [ExerciseUpdateWithWhereUniqueNestedInput!]
  upsert: [ExerciseUpsertWithWhereUniqueNestedInput!]
}

input ExerciseUpdateOneInput {
  create: ExerciseCreateInput
  connect: ExerciseWhereUniqueInput
  delete: Boolean
  update: ExerciseUpdateDataInput
  upsert: ExerciseUpsertNestedInput
}

input ExerciseUpdateWithWhereUniqueNestedInput {
  where: ExerciseWhereUniqueInput!
  data: ExerciseUpdateDataInput!
}

input ExerciseUpsertNestedInput {
  update: ExerciseUpdateDataInput!
  create: ExerciseCreateInput!
}

input ExerciseUpsertWithWhereUniqueNestedInput {
  where: ExerciseWhereUniqueInput!
  update: ExerciseUpdateDataInput!
  create: ExerciseCreateInput!
}

input ExerciseWhereInput {
  """Logical AND on all given filters."""
  AND: [ExerciseWhereInput!]

  """Logical OR on all given filters."""
  OR: [ExerciseWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ExerciseWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  code: Codes

  """All values that are not equal to given value."""
  code_not: Codes

  """All values that are contained in given list."""
  code_in: [Codes!]

  """All values that are not contained in given list."""
  code_not_in: [Codes!]
  scale: Int

  """All values that are not equal to given value."""
  scale_not: Int

  """All values that are contained in given list."""
  scale_in: [Int!]

  """All values that are not contained in given list."""
  scale_not_in: [Int!]

  """All values less than the given value."""
  scale_lt: Int

  """All values less than or equal the given value."""
  scale_lte: Int

  """All values greater than the given value."""
  scale_gt: Int

  """All values greater than or equal the given value."""
  scale_gte: Int
  level: Levels

  """All values that are not equal to given value."""
  level_not: Levels

  """All values that are contained in given list."""
  level_in: [Levels!]

  """All values that are not contained in given list."""
  level_not_in: [Levels!]
  description: String

  """All values that are not equal to given value."""
  description_not: String

  """All values that are contained in given list."""
  description_in: [String!]

  """All values that are not contained in given list."""
  description_not_in: [String!]

  """All values less than the given value."""
  description_lt: String

  """All values less than or equal the given value."""
  description_lte: String

  """All values greater than the given value."""
  description_gt: String

  """All values greater than or equal the given value."""
  description_gte: String

  """All values containing the given string."""
  description_contains: String

  """All values not containing the given string."""
  description_not_contains: String

  """All values starting with the given string."""
  description_starts_with: String

  """All values not starting with the given string."""
  description_not_starts_with: String

  """All values ending with the given string."""
  description_ends_with: String

  """All values not ending with the given string."""
  description_not_ends_with: String
  sections_every: SectionWhereInput
  sections_some: SectionWhereInput
  sections_none: SectionWhereInput
}

input ExerciseWhereUniqueInput {
  id: ID
  code: Codes
}

type File implements Node {
  id: ID!
  path: String!
  filename: String!
  mimetype: String!
  encoding: String!
  size: Int!
}

"""A connection to a list of items."""
type FileConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [FileEdge]!
  aggregate: AggregateFile!
}

input FileCreateInput {
  path: String!
  filename: String!
  mimetype: String!
  encoding: String!
  size: Int!
}

"""An edge in a connection."""
type FileEdge {
  """The item at the end of the edge."""
  node: File!

  """A cursor for use in pagination."""
  cursor: String!
}

enum FileOrderByInput {
  id_ASC
  id_DESC
  path_ASC
  path_DESC
  filename_ASC
  filename_DESC
  mimetype_ASC
  mimetype_DESC
  encoding_ASC
  encoding_DESC
  size_ASC
  size_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type FilePreviousValues {
  id: ID!
  path: String!
  filename: String!
  mimetype: String!
  encoding: String!
  size: Int!
}

type FileSubscriptionPayload {
  mutation: MutationType!
  node: File
  updatedFields: [String!]
  previousValues: FilePreviousValues
}

input FileSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [FileSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [FileSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [FileSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: FileWhereInput
}

input FileUpdateInput {
  path: String
  filename: String
  mimetype: String
  encoding: String
  size: Int
}

input FileWhereInput {
  """Logical AND on all given filters."""
  AND: [FileWhereInput!]

  """Logical OR on all given filters."""
  OR: [FileWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [FileWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  path: String

  """All values that are not equal to given value."""
  path_not: String

  """All values that are contained in given list."""
  path_in: [String!]

  """All values that are not contained in given list."""
  path_not_in: [String!]

  """All values less than the given value."""
  path_lt: String

  """All values less than or equal the given value."""
  path_lte: String

  """All values greater than the given value."""
  path_gt: String

  """All values greater than or equal the given value."""
  path_gte: String

  """All values containing the given string."""
  path_contains: String

  """All values not containing the given string."""
  path_not_contains: String

  """All values starting with the given string."""
  path_starts_with: String

  """All values not starting with the given string."""
  path_not_starts_with: String

  """All values ending with the given string."""
  path_ends_with: String

  """All values not ending with the given string."""
  path_not_ends_with: String
  filename: String

  """All values that are not equal to given value."""
  filename_not: String

  """All values that are contained in given list."""
  filename_in: [String!]

  """All values that are not contained in given list."""
  filename_not_in: [String!]

  """All values less than the given value."""
  filename_lt: String

  """All values less than or equal the given value."""
  filename_lte: String

  """All values greater than the given value."""
  filename_gt: String

  """All values greater than or equal the given value."""
  filename_gte: String

  """All values containing the given string."""
  filename_contains: String

  """All values not containing the given string."""
  filename_not_contains: String

  """All values starting with the given string."""
  filename_starts_with: String

  """All values not starting with the given string."""
  filename_not_starts_with: String

  """All values ending with the given string."""
  filename_ends_with: String

  """All values not ending with the given string."""
  filename_not_ends_with: String
  mimetype: String

  """All values that are not equal to given value."""
  mimetype_not: String

  """All values that are contained in given list."""
  mimetype_in: [String!]

  """All values that are not contained in given list."""
  mimetype_not_in: [String!]

  """All values less than the given value."""
  mimetype_lt: String

  """All values less than or equal the given value."""
  mimetype_lte: String

  """All values greater than the given value."""
  mimetype_gt: String

  """All values greater than or equal the given value."""
  mimetype_gte: String

  """All values containing the given string."""
  mimetype_contains: String

  """All values not containing the given string."""
  mimetype_not_contains: String

  """All values starting with the given string."""
  mimetype_starts_with: String

  """All values not starting with the given string."""
  mimetype_not_starts_with: String

  """All values ending with the given string."""
  mimetype_ends_with: String

  """All values not ending with the given string."""
  mimetype_not_ends_with: String
  encoding: String

  """All values that are not equal to given value."""
  encoding_not: String

  """All values that are contained in given list."""
  encoding_in: [String!]

  """All values that are not contained in given list."""
  encoding_not_in: [String!]

  """All values less than the given value."""
  encoding_lt: String

  """All values less than or equal the given value."""
  encoding_lte: String

  """All values greater than the given value."""
  encoding_gt: String

  """All values greater than or equal the given value."""
  encoding_gte: String

  """All values containing the given string."""
  encoding_contains: String

  """All values not containing the given string."""
  encoding_not_contains: String

  """All values starting with the given string."""
  encoding_starts_with: String

  """All values not starting with the given string."""
  encoding_not_starts_with: String

  """All values ending with the given string."""
  encoding_ends_with: String

  """All values not ending with the given string."""
  encoding_not_ends_with: String
  size: Int

  """All values that are not equal to given value."""
  size_not: Int

  """All values that are contained in given list."""
  size_in: [Int!]

  """All values that are not contained in given list."""
  size_not_in: [Int!]

  """All values less than the given value."""
  size_lt: Int

  """All values less than or equal the given value."""
  size_lte: Int

  """All values greater than the given value."""
  size_gt: Int

  """All values greater than or equal the given value."""
  size_gte: Int
}

input FileWhereUniqueInput {
  id: ID
}

enum Levels {
  NINGUNO
  ENFOCADA
  SOSTENIDA
  SELECTIVA
  ALTERNADA
  DIVIDIDA
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createFile(data: FileCreateInput!): File!
  createTestData(data: TestDataCreateInput!): TestData!
  createExerciseData(data: ExerciseDataCreateInput!): ExerciseData!
  createRole(data: RoleCreateInput!): Role!
  createResult(data: ResultCreateInput!): Result!
  createSection(data: SectionCreateInput!): Section!
  createExercise(data: ExerciseCreateInput!): Exercise!
  createUser(data: UserCreateInput!): User!
  createTest(data: TestCreateInput!): Test!
  updateFile(data: FileUpdateInput!, where: FileWhereUniqueInput!): File
  updateTestData(data: TestDataUpdateInput!, where: TestDataWhereUniqueInput!): TestData
  updateExerciseData(data: ExerciseDataUpdateInput!, where: ExerciseDataWhereUniqueInput!): ExerciseData
  updateRole(data: RoleUpdateInput!, where: RoleWhereUniqueInput!): Role
  updateResult(data: ResultUpdateInput!, where: ResultWhereUniqueInput!): Result
  updateSection(data: SectionUpdateInput!, where: SectionWhereUniqueInput!): Section
  updateExercise(data: ExerciseUpdateInput!, where: ExerciseWhereUniqueInput!): Exercise
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateTest(data: TestUpdateInput!, where: TestWhereUniqueInput!): Test
  deleteFile(where: FileWhereUniqueInput!): File
  deleteTestData(where: TestDataWhereUniqueInput!): TestData
  deleteExerciseData(where: ExerciseDataWhereUniqueInput!): ExerciseData
  deleteRole(where: RoleWhereUniqueInput!): Role
  deleteResult(where: ResultWhereUniqueInput!): Result
  deleteSection(where: SectionWhereUniqueInput!): Section
  deleteExercise(where: ExerciseWhereUniqueInput!): Exercise
  deleteUser(where: UserWhereUniqueInput!): User
  deleteTest(where: TestWhereUniqueInput!): Test
  upsertFile(where: FileWhereUniqueInput!, create: FileCreateInput!, update: FileUpdateInput!): File!
  upsertTestData(where: TestDataWhereUniqueInput!, create: TestDataCreateInput!, update: TestDataUpdateInput!): TestData!
  upsertExerciseData(where: ExerciseDataWhereUniqueInput!, create: ExerciseDataCreateInput!, update: ExerciseDataUpdateInput!): ExerciseData!
  upsertRole(where: RoleWhereUniqueInput!, create: RoleCreateInput!, update: RoleUpdateInput!): Role!
  upsertResult(where: ResultWhereUniqueInput!, create: ResultCreateInput!, update: ResultUpdateInput!): Result!
  upsertSection(where: SectionWhereUniqueInput!, create: SectionCreateInput!, update: SectionUpdateInput!): Section!
  upsertExercise(where: ExerciseWhereUniqueInput!, create: ExerciseCreateInput!, update: ExerciseUpdateInput!): Exercise!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertTest(where: TestWhereUniqueInput!, create: TestCreateInput!, update: TestUpdateInput!): Test!
  updateManyFiles(data: FileUpdateInput!, where: FileWhereInput): BatchPayload!
  updateManyTestDatas(data: TestDataUpdateInput!, where: TestDataWhereInput): BatchPayload!
  updateManyExerciseDatas(data: ExerciseDataUpdateInput!, where: ExerciseDataWhereInput): BatchPayload!
  updateManyRoles(data: RoleUpdateInput!, where: RoleWhereInput): BatchPayload!
  updateManyResults(data: ResultUpdateInput!, where: ResultWhereInput): BatchPayload!
  updateManySections(data: SectionUpdateInput!, where: SectionWhereInput): BatchPayload!
  updateManyExercises(data: ExerciseUpdateInput!, where: ExerciseWhereInput): BatchPayload!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyTests(data: TestUpdateInput!, where: TestWhereInput): BatchPayload!
  deleteManyFiles(where: FileWhereInput): BatchPayload!
  deleteManyTestDatas(where: TestDataWhereInput): BatchPayload!
  deleteManyExerciseDatas(where: ExerciseDataWhereInput): BatchPayload!
  deleteManyRoles(where: RoleWhereInput): BatchPayload!
  deleteManyResults(where: ResultWhereInput): BatchPayload!
  deleteManySections(where: SectionWhereInput): BatchPayload!
  deleteManyExercises(where: ExerciseWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyTests(where: TestWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Query {
  files(where: FileWhereInput, orderBy: FileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [File]!
  testDatas(where: TestDataWhereInput, orderBy: TestDataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TestData]!
  exerciseDatas(where: ExerciseDataWhereInput, orderBy: ExerciseDataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ExerciseData]!
  roles(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Role]!
  results(where: ResultWhereInput, orderBy: ResultOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Result]!
  sections(where: SectionWhereInput, orderBy: SectionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Section]!
  exercises(where: ExerciseWhereInput, orderBy: ExerciseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Exercise]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  tests(where: TestWhereInput, orderBy: TestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Test]!
  file(where: FileWhereUniqueInput!): File
  testData(where: TestDataWhereUniqueInput!): TestData
  exerciseData(where: ExerciseDataWhereUniqueInput!): ExerciseData
  role(where: RoleWhereUniqueInput!): Role
  result(where: ResultWhereUniqueInput!): Result
  section(where: SectionWhereUniqueInput!): Section
  exercise(where: ExerciseWhereUniqueInput!): Exercise
  user(where: UserWhereUniqueInput!): User
  test(where: TestWhereUniqueInput!): Test
  filesConnection(where: FileWhereInput, orderBy: FileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): FileConnection!
  testDatasConnection(where: TestDataWhereInput, orderBy: TestDataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TestDataConnection!
  exerciseDatasConnection(where: ExerciseDataWhereInput, orderBy: ExerciseDataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ExerciseDataConnection!
  rolesConnection(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RoleConnection!
  resultsConnection(where: ResultWhereInput, orderBy: ResultOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ResultConnection!
  sectionsConnection(where: SectionWhereInput, orderBy: SectionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SectionConnection!
  exercisesConnection(where: ExerciseWhereInput, orderBy: ExerciseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ExerciseConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  testsConnection(where: TestWhereInput, orderBy: TestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TestConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Result implements Node {
  id: ID!
  question: String!
  response: String!
}

"""A connection to a list of items."""
type ResultConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ResultEdge]!
  aggregate: AggregateResult!
}

input ResultCreateInput {
  question: String!
  response: String!
}

input ResultCreateManyInput {
  create: [ResultCreateInput!]
  connect: [ResultWhereUniqueInput!]
}

"""An edge in a connection."""
type ResultEdge {
  """The item at the end of the edge."""
  node: Result!

  """A cursor for use in pagination."""
  cursor: String!
}

enum ResultOrderByInput {
  id_ASC
  id_DESC
  question_ASC
  question_DESC
  response_ASC
  response_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ResultPreviousValues {
  id: ID!
  question: String!
  response: String!
}

type ResultSubscriptionPayload {
  mutation: MutationType!
  node: Result
  updatedFields: [String!]
  previousValues: ResultPreviousValues
}

input ResultSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ResultSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ResultSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ResultSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ResultWhereInput
}

input ResultUpdateDataInput {
  question: String
  response: String
}

input ResultUpdateInput {
  question: String
  response: String
}

input ResultUpdateManyInput {
  create: [ResultCreateInput!]
  connect: [ResultWhereUniqueInput!]
  disconnect: [ResultWhereUniqueInput!]
  delete: [ResultWhereUniqueInput!]
  update: [ResultUpdateWithWhereUniqueNestedInput!]
  upsert: [ResultUpsertWithWhereUniqueNestedInput!]
}

input ResultUpdateWithWhereUniqueNestedInput {
  where: ResultWhereUniqueInput!
  data: ResultUpdateDataInput!
}

input ResultUpsertWithWhereUniqueNestedInput {
  where: ResultWhereUniqueInput!
  update: ResultUpdateDataInput!
  create: ResultCreateInput!
}

input ResultWhereInput {
  """Logical AND on all given filters."""
  AND: [ResultWhereInput!]

  """Logical OR on all given filters."""
  OR: [ResultWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ResultWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  question: String

  """All values that are not equal to given value."""
  question_not: String

  """All values that are contained in given list."""
  question_in: [String!]

  """All values that are not contained in given list."""
  question_not_in: [String!]

  """All values less than the given value."""
  question_lt: String

  """All values less than or equal the given value."""
  question_lte: String

  """All values greater than the given value."""
  question_gt: String

  """All values greater than or equal the given value."""
  question_gte: String

  """All values containing the given string."""
  question_contains: String

  """All values not containing the given string."""
  question_not_contains: String

  """All values starting with the given string."""
  question_starts_with: String

  """All values not starting with the given string."""
  question_not_starts_with: String

  """All values ending with the given string."""
  question_ends_with: String

  """All values not ending with the given string."""
  question_not_ends_with: String
  response: String

  """All values that are not equal to given value."""
  response_not: String

  """All values that are contained in given list."""
  response_in: [String!]

  """All values that are not contained in given list."""
  response_not_in: [String!]

  """All values less than the given value."""
  response_lt: String

  """All values less than or equal the given value."""
  response_lte: String

  """All values greater than the given value."""
  response_gt: String

  """All values greater than or equal the given value."""
  response_gte: String

  """All values containing the given string."""
  response_contains: String

  """All values not containing the given string."""
  response_not_contains: String

  """All values starting with the given string."""
  response_starts_with: String

  """All values not starting with the given string."""
  response_not_starts_with: String

  """All values ending with the given string."""
  response_ends_with: String

  """All values not ending with the given string."""
  response_not_ends_with: String
}

input ResultWhereUniqueInput {
  id: ID
}

type Role implements Node {
  id: ID!
  name: String!
  description: String
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

"""A connection to a list of items."""
type RoleConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [RoleEdge]!
  aggregate: AggregateRole!
}

input RoleCreateInput {
  name: String!
  description: String
  users: UserCreateManyInput
}

input RoleCreateManyInput {
  create: [RoleCreateInput!]
  connect: [RoleWhereUniqueInput!]
}

"""An edge in a connection."""
type RoleEdge {
  """The item at the end of the edge."""
  node: Role!

  """A cursor for use in pagination."""
  cursor: String!
}

enum RoleOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type RolePreviousValues {
  id: ID!
  name: String!
  description: String
}

type RoleSubscriptionPayload {
  mutation: MutationType!
  node: Role
  updatedFields: [String!]
  previousValues: RolePreviousValues
}

input RoleSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [RoleSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [RoleSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [RoleSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: RoleWhereInput
}

input RoleUpdateDataInput {
  name: String
  description: String
  users: UserUpdateManyInput
}

input RoleUpdateInput {
  name: String
  description: String
  users: UserUpdateManyInput
}

input RoleUpdateManyInput {
  create: [RoleCreateInput!]
  connect: [RoleWhereUniqueInput!]
  disconnect: [RoleWhereUniqueInput!]
  delete: [RoleWhereUniqueInput!]
  update: [RoleUpdateWithWhereUniqueNestedInput!]
  upsert: [RoleUpsertWithWhereUniqueNestedInput!]
}

input RoleUpdateWithWhereUniqueNestedInput {
  where: RoleWhereUniqueInput!
  data: RoleUpdateDataInput!
}

input RoleUpsertWithWhereUniqueNestedInput {
  where: RoleWhereUniqueInput!
  update: RoleUpdateDataInput!
  create: RoleCreateInput!
}

input RoleWhereInput {
  """Logical AND on all given filters."""
  AND: [RoleWhereInput!]

  """Logical OR on all given filters."""
  OR: [RoleWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [RoleWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  description: String

  """All values that are not equal to given value."""
  description_not: String

  """All values that are contained in given list."""
  description_in: [String!]

  """All values that are not contained in given list."""
  description_not_in: [String!]

  """All values less than the given value."""
  description_lt: String

  """All values less than or equal the given value."""
  description_lte: String

  """All values greater than the given value."""
  description_gt: String

  """All values greater than or equal the given value."""
  description_gte: String

  """All values containing the given string."""
  description_contains: String

  """All values not containing the given string."""
  description_not_contains: String

  """All values starting with the given string."""
  description_starts_with: String

  """All values not starting with the given string."""
  description_not_starts_with: String

  """All values ending with the given string."""
  description_ends_with: String

  """All values not ending with the given string."""
  description_not_ends_with: String
  users_every: UserWhereInput
  users_some: UserWhereInput
  users_none: UserWhereInput
}

input RoleWhereUniqueInput {
  id: ID
  name: String
}

type Section implements Node {
  id: ID!
  name: String!
  description: String
  enable: Boolean!
  exercises(where: ExerciseWhereInput, orderBy: ExerciseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Exercise!]
  tests(where: TestWhereInput, orderBy: TestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Test!]
}

"""A connection to a list of items."""
type SectionConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [SectionEdge]!
  aggregate: AggregateSection!
}

input SectionCreateInput {
  name: String!
  description: String
  enable: Boolean
  exercises: ExerciseCreateManyInput
  tests: TestCreateManyInput
}

input SectionCreateManyInput {
  create: [SectionCreateInput!]
  connect: [SectionWhereUniqueInput!]
}

"""An edge in a connection."""
type SectionEdge {
  """The item at the end of the edge."""
  node: Section!

  """A cursor for use in pagination."""
  cursor: String!
}

enum SectionOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  enable_ASC
  enable_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type SectionPreviousValues {
  id: ID!
  name: String!
  description: String
  enable: Boolean!
}

type SectionSubscriptionPayload {
  mutation: MutationType!
  node: Section
  updatedFields: [String!]
  previousValues: SectionPreviousValues
}

input SectionSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [SectionSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [SectionSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [SectionSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: SectionWhereInput
}

input SectionUpdateDataInput {
  name: String
  description: String
  enable: Boolean
  exercises: ExerciseUpdateManyInput
  tests: TestUpdateManyInput
}

input SectionUpdateInput {
  name: String
  description: String
  enable: Boolean
  exercises: ExerciseUpdateManyInput
  tests: TestUpdateManyInput
}

input SectionUpdateManyInput {
  create: [SectionCreateInput!]
  connect: [SectionWhereUniqueInput!]
  disconnect: [SectionWhereUniqueInput!]
  delete: [SectionWhereUniqueInput!]
  update: [SectionUpdateWithWhereUniqueNestedInput!]
  upsert: [SectionUpsertWithWhereUniqueNestedInput!]
}

input SectionUpdateWithWhereUniqueNestedInput {
  where: SectionWhereUniqueInput!
  data: SectionUpdateDataInput!
}

input SectionUpsertWithWhereUniqueNestedInput {
  where: SectionWhereUniqueInput!
  update: SectionUpdateDataInput!
  create: SectionCreateInput!
}

input SectionWhereInput {
  """Logical AND on all given filters."""
  AND: [SectionWhereInput!]

  """Logical OR on all given filters."""
  OR: [SectionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [SectionWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  description: String

  """All values that are not equal to given value."""
  description_not: String

  """All values that are contained in given list."""
  description_in: [String!]

  """All values that are not contained in given list."""
  description_not_in: [String!]

  """All values less than the given value."""
  description_lt: String

  """All values less than or equal the given value."""
  description_lte: String

  """All values greater than the given value."""
  description_gt: String

  """All values greater than or equal the given value."""
  description_gte: String

  """All values containing the given string."""
  description_contains: String

  """All values not containing the given string."""
  description_not_contains: String

  """All values starting with the given string."""
  description_starts_with: String

  """All values not starting with the given string."""
  description_not_starts_with: String

  """All values ending with the given string."""
  description_ends_with: String

  """All values not ending with the given string."""
  description_not_ends_with: String
  enable: Boolean

  """All values that are not equal to given value."""
  enable_not: Boolean
  exercises_every: ExerciseWhereInput
  exercises_some: ExerciseWhereInput
  exercises_none: ExerciseWhereInput
  tests_every: TestWhereInput
  tests_some: TestWhereInput
  tests_none: TestWhereInput
}

input SectionWhereUniqueInput {
  id: ID
  name: String
}

enum Sexs {
  MALE
  FEMALE
}

type Subscription {
  file(where: FileSubscriptionWhereInput): FileSubscriptionPayload
  testData(where: TestDataSubscriptionWhereInput): TestDataSubscriptionPayload
  exerciseData(where: ExerciseDataSubscriptionWhereInput): ExerciseDataSubscriptionPayload
  role(where: RoleSubscriptionWhereInput): RoleSubscriptionPayload
  result(where: ResultSubscriptionWhereInput): ResultSubscriptionPayload
  section(where: SectionSubscriptionWhereInput): SectionSubscriptionPayload
  exercise(where: ExerciseSubscriptionWhereInput): ExerciseSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  test(where: TestSubscriptionWhereInput): TestSubscriptionPayload
}

type Test implements Node {
  id: ID!
  type: Types!
  description: String
  enable: Boolean!
  sections(where: SectionWhereInput, orderBy: SectionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Section!]
}

"""A connection to a list of items."""
type TestConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [TestEdge]!
  aggregate: AggregateTest!
}

input TestCreateInput {
  type: Types!
  description: String
  enable: Boolean
  sections: SectionCreateManyInput
}

input TestCreateManyInput {
  create: [TestCreateInput!]
  connect: [TestWhereUniqueInput!]
}

type TestData implements Node {
  id: ID!
  type: Types!
  createdBy(where: UserWhereInput): User!
  initAt: DateTime!
  finalAt: DateTime!
  exerciseDatas(where: ExerciseDataWhereInput, orderBy: ExerciseDataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ExerciseData!]
}

"""A connection to a list of items."""
type TestDataConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [TestDataEdge]!
  aggregate: AggregateTestData!
}

input TestDataCreateInput {
  type: Types!
  initAt: DateTime!
  finalAt: DateTime!
  createdBy: UserCreateOneInput!
  exerciseDatas: ExerciseDataCreateManyInput
}

"""An edge in a connection."""
type TestDataEdge {
  """The item at the end of the edge."""
  node: TestData!

  """A cursor for use in pagination."""
  cursor: String!
}

enum TestDataOrderByInput {
  id_ASC
  id_DESC
  type_ASC
  type_DESC
  initAt_ASC
  initAt_DESC
  finalAt_ASC
  finalAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type TestDataPreviousValues {
  id: ID!
  type: Types!
  initAt: DateTime!
  finalAt: DateTime!
}

type TestDataSubscriptionPayload {
  mutation: MutationType!
  node: TestData
  updatedFields: [String!]
  previousValues: TestDataPreviousValues
}

input TestDataSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [TestDataSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TestDataSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TestDataSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TestDataWhereInput
}

input TestDataUpdateInput {
  type: Types
  initAt: DateTime
  finalAt: DateTime
  createdBy: UserUpdateOneInput
  exerciseDatas: ExerciseDataUpdateManyInput
}

input TestDataWhereInput {
  """Logical AND on all given filters."""
  AND: [TestDataWhereInput!]

  """Logical OR on all given filters."""
  OR: [TestDataWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TestDataWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  type: Types

  """All values that are not equal to given value."""
  type_not: Types

  """All values that are contained in given list."""
  type_in: [Types!]

  """All values that are not contained in given list."""
  type_not_in: [Types!]
  initAt: DateTime

  """All values that are not equal to given value."""
  initAt_not: DateTime

  """All values that are contained in given list."""
  initAt_in: [DateTime!]

  """All values that are not contained in given list."""
  initAt_not_in: [DateTime!]

  """All values less than the given value."""
  initAt_lt: DateTime

  """All values less than or equal the given value."""
  initAt_lte: DateTime

  """All values greater than the given value."""
  initAt_gt: DateTime

  """All values greater than or equal the given value."""
  initAt_gte: DateTime
  finalAt: DateTime

  """All values that are not equal to given value."""
  finalAt_not: DateTime

  """All values that are contained in given list."""
  finalAt_in: [DateTime!]

  """All values that are not contained in given list."""
  finalAt_not_in: [DateTime!]

  """All values less than the given value."""
  finalAt_lt: DateTime

  """All values less than or equal the given value."""
  finalAt_lte: DateTime

  """All values greater than the given value."""
  finalAt_gt: DateTime

  """All values greater than or equal the given value."""
  finalAt_gte: DateTime
  createdBy: UserWhereInput
  exerciseDatas_every: ExerciseDataWhereInput
  exerciseDatas_some: ExerciseDataWhereInput
  exerciseDatas_none: ExerciseDataWhereInput
}

input TestDataWhereUniqueInput {
  id: ID
}

"""An edge in a connection."""
type TestEdge {
  """The item at the end of the edge."""
  node: Test!

  """A cursor for use in pagination."""
  cursor: String!
}

enum TestOrderByInput {
  id_ASC
  id_DESC
  type_ASC
  type_DESC
  description_ASC
  description_DESC
  enable_ASC
  enable_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type TestPreviousValues {
  id: ID!
  type: Types!
  description: String
  enable: Boolean!
}

type TestSubscriptionPayload {
  mutation: MutationType!
  node: Test
  updatedFields: [String!]
  previousValues: TestPreviousValues
}

input TestSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [TestSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TestSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TestSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TestWhereInput
}

input TestUpdateDataInput {
  type: Types
  description: String
  enable: Boolean
  sections: SectionUpdateManyInput
}

input TestUpdateInput {
  type: Types
  description: String
  enable: Boolean
  sections: SectionUpdateManyInput
}

input TestUpdateManyInput {
  create: [TestCreateInput!]
  connect: [TestWhereUniqueInput!]
  disconnect: [TestWhereUniqueInput!]
  delete: [TestWhereUniqueInput!]
  update: [TestUpdateWithWhereUniqueNestedInput!]
  upsert: [TestUpsertWithWhereUniqueNestedInput!]
}

input TestUpdateWithWhereUniqueNestedInput {
  where: TestWhereUniqueInput!
  data: TestUpdateDataInput!
}

input TestUpsertWithWhereUniqueNestedInput {
  where: TestWhereUniqueInput!
  update: TestUpdateDataInput!
  create: TestCreateInput!
}

input TestWhereInput {
  """Logical AND on all given filters."""
  AND: [TestWhereInput!]

  """Logical OR on all given filters."""
  OR: [TestWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TestWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  type: Types

  """All values that are not equal to given value."""
  type_not: Types

  """All values that are contained in given list."""
  type_in: [Types!]

  """All values that are not contained in given list."""
  type_not_in: [Types!]
  description: String

  """All values that are not equal to given value."""
  description_not: String

  """All values that are contained in given list."""
  description_in: [String!]

  """All values that are not contained in given list."""
  description_not_in: [String!]

  """All values less than the given value."""
  description_lt: String

  """All values less than or equal the given value."""
  description_lte: String

  """All values greater than the given value."""
  description_gt: String

  """All values greater than or equal the given value."""
  description_gte: String

  """All values containing the given string."""
  description_contains: String

  """All values not containing the given string."""
  description_not_contains: String

  """All values starting with the given string."""
  description_starts_with: String

  """All values not starting with the given string."""
  description_not_starts_with: String

  """All values ending with the given string."""
  description_ends_with: String

  """All values not ending with the given string."""
  description_not_ends_with: String
  enable: Boolean

  """All values that are not equal to given value."""
  enable_not: Boolean
  sections_every: SectionWhereInput
  sections_some: SectionWhereInput
  sections_none: SectionWhereInput
}

input TestWhereUniqueInput {
  id: ID
}

enum Types {
  INICIAL
  ENFOCADA
  SOSTENIDA
  SELECTIVA
  ALTERNADA
  DIVIDIDA
}

type User implements Node {
  id: ID!
  email: String!
  password: String
  firstname: String!
  lastname: String!
  birthdate: DateTime!
  sex: Sexs!
  roles(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Role!]
}

"""A connection to a list of items."""
type UserConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  password: String
  firstname: String!
  lastname: String!
  birthdate: DateTime!
  sex: Sexs!
  roles: RoleCreateManyInput
}

input UserCreateManyInput {
  create: [UserCreateInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

"""An edge in a connection."""
type UserEdge {
  """The item at the end of the edge."""
  node: User!

  """A cursor for use in pagination."""
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  firstname_ASC
  firstname_DESC
  lastname_ASC
  lastname_DESC
  birthdate_ASC
  birthdate_DESC
  sex_ASC
  sex_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  password: String
  firstname: String!
  lastname: String!
  birthdate: DateTime!
  sex: Sexs!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [UserSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateDataInput {
  email: String
  password: String
  firstname: String
  lastname: String
  birthdate: DateTime
  sex: Sexs
  roles: RoleUpdateManyInput
}

input UserUpdateInput {
  email: String
  password: String
  firstname: String
  lastname: String
  birthdate: DateTime
  sex: Sexs
  roles: RoleUpdateManyInput
}

input UserUpdateManyInput {
  create: [UserCreateInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  delete: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueNestedInput!]
  upsert: [UserUpsertWithWhereUniqueNestedInput!]
}

input UserUpdateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
}

input UserUpdateWithWhereUniqueNestedInput {
  where: UserWhereUniqueInput!
  data: UserUpdateDataInput!
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithWhereUniqueNestedInput {
  where: UserWhereUniqueInput!
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserWhereInput {
  """Logical AND on all given filters."""
  AND: [UserWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  email: String

  """All values that are not equal to given value."""
  email_not: String

  """All values that are contained in given list."""
  email_in: [String!]

  """All values that are not contained in given list."""
  email_not_in: [String!]

  """All values less than the given value."""
  email_lt: String

  """All values less than or equal the given value."""
  email_lte: String

  """All values greater than the given value."""
  email_gt: String

  """All values greater than or equal the given value."""
  email_gte: String

  """All values containing the given string."""
  email_contains: String

  """All values not containing the given string."""
  email_not_contains: String

  """All values starting with the given string."""
  email_starts_with: String

  """All values not starting with the given string."""
  email_not_starts_with: String

  """All values ending with the given string."""
  email_ends_with: String

  """All values not ending with the given string."""
  email_not_ends_with: String
  password: String

  """All values that are not equal to given value."""
  password_not: String

  """All values that are contained in given list."""
  password_in: [String!]

  """All values that are not contained in given list."""
  password_not_in: [String!]

  """All values less than the given value."""
  password_lt: String

  """All values less than or equal the given value."""
  password_lte: String

  """All values greater than the given value."""
  password_gt: String

  """All values greater than or equal the given value."""
  password_gte: String

  """All values containing the given string."""
  password_contains: String

  """All values not containing the given string."""
  password_not_contains: String

  """All values starting with the given string."""
  password_starts_with: String

  """All values not starting with the given string."""
  password_not_starts_with: String

  """All values ending with the given string."""
  password_ends_with: String

  """All values not ending with the given string."""
  password_not_ends_with: String
  firstname: String

  """All values that are not equal to given value."""
  firstname_not: String

  """All values that are contained in given list."""
  firstname_in: [String!]

  """All values that are not contained in given list."""
  firstname_not_in: [String!]

  """All values less than the given value."""
  firstname_lt: String

  """All values less than or equal the given value."""
  firstname_lte: String

  """All values greater than the given value."""
  firstname_gt: String

  """All values greater than or equal the given value."""
  firstname_gte: String

  """All values containing the given string."""
  firstname_contains: String

  """All values not containing the given string."""
  firstname_not_contains: String

  """All values starting with the given string."""
  firstname_starts_with: String

  """All values not starting with the given string."""
  firstname_not_starts_with: String

  """All values ending with the given string."""
  firstname_ends_with: String

  """All values not ending with the given string."""
  firstname_not_ends_with: String
  lastname: String

  """All values that are not equal to given value."""
  lastname_not: String

  """All values that are contained in given list."""
  lastname_in: [String!]

  """All values that are not contained in given list."""
  lastname_not_in: [String!]

  """All values less than the given value."""
  lastname_lt: String

  """All values less than or equal the given value."""
  lastname_lte: String

  """All values greater than the given value."""
  lastname_gt: String

  """All values greater than or equal the given value."""
  lastname_gte: String

  """All values containing the given string."""
  lastname_contains: String

  """All values not containing the given string."""
  lastname_not_contains: String

  """All values starting with the given string."""
  lastname_starts_with: String

  """All values not starting with the given string."""
  lastname_not_starts_with: String

  """All values ending with the given string."""
  lastname_ends_with: String

  """All values not ending with the given string."""
  lastname_not_ends_with: String
  birthdate: DateTime

  """All values that are not equal to given value."""
  birthdate_not: DateTime

  """All values that are contained in given list."""
  birthdate_in: [DateTime!]

  """All values that are not contained in given list."""
  birthdate_not_in: [DateTime!]

  """All values less than the given value."""
  birthdate_lt: DateTime

  """All values less than or equal the given value."""
  birthdate_lte: DateTime

  """All values greater than the given value."""
  birthdate_gt: DateTime

  """All values greater than or equal the given value."""
  birthdate_gte: DateTime
  sex: Sexs

  """All values that are not equal to given value."""
  sex_not: Sexs

  """All values that are contained in given list."""
  sex_in: [Sexs!]

  """All values that are not contained in given list."""
  sex_not_in: [Sexs!]
  roles_every: RoleWhereInput
  roles_some: RoleWhereInput
  roles_none: RoleWhereInput
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs})

/**
 * Types
*/

export type ExerciseDataOrderByInput =   'id_ASC' |
  'id_DESC' |
  'initAt_ASC' |
  'initAt_DESC' |
  'finalAt_ASC' |
  'finalAt_DESC' |
  'dificulty_ASC' |
  'dificulty_DESC' |
  'hit_ASC' |
  'hit_DESC' |
  'fault_ASC' |
  'fault_DESC' |
  'omit_ASC' |
  'omit_DESC' |
  'error_ASC' |
  'error_DESC' |
  'point_ASC' |
  'point_DESC' |
  'score_ASC' |
  'score_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type Codes =   'A0' |
  'A1' |
  'A2' |
  'A3' |
  'A4' |
  'A5' |
  'A6' |
  'A7' |
  'A8' |
  'A9' |
  'B0' |
  'B1' |
  'B2' |
  'B3' |
  'B4' |
  'B5' |
  'B6' |
  'B7' |
  'B8' |
  'B9' |
  'C0' |
  'C1' |
  'C2' |
  'C3' |
  'C4' |
  'C5' |
  'C6' |
  'C7' |
  'C8' |
  'C9' |
  'D0' |
  'D1' |
  'D2' |
  'D3' |
  'D4' |
  'D5' |
  'D6' |
  'D7' |
  'D8' |
  'D9' |
  'E0' |
  'E1' |
  'E2' |
  'E3' |
  'E4' |
  'E5' |
  'E6' |
  'E7' |
  'E8' |
  'E9' |
  'H0' |
  'H1' |
  'H2' |
  'H3' |
  'H4' |
  'H5' |
  'H6' |
  'H7' |
  'H8' |
  'H9' |
  'G0' |
  'G1' |
  'G2' |
  'G3' |
  'G4' |
  'G5' |
  'G6' |
  'G7' |
  'G8' |
  'G9'

export type UserOrderByInput =   'id_ASC' |
  'id_DESC' |
  'email_ASC' |
  'email_DESC' |
  'password_ASC' |
  'password_DESC' |
  'firstname_ASC' |
  'firstname_DESC' |
  'lastname_ASC' |
  'lastname_DESC' |
  'birthdate_ASC' |
  'birthdate_DESC' |
  'sex_ASC' |
  'sex_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type ResultOrderByInput =   'id_ASC' |
  'id_DESC' |
  'question_ASC' |
  'question_DESC' |
  'response_ASC' |
  'response_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type Sexs =   'MALE' |
  'FEMALE'

export type TestOrderByInput =   'id_ASC' |
  'id_DESC' |
  'type_ASC' |
  'type_DESC' |
  'description_ASC' |
  'description_DESC' |
  'enable_ASC' |
  'enable_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type Levels =   'NINGUNO' |
  'ENFOCADA' |
  'SOSTENIDA' |
  'SELECTIVA' |
  'ALTERNADA' |
  'DIVIDIDA'

export type Dificulty =   'NINGUNO' |
  'INICIAL' |
  'MEDIA' |
  'AVANZADA'

export type TestDataOrderByInput =   'id_ASC' |
  'id_DESC' |
  'type_ASC' |
  'type_DESC' |
  'initAt_ASC' |
  'initAt_DESC' |
  'finalAt_ASC' |
  'finalAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type RoleOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'description_ASC' |
  'description_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type ExerciseOrderByInput =   'id_ASC' |
  'id_DESC' |
  'code_ASC' |
  'code_DESC' |
  'scale_ASC' |
  'scale_DESC' |
  'level_ASC' |
  'level_DESC' |
  'description_ASC' |
  'description_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type FileOrderByInput =   'id_ASC' |
  'id_DESC' |
  'path_ASC' |
  'path_DESC' |
  'filename_ASC' |
  'filename_DESC' |
  'mimetype_ASC' |
  'mimetype_DESC' |
  'encoding_ASC' |
  'encoding_DESC' |
  'size_ASC' |
  'size_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export type Types =   'INICIAL' |
  'ENFOCADA' |
  'SOSTENIDA' |
  'SELECTIVA' |
  'ALTERNADA' |
  'DIVIDIDA'

export type SectionOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'description_ASC' |
  'description_DESC' |
  'enable_ASC' |
  'enable_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export interface UserCreateManyInput {
  create?: UserCreateInput[] | UserCreateInput
  connect?: UserWhereUniqueInput[] | UserWhereUniqueInput
}

export interface FileWhereInput {
  AND?: FileWhereInput[] | FileWhereInput
  OR?: FileWhereInput[] | FileWhereInput
  NOT?: FileWhereInput[] | FileWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  path?: String
  path_not?: String
  path_in?: String[] | String
  path_not_in?: String[] | String
  path_lt?: String
  path_lte?: String
  path_gt?: String
  path_gte?: String
  path_contains?: String
  path_not_contains?: String
  path_starts_with?: String
  path_not_starts_with?: String
  path_ends_with?: String
  path_not_ends_with?: String
  filename?: String
  filename_not?: String
  filename_in?: String[] | String
  filename_not_in?: String[] | String
  filename_lt?: String
  filename_lte?: String
  filename_gt?: String
  filename_gte?: String
  filename_contains?: String
  filename_not_contains?: String
  filename_starts_with?: String
  filename_not_starts_with?: String
  filename_ends_with?: String
  filename_not_ends_with?: String
  mimetype?: String
  mimetype_not?: String
  mimetype_in?: String[] | String
  mimetype_not_in?: String[] | String
  mimetype_lt?: String
  mimetype_lte?: String
  mimetype_gt?: String
  mimetype_gte?: String
  mimetype_contains?: String
  mimetype_not_contains?: String
  mimetype_starts_with?: String
  mimetype_not_starts_with?: String
  mimetype_ends_with?: String
  mimetype_not_ends_with?: String
  encoding?: String
  encoding_not?: String
  encoding_in?: String[] | String
  encoding_not_in?: String[] | String
  encoding_lt?: String
  encoding_lte?: String
  encoding_gt?: String
  encoding_gte?: String
  encoding_contains?: String
  encoding_not_contains?: String
  encoding_starts_with?: String
  encoding_not_starts_with?: String
  encoding_ends_with?: String
  encoding_not_ends_with?: String
  size?: Int
  size_not?: Int
  size_in?: Int[] | Int
  size_not_in?: Int[] | Int
  size_lt?: Int
  size_lte?: Int
  size_gt?: Int
  size_gte?: Int
}

export interface TestCreateInput {
  type: Types
  description?: String
  enable?: Boolean
  sections?: SectionCreateManyInput
}

export interface ExerciseWhereInput {
  AND?: ExerciseWhereInput[] | ExerciseWhereInput
  OR?: ExerciseWhereInput[] | ExerciseWhereInput
  NOT?: ExerciseWhereInput[] | ExerciseWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  code?: Codes
  code_not?: Codes
  code_in?: Codes[] | Codes
  code_not_in?: Codes[] | Codes
  scale?: Int
  scale_not?: Int
  scale_in?: Int[] | Int
  scale_not_in?: Int[] | Int
  scale_lt?: Int
  scale_lte?: Int
  scale_gt?: Int
  scale_gte?: Int
  level?: Levels
  level_not?: Levels
  level_in?: Levels[] | Levels
  level_not_in?: Levels[] | Levels
  description?: String
  description_not?: String
  description_in?: String[] | String
  description_not_in?: String[] | String
  description_lt?: String
  description_lte?: String
  description_gt?: String
  description_gte?: String
  description_contains?: String
  description_not_contains?: String
  description_starts_with?: String
  description_not_starts_with?: String
  description_ends_with?: String
  description_not_ends_with?: String
  sections_every?: SectionWhereInput
  sections_some?: SectionWhereInput
  sections_none?: SectionWhereInput
}

export interface ResultCreateManyInput {
  create?: ResultCreateInput[] | ResultCreateInput
  connect?: ResultWhereUniqueInput[] | ResultWhereUniqueInput
}

export interface SectionWhereInput {
  AND?: SectionWhereInput[] | SectionWhereInput
  OR?: SectionWhereInput[] | SectionWhereInput
  NOT?: SectionWhereInput[] | SectionWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  description?: String
  description_not?: String
  description_in?: String[] | String
  description_not_in?: String[] | String
  description_lt?: String
  description_lte?: String
  description_gt?: String
  description_gte?: String
  description_contains?: String
  description_not_contains?: String
  description_starts_with?: String
  description_not_starts_with?: String
  description_ends_with?: String
  description_not_ends_with?: String
  enable?: Boolean
  enable_not?: Boolean
  exercises_every?: ExerciseWhereInput
  exercises_some?: ExerciseWhereInput
  exercises_none?: ExerciseWhereInput
  tests_every?: TestWhereInput
  tests_some?: TestWhereInput
  tests_none?: TestWhereInput
}

export interface ResultCreateInput {
  question: String
  response: String
}

export interface TestWhereInput {
  AND?: TestWhereInput[] | TestWhereInput
  OR?: TestWhereInput[] | TestWhereInput
  NOT?: TestWhereInput[] | TestWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  type?: Types
  type_not?: Types
  type_in?: Types[] | Types
  type_not_in?: Types[] | Types
  description?: String
  description_not?: String
  description_in?: String[] | String
  description_not_in?: String[] | String
  description_lt?: String
  description_lte?: String
  description_gt?: String
  description_gte?: String
  description_contains?: String
  description_not_contains?: String
  description_starts_with?: String
  description_not_starts_with?: String
  description_ends_with?: String
  description_not_ends_with?: String
  enable?: Boolean
  enable_not?: Boolean
  sections_every?: SectionWhereInput
  sections_some?: SectionWhereInput
  sections_none?: SectionWhereInput
}

export interface FileUpdateInput {
  path?: String
  filename?: String
  mimetype?: String
  encoding?: String
  size?: Int
}

export interface ExerciseDataWhereInput {
  AND?: ExerciseDataWhereInput[] | ExerciseDataWhereInput
  OR?: ExerciseDataWhereInput[] | ExerciseDataWhereInput
  NOT?: ExerciseDataWhereInput[] | ExerciseDataWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  initAt?: DateTime
  initAt_not?: DateTime
  initAt_in?: DateTime[] | DateTime
  initAt_not_in?: DateTime[] | DateTime
  initAt_lt?: DateTime
  initAt_lte?: DateTime
  initAt_gt?: DateTime
  initAt_gte?: DateTime
  finalAt?: DateTime
  finalAt_not?: DateTime
  finalAt_in?: DateTime[] | DateTime
  finalAt_not_in?: DateTime[] | DateTime
  finalAt_lt?: DateTime
  finalAt_lte?: DateTime
  finalAt_gt?: DateTime
  finalAt_gte?: DateTime
  dificulty?: Dificulty
  dificulty_not?: Dificulty
  dificulty_in?: Dificulty[] | Dificulty
  dificulty_not_in?: Dificulty[] | Dificulty
  hit?: Int
  hit_not?: Int
  hit_in?: Int[] | Int
  hit_not_in?: Int[] | Int
  hit_lt?: Int
  hit_lte?: Int
  hit_gt?: Int
  hit_gte?: Int
  fault?: Int
  fault_not?: Int
  fault_in?: Int[] | Int
  fault_not_in?: Int[] | Int
  fault_lt?: Int
  fault_lte?: Int
  fault_gt?: Int
  fault_gte?: Int
  omit?: Int
  omit_not?: Int
  omit_in?: Int[] | Int
  omit_not_in?: Int[] | Int
  omit_lt?: Int
  omit_lte?: Int
  omit_gt?: Int
  omit_gte?: Int
  error?: Int
  error_not?: Int
  error_in?: Int[] | Int
  error_not_in?: Int[] | Int
  error_lt?: Int
  error_lte?: Int
  error_gt?: Int
  error_gte?: Int
  point?: Float
  point_not?: Float
  point_in?: Float[] | Float
  point_not_in?: Float[] | Float
  point_lt?: Float
  point_lte?: Float
  point_gt?: Float
  point_gte?: Float
  score?: Float
  score_not?: Float
  score_in?: Float[] | Float
  score_not_in?: Float[] | Float
  score_lt?: Float
  score_lte?: Float
  score_gt?: Float
  score_gte?: Float
  createdBy?: UserWhereInput
  exercise?: ExerciseWhereInput
  result_every?: ResultWhereInput
  result_some?: ResultWhereInput
  result_none?: ResultWhereInput
}

export interface TestUpdateWithWhereUniqueNestedInput {
  where: TestWhereUniqueInput
  data: TestUpdateDataInput
}

export interface UserUpdateWithWhereUniqueNestedInput {
  where: UserWhereUniqueInput
  data: UserUpdateDataInput
}

export interface TestUpdateManyInput {
  create?: TestCreateInput[] | TestCreateInput
  connect?: TestWhereUniqueInput[] | TestWhereUniqueInput
  disconnect?: TestWhereUniqueInput[] | TestWhereUniqueInput
  delete?: TestWhereUniqueInput[] | TestWhereUniqueInput
  update?: TestUpdateWithWhereUniqueNestedInput[] | TestUpdateWithWhereUniqueNestedInput
  upsert?: TestUpsertWithWhereUniqueNestedInput[] | TestUpsertWithWhereUniqueNestedInput
}

export interface TestDataUpdateInput {
  type?: Types
  initAt?: DateTime
  finalAt?: DateTime
  createdBy?: UserUpdateOneInput
  exerciseDatas?: ExerciseDataUpdateManyInput
}

export interface ExerciseUpsertWithWhereUniqueNestedInput {
  where: ExerciseWhereUniqueInput
  update: ExerciseUpdateDataInput
  create: ExerciseCreateInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  NOT?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  email?: String
  email_not?: String
  email_in?: String[] | String
  email_not_in?: String[] | String
  email_lt?: String
  email_lte?: String
  email_gt?: String
  email_gte?: String
  email_contains?: String
  email_not_contains?: String
  email_starts_with?: String
  email_not_starts_with?: String
  email_ends_with?: String
  email_not_ends_with?: String
  password?: String
  password_not?: String
  password_in?: String[] | String
  password_not_in?: String[] | String
  password_lt?: String
  password_lte?: String
  password_gt?: String
  password_gte?: String
  password_contains?: String
  password_not_contains?: String
  password_starts_with?: String
  password_not_starts_with?: String
  password_ends_with?: String
  password_not_ends_with?: String
  firstname?: String
  firstname_not?: String
  firstname_in?: String[] | String
  firstname_not_in?: String[] | String
  firstname_lt?: String
  firstname_lte?: String
  firstname_gt?: String
  firstname_gte?: String
  firstname_contains?: String
  firstname_not_contains?: String
  firstname_starts_with?: String
  firstname_not_starts_with?: String
  firstname_ends_with?: String
  firstname_not_ends_with?: String
  lastname?: String
  lastname_not?: String
  lastname_in?: String[] | String
  lastname_not_in?: String[] | String
  lastname_lt?: String
  lastname_lte?: String
  lastname_gt?: String
  lastname_gte?: String
  lastname_contains?: String
  lastname_not_contains?: String
  lastname_starts_with?: String
  lastname_not_starts_with?: String
  lastname_ends_with?: String
  lastname_not_ends_with?: String
  birthdate?: DateTime
  birthdate_not?: DateTime
  birthdate_in?: DateTime[] | DateTime
  birthdate_not_in?: DateTime[] | DateTime
  birthdate_lt?: DateTime
  birthdate_lte?: DateTime
  birthdate_gt?: DateTime
  birthdate_gte?: DateTime
  sex?: Sexs
  sex_not?: Sexs
  sex_in?: Sexs[] | Sexs
  sex_not_in?: Sexs[] | Sexs
  roles_every?: RoleWhereInput
  roles_some?: RoleWhereInput
  roles_none?: RoleWhereInput
}

export interface ExerciseUpdateWithWhereUniqueNestedInput {
  where: ExerciseWhereUniqueInput
  data: ExerciseUpdateDataInput
}

export interface ExerciseSubscriptionWhereInput {
  AND?: ExerciseSubscriptionWhereInput[] | ExerciseSubscriptionWhereInput
  OR?: ExerciseSubscriptionWhereInput[] | ExerciseSubscriptionWhereInput
  NOT?: ExerciseSubscriptionWhereInput[] | ExerciseSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ExerciseWhereInput
}

export interface ExerciseUpdateManyInput {
  create?: ExerciseCreateInput[] | ExerciseCreateInput
  connect?: ExerciseWhereUniqueInput[] | ExerciseWhereUniqueInput
  disconnect?: ExerciseWhereUniqueInput[] | ExerciseWhereUniqueInput
  delete?: ExerciseWhereUniqueInput[] | ExerciseWhereUniqueInput
  update?: ExerciseUpdateWithWhereUniqueNestedInput[] | ExerciseUpdateWithWhereUniqueNestedInput
  upsert?: ExerciseUpsertWithWhereUniqueNestedInput[] | ExerciseUpsertWithWhereUniqueNestedInput
}

export interface TestDataWhereInput {
  AND?: TestDataWhereInput[] | TestDataWhereInput
  OR?: TestDataWhereInput[] | TestDataWhereInput
  NOT?: TestDataWhereInput[] | TestDataWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  type?: Types
  type_not?: Types
  type_in?: Types[] | Types
  type_not_in?: Types[] | Types
  initAt?: DateTime
  initAt_not?: DateTime
  initAt_in?: DateTime[] | DateTime
  initAt_not_in?: DateTime[] | DateTime
  initAt_lt?: DateTime
  initAt_lte?: DateTime
  initAt_gt?: DateTime
  initAt_gte?: DateTime
  finalAt?: DateTime
  finalAt_not?: DateTime
  finalAt_in?: DateTime[] | DateTime
  finalAt_not_in?: DateTime[] | DateTime
  finalAt_lt?: DateTime
  finalAt_lte?: DateTime
  finalAt_gt?: DateTime
  finalAt_gte?: DateTime
  createdBy?: UserWhereInput
  exerciseDatas_every?: ExerciseDataWhereInput
  exerciseDatas_some?: ExerciseDataWhereInput
  exerciseDatas_none?: ExerciseDataWhereInput
}

export interface SectionUpdateDataInput {
  name?: String
  description?: String
  enable?: Boolean
  exercises?: ExerciseUpdateManyInput
  tests?: TestUpdateManyInput
}

export interface ExerciseDataSubscriptionWhereInput {
  AND?: ExerciseDataSubscriptionWhereInput[] | ExerciseDataSubscriptionWhereInput
  OR?: ExerciseDataSubscriptionWhereInput[] | ExerciseDataSubscriptionWhereInput
  NOT?: ExerciseDataSubscriptionWhereInput[] | ExerciseDataSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ExerciseDataWhereInput
}

export interface SectionUpdateWithWhereUniqueNestedInput {
  where: SectionWhereUniqueInput
  data: SectionUpdateDataInput
}

export interface FileSubscriptionWhereInput {
  AND?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput
  OR?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput
  NOT?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: FileWhereInput
}

export interface SectionUpdateManyInput {
  create?: SectionCreateInput[] | SectionCreateInput
  connect?: SectionWhereUniqueInput[] | SectionWhereUniqueInput
  disconnect?: SectionWhereUniqueInput[] | SectionWhereUniqueInput
  delete?: SectionWhereUniqueInput[] | SectionWhereUniqueInput
  update?: SectionUpdateWithWhereUniqueNestedInput[] | SectionUpdateWithWhereUniqueNestedInput
  upsert?: SectionUpsertWithWhereUniqueNestedInput[] | SectionUpsertWithWhereUniqueNestedInput
}

export interface TestDataWhereUniqueInput {
  id?: ID_Input
}

export interface ExerciseUpdateDataInput {
  code?: Codes
  scale?: Int
  level?: Levels
  description?: String
  sections?: SectionUpdateManyInput
}

export interface RoleWhereUniqueInput {
  id?: ID_Input
  name?: String
}

export interface ExerciseUpdateOneInput {
  create?: ExerciseCreateInput
  connect?: ExerciseWhereUniqueInput
  delete?: Boolean
  update?: ExerciseUpdateDataInput
  upsert?: ExerciseUpsertNestedInput
}

export interface SectionWhereUniqueInput {
  id?: ID_Input
  name?: String
}

export interface ExerciseDataUpdateDataInput {
  initAt?: DateTime
  finalAt?: DateTime
  dificulty?: Dificulty
  hit?: Int
  fault?: Int
  omit?: Int
  error?: Int
  point?: Float
  score?: Float
  createdBy?: UserUpdateOneInput
  exercise?: ExerciseUpdateOneInput
  result?: ResultUpdateManyInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  email?: String
}

export interface ExerciseDataUpdateWithWhereUniqueNestedInput {
  where: ExerciseDataWhereUniqueInput
  data: ExerciseDataUpdateDataInput
}

export interface TestUpdateInput {
  type?: Types
  description?: String
  enable?: Boolean
  sections?: SectionUpdateManyInput
}

export interface FileCreateInput {
  path: String
  filename: String
  mimetype: String
  encoding: String
  size: Int
}

export interface ExerciseUpdateInput {
  code?: Codes
  scale?: Int
  level?: Levels
  description?: String
  sections?: SectionUpdateManyInput
}

export interface TestDataCreateInput {
  type: Types
  initAt: DateTime
  finalAt: DateTime
  createdBy: UserCreateOneInput
  exerciseDatas?: ExerciseDataCreateManyInput
}

export interface ResultUpdateInput {
  question?: String
  response?: String
}

export interface UserCreateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
}

export interface ExerciseDataUpdateInput {
  initAt?: DateTime
  finalAt?: DateTime
  dificulty?: Dificulty
  hit?: Int
  fault?: Int
  omit?: Int
  error?: Int
  point?: Float
  score?: Float
  createdBy?: UserUpdateOneInput
  exercise?: ExerciseUpdateOneInput
  result?: ResultUpdateManyInput
}

export interface UserCreateInput {
  email: String
  password?: String
  firstname: String
  lastname: String
  birthdate: DateTime
  sex: Sexs
  roles?: RoleCreateManyInput
}

export interface ResultUpsertWithWhereUniqueNestedInput {
  where: ResultWhereUniqueInput
  update: ResultUpdateDataInput
  create: ResultCreateInput
}

export interface RoleCreateManyInput {
  create?: RoleCreateInput[] | RoleCreateInput
  connect?: RoleWhereUniqueInput[] | RoleWhereUniqueInput
}

export interface ResultUpdateWithWhereUniqueNestedInput {
  where: ResultWhereUniqueInput
  data: ResultUpdateDataInput
}

export interface RoleCreateInput {
  name: String
  description?: String
  users?: UserCreateManyInput
}

export interface ExerciseUpsertNestedInput {
  update: ExerciseUpdateDataInput
  create: ExerciseCreateInput
}

export interface ExerciseDataUpdateManyInput {
  create?: ExerciseDataCreateInput[] | ExerciseDataCreateInput
  connect?: ExerciseDataWhereUniqueInput[] | ExerciseDataWhereUniqueInput
  disconnect?: ExerciseDataWhereUniqueInput[] | ExerciseDataWhereUniqueInput
  delete?: ExerciseDataWhereUniqueInput[] | ExerciseDataWhereUniqueInput
  update?: ExerciseDataUpdateWithWhereUniqueNestedInput[] | ExerciseDataUpdateWithWhereUniqueNestedInput
  upsert?: ExerciseDataUpsertWithWhereUniqueNestedInput[] | ExerciseDataUpsertWithWhereUniqueNestedInput
}

export interface TestUpsertWithWhereUniqueNestedInput {
  where: TestWhereUniqueInput
  update: TestUpdateDataInput
  create: TestCreateInput
}

export interface ExerciseDataCreateManyInput {
  create?: ExerciseDataCreateInput[] | ExerciseDataCreateInput
  connect?: ExerciseDataWhereUniqueInput[] | ExerciseDataWhereUniqueInput
}

export interface TestSubscriptionWhereInput {
  AND?: TestSubscriptionWhereInput[] | TestSubscriptionWhereInput
  OR?: TestSubscriptionWhereInput[] | TestSubscriptionWhereInput
  NOT?: TestSubscriptionWhereInput[] | TestSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: TestWhereInput
}

export interface ExerciseDataCreateInput {
  initAt: DateTime
  finalAt: DateTime
  dificulty?: Dificulty
  hit?: Int
  fault?: Int
  omit?: Int
  error?: Int
  point?: Float
  score?: Float
  createdBy: UserCreateOneInput
  exercise: ExerciseCreateOneInput
  result?: ResultCreateManyInput
}

export interface SectionSubscriptionWhereInput {
  AND?: SectionSubscriptionWhereInput[] | SectionSubscriptionWhereInput
  OR?: SectionSubscriptionWhereInput[] | SectionSubscriptionWhereInput
  NOT?: SectionSubscriptionWhereInput[] | SectionSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: SectionWhereInput
}

export interface ExerciseCreateOneInput {
  create?: ExerciseCreateInput
  connect?: ExerciseWhereUniqueInput
}

export interface RoleSubscriptionWhereInput {
  AND?: RoleSubscriptionWhereInput[] | RoleSubscriptionWhereInput
  OR?: RoleSubscriptionWhereInput[] | RoleSubscriptionWhereInput
  NOT?: RoleSubscriptionWhereInput[] | RoleSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: RoleWhereInput
}

export interface ExerciseCreateInput {
  code: Codes
  scale?: Int
  level?: Levels
  description?: String
  sections?: SectionCreateManyInput
}

export interface FileWhereUniqueInput {
  id?: ID_Input
}

export interface SectionCreateManyInput {
  create?: SectionCreateInput[] | SectionCreateInput
  connect?: SectionWhereUniqueInput[] | SectionWhereUniqueInput
}

export interface ResultWhereUniqueInput {
  id?: ID_Input
}

export interface SectionCreateInput {
  name: String
  description?: String
  enable?: Boolean
  exercises?: ExerciseCreateManyInput
  tests?: TestCreateManyInput
}

export interface TestWhereUniqueInput {
  id?: ID_Input
}

export interface ExerciseCreateManyInput {
  create?: ExerciseCreateInput[] | ExerciseCreateInput
  connect?: ExerciseWhereUniqueInput[] | ExerciseWhereUniqueInput
}

export interface SectionUpdateInput {
  name?: String
  description?: String
  enable?: Boolean
  exercises?: ExerciseUpdateManyInput
  tests?: TestUpdateManyInput
}

export interface TestCreateManyInput {
  create?: TestCreateInput[] | TestCreateInput
  connect?: TestWhereUniqueInput[] | TestWhereUniqueInput
}

export interface ExerciseDataUpsertWithWhereUniqueNestedInput {
  where: ExerciseDataWhereUniqueInput
  update: ExerciseDataUpdateDataInput
  create: ExerciseDataCreateInput
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput
  create: UserCreateInput
}

export interface ResultUpdateManyInput {
  create?: ResultCreateInput[] | ResultCreateInput
  connect?: ResultWhereUniqueInput[] | ResultWhereUniqueInput
  disconnect?: ResultWhereUniqueInput[] | ResultWhereUniqueInput
  delete?: ResultWhereUniqueInput[] | ResultWhereUniqueInput
  update?: ResultUpdateWithWhereUniqueNestedInput[] | ResultUpdateWithWhereUniqueNestedInput
  upsert?: ResultUpsertWithWhereUniqueNestedInput[] | ResultUpsertWithWhereUniqueNestedInput
}

export interface RoleUpsertWithWhereUniqueNestedInput {
  where: RoleWhereUniqueInput
  update: RoleUpdateDataInput
  create: RoleCreateInput
}

export interface TestUpdateDataInput {
  type?: Types
  description?: String
  enable?: Boolean
  sections?: SectionUpdateManyInput
}

export interface ResultWhereInput {
  AND?: ResultWhereInput[] | ResultWhereInput
  OR?: ResultWhereInput[] | ResultWhereInput
  NOT?: ResultWhereInput[] | ResultWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  question?: String
  question_not?: String
  question_in?: String[] | String
  question_not_in?: String[] | String
  question_lt?: String
  question_lte?: String
  question_gt?: String
  question_gte?: String
  question_contains?: String
  question_not_contains?: String
  question_starts_with?: String
  question_not_starts_with?: String
  question_ends_with?: String
  question_not_ends_with?: String
  response?: String
  response_not?: String
  response_in?: String[] | String
  response_not_in?: String[] | String
  response_lt?: String
  response_lte?: String
  response_gt?: String
  response_gte?: String
  response_contains?: String
  response_not_contains?: String
  response_starts_with?: String
  response_not_starts_with?: String
  response_ends_with?: String
  response_not_ends_with?: String
}

export interface ResultSubscriptionWhereInput {
  AND?: ResultSubscriptionWhereInput[] | ResultSubscriptionWhereInput
  OR?: ResultSubscriptionWhereInput[] | ResultSubscriptionWhereInput
  NOT?: ResultSubscriptionWhereInput[] | ResultSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ResultWhereInput
}

export interface UserUpsertWithWhereUniqueNestedInput {
  where: UserWhereUniqueInput
  update: UserUpdateDataInput
  create: UserCreateInput
}

export interface ExerciseDataWhereUniqueInput {
  id?: ID_Input
}

export interface RoleWhereInput {
  AND?: RoleWhereInput[] | RoleWhereInput
  OR?: RoleWhereInput[] | RoleWhereInput
  NOT?: RoleWhereInput[] | RoleWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  description?: String
  description_not?: String
  description_in?: String[] | String
  description_not_in?: String[] | String
  description_lt?: String
  description_lte?: String
  description_gt?: String
  description_gte?: String
  description_contains?: String
  description_not_contains?: String
  description_starts_with?: String
  description_not_starts_with?: String
  description_ends_with?: String
  description_not_ends_with?: String
  users_every?: UserWhereInput
  users_some?: UserWhereInput
  users_none?: UserWhereInput
}

export interface UserUpdateInput {
  email?: String
  password?: String
  firstname?: String
  lastname?: String
  birthdate?: DateTime
  sex?: Sexs
  roles?: RoleUpdateManyInput
}

export interface UserUpdateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
  delete?: Boolean
  update?: UserUpdateDataInput
  upsert?: UserUpsertNestedInput
}

export interface ResultUpdateDataInput {
  question?: String
  response?: String
}

export interface UserUpdateDataInput {
  email?: String
  password?: String
  firstname?: String
  lastname?: String
  birthdate?: DateTime
  sex?: Sexs
  roles?: RoleUpdateManyInput
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface UserUpdateManyInput {
  create?: UserCreateInput[] | UserCreateInput
  connect?: UserWhereUniqueInput[] | UserWhereUniqueInput
  disconnect?: UserWhereUniqueInput[] | UserWhereUniqueInput
  delete?: UserWhereUniqueInput[] | UserWhereUniqueInput
  update?: UserUpdateWithWhereUniqueNestedInput[] | UserUpdateWithWhereUniqueNestedInput
  upsert?: UserUpsertWithWhereUniqueNestedInput[] | UserUpsertWithWhereUniqueNestedInput
}

export interface RoleUpdateDataInput {
  name?: String
  description?: String
  users?: UserUpdateManyInput
}

export interface RoleUpdateWithWhereUniqueNestedInput {
  where: RoleWhereUniqueInput
  data: RoleUpdateDataInput
}

export interface RoleUpdateManyInput {
  create?: RoleCreateInput[] | RoleCreateInput
  connect?: RoleWhereUniqueInput[] | RoleWhereUniqueInput
  disconnect?: RoleWhereUniqueInput[] | RoleWhereUniqueInput
  delete?: RoleWhereUniqueInput[] | RoleWhereUniqueInput
  update?: RoleUpdateWithWhereUniqueNestedInput[] | RoleUpdateWithWhereUniqueNestedInput
  upsert?: RoleUpsertWithWhereUniqueNestedInput[] | RoleUpsertWithWhereUniqueNestedInput
}

export interface TestDataSubscriptionWhereInput {
  AND?: TestDataSubscriptionWhereInput[] | TestDataSubscriptionWhereInput
  OR?: TestDataSubscriptionWhereInput[] | TestDataSubscriptionWhereInput
  NOT?: TestDataSubscriptionWhereInput[] | TestDataSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: TestDataWhereInput
}

export interface SectionUpsertWithWhereUniqueNestedInput {
  where: SectionWhereUniqueInput
  update: SectionUpdateDataInput
  create: SectionCreateInput
}

export interface RoleUpdateInput {
  name?: String
  description?: String
  users?: UserUpdateManyInput
}

export interface ExerciseWhereUniqueInput {
  id?: ID_Input
  code?: Codes
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface TestPreviousValues {
  id: ID_Output
  type: Types
  description?: String
  enable: Boolean
}

/*
 * A connection to a list of items.

 */
export interface FileConnection {
  pageInfo: PageInfo
  edges: FileEdge[]
  aggregate: AggregateFile
}

export interface User extends Node {
  id: ID_Output
  email: String
  password?: String
  firstname: String
  lastname: String
  birthdate: DateTime
  sex: Sexs
  roles?: Role[]
}

export interface BatchPayload {
  count: Long
}

export interface TestData extends Node {
  id: ID_Output
  type: Types
  createdBy: User
  initAt: DateTime
  finalAt: DateTime
  exerciseDatas?: ExerciseData[]
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface ExercisePreviousValues {
  id: ID_Output
  code: Codes
  scale: Int
  level: Levels
  description?: String
}

export interface TestSubscriptionPayload {
  mutation: MutationType
  node?: Test
  updatedFields?: String[]
  previousValues?: TestPreviousValues
}

export interface AggregateTest {
  count: Int
}

export interface Role extends Node {
  id: ID_Output
  name: String
  description?: String
  users?: User[]
}

export interface AggregateUser {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface TestEdge {
  node: Test
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

export interface Result extends Node {
  id: ID_Output
  question: String
  response: String
}

/*
 * An edge in a connection.

 */
export interface ExerciseEdge {
  node: Exercise
  cursor: String
}

export interface UserPreviousValues {
  id: ID_Output
  email: String
  password?: String
  firstname: String
  lastname: String
  birthdate: DateTime
  sex: Sexs
}

export interface AggregateSection {
  count: Int
}

export interface FileSubscriptionPayload {
  mutation: MutationType
  node?: File
  updatedFields?: String[]
  previousValues?: FilePreviousValues
}

/*
 * A connection to a list of items.

 */
export interface SectionConnection {
  pageInfo: PageInfo
  edges: SectionEdge[]
  aggregate: AggregateSection
}

export interface FilePreviousValues {
  id: ID_Output
  path: String
  filename: String
  mimetype: String
  encoding: String
  size: Int
}

/*
 * An edge in a connection.

 */
export interface ResultEdge {
  node: Result
  cursor: String
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

export interface AggregateRole {
  count: Int
}

export interface TestDataSubscriptionPayload {
  mutation: MutationType
  node?: TestData
  updatedFields?: String[]
  previousValues?: TestDataPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface RoleConnection {
  pageInfo: PageInfo
  edges: RoleEdge[]
  aggregate: AggregateRole
}

export interface TestDataPreviousValues {
  id: ID_Output
  type: Types
  initAt: DateTime
  finalAt: DateTime
}

/*
 * An edge in a connection.

 */
export interface ExerciseDataEdge {
  node: ExerciseData
  cursor: String
}

export interface Test extends Node {
  id: ID_Output
  type: Types
  description?: String
  enable: Boolean
  sections?: Section[]
}

export interface AggregateTestData {
  count: Int
}

export interface ExerciseDataSubscriptionPayload {
  mutation: MutationType
  node?: ExerciseData
  updatedFields?: String[]
  previousValues?: ExerciseDataPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface TestDataConnection {
  pageInfo: PageInfo
  edges: TestDataEdge[]
  aggregate: AggregateTestData
}

export interface ExerciseDataPreviousValues {
  id: ID_Output
  initAt: DateTime
  finalAt: DateTime
  dificulty: Dificulty
  hit?: Int
  fault?: Int
  omit?: Int
  error?: Int
  point?: Float
  score?: Float
}

/*
 * An edge in a connection.

 */
export interface FileEdge {
  node: File
  cursor: String
}

export interface File extends Node {
  id: ID_Output
  path: String
  filename: String
  mimetype: String
  encoding: String
  size: Int
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

export interface RoleSubscriptionPayload {
  mutation: MutationType
  node?: Role
  updatedFields?: String[]
  previousValues?: RolePreviousValues
}

/*
 * A connection to a list of items.

 */
export interface ExerciseConnection {
  pageInfo: PageInfo
  edges: ExerciseEdge[]
  aggregate: AggregateExercise
}

export interface RolePreviousValues {
  id: ID_Output
  name: String
  description?: String
}

export interface AggregateResult {
  count: Int
}

export interface Section extends Node {
  id: ID_Output
  name: String
  description?: String
  enable: Boolean
  exercises?: Exercise[]
  tests?: Test[]
}

/*
 * An edge in a connection.

 */
export interface RoleEdge {
  node: Role
  cursor: String
}

export interface ResultSubscriptionPayload {
  mutation: MutationType
  node?: Result
  updatedFields?: String[]
  previousValues?: ResultPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface ExerciseDataConnection {
  pageInfo: PageInfo
  edges: ExerciseDataEdge[]
  aggregate: AggregateExerciseData
}

export interface ResultPreviousValues {
  id: ID_Output
  question: String
  response: String
}

export interface AggregateFile {
  count: Int
}

export interface Exercise extends Node {
  id: ID_Output
  code: Codes
  scale: Int
  level: Levels
  description?: String
  sections?: Section[]
}

export interface AggregateExercise {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface ResultConnection {
  pageInfo: PageInfo
  edges: ResultEdge[]
  aggregate: AggregateResult
}

export interface ExerciseSubscriptionPayload {
  mutation: MutationType
  node?: Exercise
  updatedFields?: String[]
  previousValues?: ExercisePreviousValues
}

export interface ExerciseData extends Node {
  id: ID_Output
  initAt: DateTime
  finalAt: DateTime
  createdBy: User
  exercise: Exercise
  result?: Result[]
  dificulty: Dificulty
  hit?: Int
  fault?: Int
  omit?: Int
  error?: Int
  point?: Float
  score?: Float
}

export interface SectionPreviousValues {
  id: ID_Output
  name: String
  description?: String
  enable: Boolean
}

export interface SectionSubscriptionPayload {
  mutation: MutationType
  node?: Section
  updatedFields?: String[]
  previousValues?: SectionPreviousValues
}

export interface AggregateExerciseData {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface SectionEdge {
  node: Section
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface TestConnection {
  pageInfo: PageInfo
  edges: TestEdge[]
  aggregate: AggregateTest
}

/*
 * An edge in a connection.

 */
export interface TestDataEdge {
  node: TestData
  cursor: String
}

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). 
*/
export type Float = number

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

export type DateTime = Date | string