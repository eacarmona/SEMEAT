import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { TestDataResolver } from './resolvers/testData.resolver';
import { ExerciseDataResolver } from './resolvers/exerciseData.resolver';

@Module({
    imports: [CommonModule],
    providers: [TestDataResolver, ExerciseDataResolver],
})
export class TestDataModule {}
