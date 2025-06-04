import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: 'Adminning elektron pochtasi',
  })
  readonly email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Admin paroli',
  })
  readonly password: string;
}
