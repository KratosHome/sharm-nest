import {ApiProperty} from "@nestjs/swagger";

export class UpdateRoleUserDto{
    @ApiProperty({required: true})
    role: string;
}