import { ApiProperty } from '@nestjs/swagger';
export class ReturnBookDto {
  @ApiProperty({
    description: `books's title or code`,
  })
  identifier?: string;

  @ApiProperty({
    default: new Date(),
    description: 'Book returned date',
  })
  returnedDate?: Date = new Date();
}
