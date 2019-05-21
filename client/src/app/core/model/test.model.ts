import { Section } from '@app/core/model/section.model';

export interface Test {
  id: string;
  type: string;
  enable: boolean;
  description: string;
  sections: Section[];
}
