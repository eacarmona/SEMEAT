import { Module } from '@nestjs/common';
import { TestResolver } from './resolvers/test.resolver';
import { CommonModule } from '../common/common.module';
import { ExerciseResolver } from './resolvers/exercise.resolver';
import { SectionResolver } from './resolvers/section.resolver';

@Module({
    imports: [CommonModule],
    providers: [TestResolver, SectionResolver, ExerciseResolver],
})
export class TestModule {}
