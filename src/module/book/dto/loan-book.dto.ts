import { ApiProperty } from '@nestjs/swagger';

export class LoanBookDto {
  @ApiProperty({
    description: `books's title or code`,
  })
  identifier?: string;
}
